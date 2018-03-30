class ProcessParser {
    constructor(process, view, factory) { 
        this.process = process;
        this.view = view;
        this.factory = factory;

        this.reader = new draw2d.io.json.Reader();
    }
    
    parse(){
        this.addShapes();
        this.addLines();
    }
    
    addShapes(){
        this.process.shapes.forEach(shape => this.addShape(shape));
    }
    
    addShape(shape) {
        if (this.isTerminator(shape))
            this.createTerminator(shape);
        else
            this.createShape(shape);
    }
    
    isTerminator(shape) {
        return shape.name === "start" || shape.name === "end";
    }
    
    createTerminator(shape) {
        let figure = this.factory.create(shape.factory, shape.name);

        figure.id = shape.id;
        this.view.add(figure, shape.x, shape.y);

        if (shape.name === "start")
            figure.properties.filter(p => p.name === "workflow")["value"] = this.process.name;
    }
    
    createShape(shape) {
        let figure = this.factory.create(shape.factory, shape.type);
        
        for (let property in shape) 
            this.addProperty(shape, figure, property);
        
        this.view.add(figure, shape.x, shape.y);
    }
    
    addProperty(shape, figure, property) {
        if (this.isColor(property))
            this.addColor(shape,  figure);
        else if (this.isLabelPosition(property)) 
            this.addLabelPosition(shape, figure, property);
        else if (this.isActivityProperties(shape,  property))
            this.addActivityProperties(shape, figure, property);
        else if (this.isFormProperties(shape, property)) 
            this.addFormProperties(shape, figure);
        else if(this.isPort(property)) 
            this.addPort(shape, figure, property);
        else
            figure[property] = shape[property];
    }
    
    isColor(property) {
        return property === "color";
    }

    addColor(shape, figure){
        figure.changeColor(FormColor.GetColour(shape.color));
    }
    
    isLabelPosition(property){
       return property === "labelPos";
    }
    
    addLabelPosition(shape, figure, property) {
        figure.captionLabel.x = shape[property].x;
        figure.captionLabel.y = shape[property].y;
    }
    
    isActivityProperties(shape, property){
        return shape.factory === "activityFactory" && property === "properties"
    }

    addActivityProperties(shape, figure, property) {
        figure[property].forEach(p => {
            const setting = shape[property].find(s => s.name === p.name);

            if (setting)
                p.value = setting.value;
        });
    }
    
    isFormProperties(shape, property){
        return shape.type === "FormActivity" && property === "properties";
    }
    
    addFormProperties(shape, figure) {
        const form = shape.properties.find(p => p.name === "form");
        const controls = form.value.controls;

        controls.forEach(control => {
            if (control.name === "_header_") {
                figure.label = control.label;
                figure.caption = control.caption;
            }
            else 
               this.addControl(control, figure);
        });
    }
    
    addControl(control, figure){
        let figureCtrl = null;

        if (control.outputPorts && control.outputPorts.length > 0)
            figureCtrl = figure.createOutputControl(control.name);
        else
            figureCtrl = figure.createInputControl(control.name);

        figureCtrl.label = control.label;
        figureCtrl.caption = control.caption;
        figureCtrl.name = control.name;
        figureCtrl.id = control.id;

        figureCtrl.control = control.properties;
    }
    
    isPort(property){
        return property === "inputPorts" || property === "outputPorts";
    }
    
    addPort(shape, figure, property){
        for (let index in shape[property]) {
            if (figure[property].data[index])
                figure[property].data[index].id = shape[property][index];
        }
    }
    
    addLines(){
        this.process.lines.forEach(line => this.addLine(line));
    }
    
    addLine(line){
        let connection = {
            id: line.id,
            type: "WFConnection",
            vertex: [],
            source: { node: line.source.parent.id, port: line.source.name },
            target: {node: line.target.parent.id, port: line.target.name  }
        };

        connection.vertex.push(...line.vertices);
        
        this.reader.unmarshal(this.view, [connection]);
       
        const conn = this.view.lines.data.find(l => l.id === line.id);
        conn.changeColor(FormColor.GetColour(line.color));
        
        this.connectLineToParent("source", line,  conn);
    }
    
    connectLineToParent(port, line, connection) {
        if (line[port].pId !== line[port].parent.id){
            const parent = this.view.figures.data.find(f => f.name === line[port].parent.name);
            const control = parent.children.data.find(c => c.figure.id === line[port].pId);
            
            if (port === "source") {
                const source = control.figure.outputPorts.data.find(p => p.name === line[port].name);
                connection.setSource(source);
            }
            else {
                const port = control.figure.inputPorts.data.find(p => p.name === line[port].name);
                connection.setTarget(port);
            }
        }
    }
    
    static Parse(process, view, factory){
        const parser = new ProcessParser(process, view, factory);
        
        parser.parse();
    }
}