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
            { name: "Method", value: "get" }
        ];
        
        const act = new Activity("Webservice Activity", "Webservice", "#BA55D3", draw2d.shape.icon.GlobeAlt);
        act.userData.type = "WebserviceActivity";
        act.userData.properties = properties;
        
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
        startAct.userData.properties = properties;
        
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