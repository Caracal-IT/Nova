class ProcessParser {
    constructor(json, view, factory) { 
        this.process = json;
        this.view = view;
        this.factory = factory;

        this.reader = new draw2d.io.json.Reader();
    }
    
    parse(){
        this.addShapes();
        this.addLines();
    }
    
    addShapes(){
        process.shapes.forEach(shape => this.addShape(shape));
    }
    
    addShape(shape) {
        {
            if (this.isTerminator(shape))
                this.createTerminator(shape);
            else
                this.createShape(shape);
        }
    }
    
    isTerminator(shape) {
        return shape.name === "start" || shape.name === "end";
    }
    
    createTerminator(shape) {
        let figure = this.factory.create(shape.factory, shape.name);

        figure.id = shape.id;
        this.view.add(figure, shape.x, shape.y);

        if (shape.name === "start")
            figure.properties.filter(p => p.name === "workflow")["value"] = process.name;
    }
    
    createShape(shape) {
        let figure = this.factory.create(shape.factory, shape.type);
        
        for (let property in shape) 
            this.addProperty(shape, figure, property);
        
        this.view.add(figure, shape.x, shape.y);
    }
    
    addProperty(s, shape, prop) {
        if (prop === "color")
            shape.changeColor(FormColor.GetColour(s.color));
        else if (prop === "labelPos") {
            shape.contolLabel.x = s[prop].x;
            shape.contolLabel.y = s[prop].y;
        }
        else if (s.factory === "activityFactory" && prop === "properties") {
            shape[prop].forEach(p => {
                const setting = s[prop].find(s => s.name === p.name);

                if (setting)
                    p.value = setting.value;
            });
        }
        else if (s.type === "FormActivity" && prop === "properties") {
            const form = s.properties.find(p => p.name === "form");

            if (form && form.value && form.value.controls) {
                const controls = form.value.controls;

                controls.forEach(c => {
                    if (c.name === "_#header") {
                        const label = c.properties.find(p => p.name === "label").value;
                        shape.label = label;
                    }
                    else {
                        let control = null;

                        if (c.outputPorts && c.outputPorts.length > 0)
                            control = shape.createOutputControl(c.name);
                        else
                            control = shape.createInputControl(c.name);

                        control.label = c.label;
                        control.name = c.name;
                        control.id = c.id;

                        control.control = c.properties;
                    }
                });
            }
        }
        else if (prop === "inputPorts") {
            for (let index in s[prop])
                shape.inputPorts.data[index].id = s[prop][index];
        }
        else if (prop === "outputPorts") {
            for (let index in s[prop])
                shape.outputPorts.data[index].id = s[prop][index];
        }
        else
            shape[prop] = s[prop];
    }
    
    addLines(){
        process.lines.forEach(line => this.createLine(line));
    }
    
    createLine(line){
        let connection = {
            type: "WFConnection",
            userData: {color: line.color},
            color: FormColor.GetColour(line.color).secondary,
            outlineColor: FormColor.GetColour(line.color).primary,
            vertex: [],
            source: { node: line.source.parent.id, port: line.source.name },
            target: {node: line.target.parent.id, port: line.target.name  }
        };

        connection.vertex.push(...line.vertices);
        
        this.reader.unmarshal(this.view, [connection]);
    }
    
    static Parse(json, view, factory){
        const parser = new ProcessParser(json, view, factory);
        
        parser.parse();
    }
}