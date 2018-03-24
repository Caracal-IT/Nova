class WorkflowServer {
    constructor(view, factory){
        this.view = view;
        this.factory = factory;
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
    
    load(){
        let process = {
            name: "registration",
            shapes: [
                {
                    label: "Reservations",
                    name: "9d9aa0df42f875a811e7",
                    type: "Header",
                    factory: "shapeFactory",
                    x: 23,
                    y: 13
                },
                {
                    label: "Make a reservation at your favourite\ndestination ",
                    name: "16ec0199e71700db242a",
                    type: "Label",
                    factory: "shapeFactory",
                    x: 29,
                    y: 82
                },
                {
                    label: "You need the time off!",
                    name: "d5bd8cfb2ed23f891066",
                    type: "Note",
                    factory: "shapeFactory",
                    x: 284,
                    y: 81
                },
                {
                    color: "Azure",
                    height: 238,
                    label: "Panel4444",
                    name: "f8673f31c44a4329bd96",
                    type: "Panel",
                    factory: "shapeFactory",
                    width: 844,
                    x: 50,
                    y: 130
                },
                {
                    name: "start",
                    factory: "shapeFactory",
                    type: "CodeActivity",
                    x: 87,
                    y: 294
                },
                {
                    name: "end",
                    factory: "shapeFactory",
                    type: "CodeActivity",
                    x: 487,
                    y: 234
                }
            ]
        };
        
        process.shapes.forEach(s => {
            if (s.name === "start") {
                let shape = this.factory.create(s.factory, s.name);
                this.view.add(shape, s.x, s.y);
                shape.properties.filter(p => p.name === "workflow")["value"] = process.name;
            }
            else if (s.name === "end") {
                let shape = this.factory.create(s.factory, s.name);
                this.view.add(shape, s.x, s.y);
            }
            else {
                let shape = this.factory.create(s.factory, s.type.toLowerCase());
                for (let prop in s) {
                    if (prop === "color")
                        shape.changeColor(FormColor.GetColour(s.color));
                    else
                        shape[prop] = s[prop];
                }

                this.view.add(shape, s.x, s.y);
            }
        });
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