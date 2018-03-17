class Factory {
    constructor() {
        this.activityFactory = new ActivityFactory(); 
        this.formFactory = new FormFactory();
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

class FormFactory {
    form(){
        return new Form("Form Activity");
    }
}