class Factory {
    constructor() {
        this.activityFactory = new ActivityFactory(); 
        this.shapeFactory = new ShapeFactory();
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
    form() {
        return new Form("Form Activity");
    }

    start() {
        return new Terminator("Start", "#AFEEEE", "output", "#008080");
    }

    end() {
        return new Terminator("End", "#F08080", "input");
    }
}