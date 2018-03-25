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
            name: this.getProcessName(),
            shapes: [],
            lines: []
        };
    }

    getProcessName() {
        const filter = this.view
            .figures
            .data
            .filter(f => f.name === "Start");

        if (filter.length > 0) {
            const name = filter[0].properties.find(p => p.name === "workflow");

            if (name)
                return name.value;
        }

        return "unknown";
    }

    buildShapes() {
        this.view
            .figures
            .data
            .forEach(s => this.process.shapes.push(s.definition));
    }

    buildLines() {
        this.view
            .lines
            .data
            .forEach(line => this.process.lines.push(line.definition));
    }
}