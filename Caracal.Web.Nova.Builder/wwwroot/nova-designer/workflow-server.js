class WorkflowServer {
    constructor(view){
        this.view = view;
    }
    
    publish() {
        let builder = new ProcessBuilder(this.view);
        let process = builder.build();
        
        console.log(process);
    }
}

class ProcessBuilder {
    constructor(view){
        this.view = view;
    }
    
    build(){
        this.createProcess();
        this.buildShapes();
        this.buildLines();
        
        return this.process;
    }
    
    createProcess(){
        this.process = {
            name: "custom-reservation",
            shapes: [],
            lines: []
        };
    }
    
    buildShapes() {
        for (let figure of this.view.figures.data) {
            let shape = figure.userData;
            shape.x = figure.x;
            shape.y = figure.y;
            shape.width = figure.width;
            shape.height = figure.height;
            shape.labelLoc = this.getLabelPosition(figure);
            
            this.buildPorts(shape, figure);
            
            this.process.shapes.push(shape);
        }
    }
    
    getLabelPosition(figure){
        let labelFigure = figure.children.data[0].figure;
        
        return {
            x: labelFigure.x,
            y: labelFigure.y
        }
    }
    
    buildPorts(shape, figure){
        shape.outputPorts = [];
        shape.inputPorts = [];
        
        for (let port of figure.outputPorts.data) 
            shape.outputPorts.push({ id: port.id });

        for (let port of figure.inputPorts.data)
            shape.inputPorts.push({ id: port.id });
    }
    
    buildLines() {
        for (let line of this.view.lines.data) {
            this.process.lines.push({
                source: line.sourcePort.id,
                target: line.targetPort.id,
                lineSegments: line.lineSegments.data
            });
        }
    }
}