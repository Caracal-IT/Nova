controls = [
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



process = {
    name: "registration",
    lines: [
        {
            color: "Teal",
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
        },
        {
            color: "Red",
            source: {
                id: "59c3f326-7823-3430-b57b-fb8709dc7c93",
                name: "output0",
                parent: {
                    id: "0bbe9e99-f399-ab57-9c6b-e958989a1c91",
                    name: "099dba76ae3dea9ecdbc"
                },
            },
            target: {
                id: "110f22db-1850-59ce-17ec-4c4f9161a05c",
                name: "input0",
                parent: {
                    id: "13a3a1bf-efda-a14c-4b14-dd1c75eb762a",
                    name: "SaveForm"
                },
            },
            vertices: [
                { "x": 490, "y": 269 },
                { "x": 534, "y": 269 },
                { "x": 534, "y": 151.5 },
                { "x": 670, "y": 151.5 }
            ],
        },

        {
            color: "Green",
            source: {
                id: "52e6fa52-4369-c8e3-3b1a-f17c31537a2f",
                name: "output0",
                parent: {
                    id: "13a3a1bf-efda-a14c-4b14-dd1c75eb762a", /* The parent is wrong*/
                    name: "SaveForm"
                },
            },
            target: {
                id: "6b5791c6-25be-4c41-13ea-7b655d0914b7",
                name: "input0",
                parent: {
                    id: "0bbe9e99-f399-ab57-9c6b-e958989a1c91", /* The parent is wrong*/
                    name: "099dba76ae3dea9ecdbc"
                },
            },
            vertices: [
                { x: 823, y: 196.75 },
                { x: 843, y: 196.75 },
                { x: 843, y: 350.875 },
                { x: 510, y: 350.875 },
                { x: 510, y: 299 },
                { x: 530, y: 299 }
            ]
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
            id: "0bbe9e99-f399-ab57-9c6b-e958989a1c91",
            factory: "activityFactory",
            label: "Set Reply Message",
            name: "099dba76ae3dea9ecdbc",
            color: "Purple",
            properties: [
                { name: "code", value: "function execute(params, wf, notify) { }", type: "textarea" }
            ],
            labelPos: { x: -20, y: -29 },
            x: 420,
            y: 234
        },
        {
            type: "NovaAlertActivity",
            factory: "activityFactory",
            label: "Diaplay Message",
            name: "300dba76ae3dea9ecdbc",
            color: "Gold",
            properties: [
                { name: "title", value: "Success1" },
                { name: "message", value: "SMO Saved" },
                { name: "style", value: "warning" }
            ],
            labelPos: { x: -20, y: -29 },
            x: 530,
            y: 264
        },
        {
            type: "FormActivity",
            id: "13a3a1bf-efda-a14c-4b14-dd1c75eb762a",
            factory: "shapeFactory",
            color: "Teal",
            properties: [{
                name: "form",
                value: {
                    controls: [
                        {name:"_#header", type: "paper-header", properties: [{name: "label", value: "Personal Details"}]},
                        {
                            name:"FirstName123",
                            id: "241c6a8b-bee6-4323-201a-651564c4b427",
                            type: "paper-input",
                            label: "First Name",
                            properties: [
                                {name: "type", value: "paper-input"},
                                {name: "placeholder", value: "Please enter first name"}
                            ]
                        },
                        {
                            name:"Surname",
                            id: "241c6a8b-bee6-4323-301a-651564c4b423",
                            type: "paper-label",
                            label: "Last Name",
                            properties: [
                                {name: "type", value: "paper-label"},
                                {name: "text", value: "my surname"}
                            ]
                        },
                        {
                            name:"SaveForm",
                            id: "28f7443a-3e1c-0a06-e222-a9a3b47b1a9c",
                            type: "paper-button",
                            label: "Save Form",
                            outputPorts: ['e1b04321-6118-1570-903f-cc8dabf11ed6'],
                            properties: [
                                {name: "type", value: "paper-button"},
                                {name: "style", value: "btn btn-outline-primary"}
                            ]
                        }
                    ]
                }
            }],
            x:	670,
            y:	140
        }
    ]
};