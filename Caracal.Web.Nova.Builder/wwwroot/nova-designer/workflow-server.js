const wjJson = `
[
  {
    "type": "draw2d.shape.basic.Circle",
    "id": "6b13af51-2e03-a7b5-2ce7-fdcc70363b82",
    "x": 87,
    "y": 294,
    "width": 50,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_shape_basic_Circle",
    "ports": [
      {
        "type": "draw2d.OutputPort",
        "id": "6bf03d47-440b-674d-2ab8-2fa75829812e",
        "width": 10,
        "height": 10,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_OutputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "output0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      }
    ],
    "bgColor": "#AFEEEE",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null
  },
  {
    "type": "draw2d.shape.basic.Circle",
    "id": "79598754-2bad-7025-ec5d-e738da3736fe",
    "x": 220,
    "y": 243,
    "width": 50,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_shape_basic_Circle",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "95c962fb-2dbf-c8cd-1eca-1df6b0dd2cc7",
        "width": 10,
        "height": 10,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_InputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "input0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      }
    ],
    "bgColor": "#F08080",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null
  },
  {
    "type": "draw2d.Connection",
    "id": "cfe0946f-36f0-8e27-fa9e-2b6413f49a6d",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_Connection",
    "stroke": 5,
    "color": "#93D7F3",
    "outlineStroke": 1,
    "outlineColor": "#00A8F0",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 137,
        "y": 319
      },
      {
        "x": 160.5,
        "y": 319
      },
      {
        "x": 160.5,
        "y": 268
      },
      {
        "x": 220,
        "y": 268
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 20,
    "routingMetaData": {
      "routedByUserInteraction": true,
      "fromDir": 1,
      "toDir": 3
    },
    "source": {
      "node": "6b13af51-2e03-a7b5-2ce7-fdcc70363b82",
      "port": "output0"
    },
    "target": {
      "node": "79598754-2bad-7025-ec5d-e738da3736fe",
      "port": "input0",
      "decoration": "draw2d.decoration.connection.ArrowDecorator"
    }
  }
]
`;

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
            lines: [
                {
                    color: "Gold",
                    source: {
                        id: "73e2f9fe-fa81-ff78-b9b6-b03032558168",
                        name: "output0",
                        parent: {
                            id: "5e4a576d-05e2-8ded-76e0-f87cdf7c1722",
                            name: "start"
                        },
                    },
                    target: {
                        id: "f0fe26ef-b3ab-4020-de5a-3bf797960bab",
                        name: "input0",
                        parent: {
                            id: "4981bada-4958-8f4e-a3ac-853ad0febeda",
                            name: "end"
                        },
                    },
                    vertices: [
                        { "x": 137, "y": 319 },
                        { "x": 158, "y": 319 },
                        { "x": 158, "y": 268 },
                        { "x": 220, "y": 268 }
                    ],
                }
            ],
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
                    id: "5e4a576d-05e2-8ded-76e0-f87cdf7c1722",
                    name: "start",
                    factory: "shapeFactory",
                    type: "CodeActivity",
                    inputPorts: [],
                    outputPorts: ["560c4c4d-5580-2ce2-e6b8-288a7b1804e0"],
                    x: 87,
                    y: 294
                },
                {
                    id: "4981bada-4958-8f4e-a3ac-853ad0febeda",
                    name: "end",
                    factory: "shapeFactory",
                    type: "CodeActivity",
                    inputPorts: ["94b33b19-9579-8ba3-914d-a18b9c3fcd8e"],
                    outputPorts: [],
                    x: 220,
                    y: 243
                },
                {
                    type: "ApiActivity",
                    factory: "activityFactory",
                    name: "622c365fdaff50fb8e91",
                    label: "Save Smart Object",
                    color: "Green",
                    properties: [
                        { name: "api", value: "/api/smart-object/reservation/" },
                        { name: "method", value: "post" }
                    ],
                    inputPorts: ["466f8906-e47e-4eb7-582f-dfd2b574032b"],
                    outputPorts: ["90502a4a-dfd8-7ce2-c5c0-ff29eb07ebaa"],
                    labelPos: { x: -20, y: -29 },
                    x: 300,
                    y: 234
                },
                {
                    type: "CodeActivity",
                    factory: "activityFactory",
                    label: "Set Reply Message",
                    name: "099dba76ae3dea9ecdbc",
                    color: "Purple",
                    properties: [
                        { name: "code", value: "function execute(params, wf, notify) { }" }
                    ],
                    labelPos: { x: -20, y: -29 },
                    x: 420,
                    y: 234
                },
                {
                    type: "NovaAlertActivity",
                    factory: "activityFactory",
                    label: "Diaplay Message",
                    name: "099dba76ae3dea9ecdbc",
                    color: "Gold",
                    properties: [
                        { name: "title", value: "Success1" },
                        { name: "message", value: "SMO Saved" },
                        { name: "style", value: "warning" }
                    ],
                    labelPos: { x: -20, y: -29 },
                    x: 530,
                    y: 264
                }
            ]
        };
        
        process.shapes.forEach(s => {
            if (s.name === "start") {
                let shape = this.factory.create(s.factory, s.name);
                shape.id = s.id;
                this.view.add(shape, s.x, s.y);
                shape.properties.filter(p => p.name === "workflow")["value"] = process.name;
            }
            else if (s.name === "end") {
                let shape = this.factory.create(s.factory, s.name);
                shape.id = s.id;
                this.view.add(shape, s.x, s.y);
            }
            else {
                let shape = this.factory.create(s.factory, s.type);
                for (let prop in s) {
                    if (prop === "color")
                        shape.changeColor(FormColor.GetColour(s.color));
                    else if (prop === "labelPos") {
                        shape.contolLabel.x = s[prop].x;
                        shape.contolLabel.y = s[prop].y;
                    }
                    else if (s.factory === "activityFactory" && prop === "properties") {
                        shape[prop].splice(2);
                        shape[prop].push(...s[prop]);
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

                this.view.add(shape, s.x, s.y);
            }
        });

        let jsonLines = [];
        process.lines.forEach(line => {
            let conn = {
                type: "WFConnection",
                color: FormColor.GetColour(line.color).secondary,
                outlineColor: FormColor.GetColour(line.color).primary,
                vertex: [],
                source: { node: line.source.parent.id, port: line.source.name },
                target: {node: line.target.parent.id, port: line.target.name  }
            };

            conn.vertex.push(...line.vertices);
            
            jsonLines.push(conn);
        });

        const reader = new draw2d.io.json.Reader();
        reader.unmarshal(this.view, jsonLines);
        //console.log(jsonLines);
        //console.log(this.view.figures.data);
        
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