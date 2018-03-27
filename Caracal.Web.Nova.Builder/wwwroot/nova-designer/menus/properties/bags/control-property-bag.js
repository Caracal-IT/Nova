class ControlPropertyBag {
    constructor(shape){
        this.header = "Controls";
        this.shape = shape;
        this.properties = [];
        this.controls = [];
    }

    setWorkflowServer(value) {
        if (!this.workflowServer) {
            this.workflowServer = value;
            this.controls = this.workflowServer.controls();
        }

        const type = this.shape.control.find(c => c.name === "type");
        
        console.log(this.shape);
        
        this.onChange(type?type.value:null);        
    }

    getProperty(name) {
        return this.shape.control.find(c => c.name === name).value;
    }

    setProperty(name, value){
        this.shape.control.find(c => c.name === name).value = value;
    }

    onChange(event, pane){
        let value = this.shape.type === "input" ?  "paper-input" : "paper-button";
        
        if (event && event.value)
            value = event.value;
        else if (event) 
            value = event;
        
        let control = this.controls.find(c => c.name === value);
        
        if (control == null) {
            control = this.shape.control.find(c => c.name === event.id);
            
            if (control != null) 
                control.value = event.value;
            
            return;
        }
        
        this.createProperties(control);
        this.addControlsToShape(control);
        
        if (pane)
            pane.render();
    }
    
    createProperties(control){
        if (!control)
            return;
        
        this.properties = [{
                name: "type",
                value: control.name,
                type: "select",
                items: []
            }];
        
        this.addPropertyControls();
        this.properties.push(...control.properties);
    }
    
    addPropertyControls(){
        this.controls.forEach(c => {
            if (c.type === this.shape.type)
                this.properties[0].items.push({name: c.name, value: c.name})
        });
    }
    
    
    addControlsToShape(control){
        const type = this.shape.control.find(c => c.name === "type");

        if (!type || type.value !== control.name) {
            this.shape.control = [
                { name: "type", value: control.name }
            ];

            control.properties.forEach(c => this.shape.control.push({name: c.name,  value: c.value}));            
        }
    }
}