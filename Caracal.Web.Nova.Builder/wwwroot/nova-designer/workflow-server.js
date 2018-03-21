class WorkflowServer {
    constructor(view){
        this.view = view;
    }
    
    publish() {
        let builder = new ProcessBuilder(this.view);
        let process = builder.build();
        
        console.log(process);
        
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5000/Designer/Publish/registration', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // send the collected data as JSON
        xhr.send(JSON.stringify(process));

        xhr.onloadend = function (data) {
            // done
            console.log("Done");
        };
    }
    
    controls(){
        return [
            {
                name: "paper-header",
                type: "input",
                properties: [
                    { name: "text", value: "Header" }
                ]
            },
            
            {
                name: "paper-input",
                type: "input",
                properties: [
                    { name: "text", value: "Header" },
                    { name: "placeholder", value: "Please select an item" }
                ]
            },
            {
                name: "paper-label",
                type: "input",
                properties: [
                    { name: "text", value: "Welcome !!" }
                ]
            },
            {
                name: "paper-button",
                type: "output",
                properties: [
                    {   name: "text", value: "Welcome" },
                    {   name: "style", 
                        value: "success", 
                        type:"select",
                        items:[
                            { name: "primary", value: "primary" },
                            { name: "secondary", value: "secondary" },
                            { name: "success", value: "success" },
                            { name: "danger", value: "danger" },
                            { name: "warning", value: "warning" },
                            { name: "info", value: "info" }
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
            shapes: [],
            lines: []
        };
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