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
    webService() {
        let properties = [
            { name: "Url", value: "/smo/test/1" },
            {
                name: "Method", 
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
        act.type = "WebserviceActivity";
        act.properties.push(...properties);
        act.changeColor(FormColor.GetColour("Purple"));
        
        return act;
    }

    codeActivity() {
        let properties = [
            { name: "Code", value: "", type: "textarea" }
        ];

        const act = new Activity("Code Activity", "Code", draw2d.shape.icon.Gear2);
        act.type = "CodeActivity";
        act.properties.push(...properties);
        act.changeColor(FormColor.GetColour("Gold"));

        return act;
    }

    alertActivity() {
        let properties = [
            { name: "Title", value: "Success" },
            { name: "Message", value: "Welcome !!" },
            { 
                name: "Type", 
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
        act.type = "AlertActivity";
        act.properties.push(...properties);
        act.changeColor(FormColor.GetColour("Pink"));

        return act;
    }
}

class ShapeFactory {
    constructor(onSelect){
        this.onSelect = onSelect;
    }
    
    form() {
        return new Form("Form Activity", this.onSelect);
    }

    start() {
        let properties = [
            { name: "ProcessName", value: "custom-reservation" },
            { name: "Id", value: "1" }
        ];
        
        const startAct = new Terminator("Start", "#AFEEEE", "output", "#008080");
        startAct.properties.push(...properties);
        
        return startAct;
    }

    end() {
        return new Terminator("End", "#F08080", "input");
    }

    panel() {
        return new Panel("Panel", 730, 150);
    }

    title() {
        return new Header("Title");
    }

    label() {
        return new Label("Label");
    }

    note(){
        return new Note("Note");
    }
}