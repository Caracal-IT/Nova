class Factory {
    constructor(onSelect) {
        this.onSelect = onSelect;
        
        this.activityFactory = new ActivityFactory(); 
        this.shapeFactory = new ShapeFactory(onSelect);
    }
    
    create(factory, shape) {
        return this[factory][shape]();
    }
}

class ActivityFactory {
    ApiActivity() {
        let properties = [
            { name: "api", value: "/api/smart-object/reservation/1" },
            {
                name: "method", 
                value: "get", 
                type: "select", 
                items: [
                    { name: "Select an option", value: "" },
                    { name: "get", value: "get" },
                    { name: "post", value: "post" }
                ]
            }
        ];
        
        const act = new Activity("Webservice Activity", "Webservice", draw2d.shape.icon.GlobeAlt);
        act.type = "ApiActivity";
        act.properties.push(...properties);
        act.changeColor(FormColor.GetColour("Purple"));
        
        return act;
    }

    CodeActivity() {
        let properties = [
            { name: "code", value: "function execute(params, wf, notify) { }", type: "textarea" }
        ];

        const act = new Activity("Code Activity", "Code", draw2d.shape.icon.Gear2);
        act.type = "CodeActivity";
        act.properties.push(...properties);
        act.changeColor(FormColor.GetColour("Gold"));

        return act;
    }

    NovaAlertActivity() {
        let properties = [
            { name: "title", value: "Success" },
            { name: "message", value: "Data saved" },
            { 
                name: "style", 
                value: "success",
                type: "select",
                items: [
                    { name: "Select an option", value: "" },
                    { name: "primary", value: "primary" },
                    { name: "secondary", value: "secondary" },
                    { name: "success", value: "success" },
                    { name: "danger", value: "danger" },
                    { name: "warning", value: "warning" },
                    { name: "info", value: "info" }
                ]
            }
        ];

        const act = new Activity("Alert Activity", "Alert", draw2d.shape.icon.CodeTalk);
        act.type = "NovaAlertActivity";
        act.properties.push(...properties);
        act.changeColor(FormColor.GetColour("Pink"));

        return act;
    }
}

class ShapeFactory {
    constructor(onSelect){
        this.onSelect = onSelect;
    }
    
    Form() {
        return new Form("Form Activity", this.onSelect);
    }

    start() {
        let properties = [
            { name: "workflow", value: "registration" }
        ];
        
        const startAct = new Terminator("Start", "#AFEEEE", "output", "#008080");
        startAct.properties.push(...properties);
        
        return startAct;
    }

    end() {
        return new Terminator("End", "#F08080", "input");
    }

    Panel() {
        return new Panel("Panel", 730, 150);
    }

    Header() {
        return new Header("Title");
    }

    Label() {
        return new Label("Label");
    }

    Note(){
        return new Note("Note");
    }
}