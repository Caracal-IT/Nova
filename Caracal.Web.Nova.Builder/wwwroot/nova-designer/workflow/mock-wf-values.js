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