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
            { name: "mappings", type: "ignore", value: [] },
            { name: "api", value: "/api/smart-object/reservation/1" },
            {
                name: "method", 
                value: "get", 
                type: "select", 
                items: [
                    { name: "get", value: "get" },
                    { name: "post", value: "post" }
                ]
            }
        ];
        
        const act = new Activity("Webservice Activity", "Webservice", draw2d.shape.icon.GlobeAlt);
        act.type = "ApiActivity";
        act.properties.push(...properties);
        act.mappings = [];
        act.changeColor(FormColor.GetColour("Fuchsia"));
        act.addPropertyBag(new MappingsPropertyBag(act));

        return act;
    }

    CodeActivity() {
        let properties = [
            { name: "code", value: "function execute(params, wf, notify) { }", type: "textarea" }
        ];

        const act = new Activity("Code Activity", "Code", draw2d.shape.icon.Gear2);
        act.type = "CodeActivity";
        act.properties.push(...properties);
        act.changeColor(FormColor.GetColour("Pistachio"));

        return act;
    }

    NovaAlertActivity() {
        let properties = [
            { name: "title", value: "Success" },
            { name: "message", value: "Data saved" },
            { 
                name: "style", 
                value: "primary",
                type: "select",
                items: [
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
        act.changeColor(FormColor.GetColour("Orange"));

        return act;
    }
}

class ShapeFactory {
    constructor(onSelect){
        this.onSelect = onSelect;
    }

    FormActivity() {
        const act = new Form("Form Activity", this.onSelect);
        act.changeColor(FormColor.GetColour("Blue"));
        return act;
    }

    start() {
        let properties = [
            { name: "workflow", value: "registration" }
        ];
        
        const startAct = new Terminator("Start", "output");
        startAct.properties.push(...properties);
        startAct.changeColor(FormColor.GetColour("Aqua"));
        
        return startAct;
    }

    end() {
        const terminator = new Terminator("End", "input");
        terminator.changeColor(FormColor.GetColour("Fuchsia"));
        
        return terminator;
    }

    Panel() {
        const panel = new Panel("Panel", 730, 150);
        panel.changeColor(FormColor.GetColour("Silver"));
        return panel;
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