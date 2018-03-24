class WorkflowServer {
    constructor(view){
        this.view = view;
    }
    
    publish() {
        let builder = new ProcessBuilder(this.view);
        let process = builder.build();
        
        console.log(process);

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/Designer/Publish/registration', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // send the collected data as JSON
        xhr.send(JSON.stringify(process));

        xhr.onload = function(e) {
           // alert(xhr.statusText); // not responseText
            /* ... */
        }
    }
    
    controls(){
        return [
            {
                name: "paper-header",
                type: "input1",
                properties: [
                    { name: "text", value: "Header" }
                ]
            },
            
            {
                name: "paper-input",
                type: "input",
                properties: [
                    { name: "placeholder", value: "Please select an item" }
                ]
            },
            {
                name: "paper-label",
                type: "input1",
                properties: [
                    { name: "text", value: "Welcome !!" }
                ]
            },
            {
                name: "paper-button",
                type: "output",
                properties: [
                    {   name: "style", 
                        value: "btn btn-outline-primary", 
                        type:"select",
                        items:[
                            { name: "primary", value: "btn btn-outline-primary" },
                            { name: "secondary", value: "btn btn-outline-secondary" },
                            { name: "success", value: "btn btn-outline-success" },
                            { name: "danger", value: "btn btn-outline-danger" },
                            { name: "warning", value: "btn btn-outline-warning" },
                            { name: "info", value: "btn btn-outline-info" }
                        ]
                    }
                ]
            }
        ];
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