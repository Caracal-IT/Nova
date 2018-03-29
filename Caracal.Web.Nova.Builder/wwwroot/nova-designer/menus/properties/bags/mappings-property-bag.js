class MappingsPropertyBag {
    constructor(shape){
        this.header = "Mappings";
        this.headerButton = "➕";
        this.shape = shape;
        this.includeColumnHeaders = true;
        
        this.mappings = [
            {source: "id", destination: "id", action: "inout"},
            {source: "firstname", destination: "firstname", action: "inout"},
            {source: "surname", destination: "surname", action: "inout"},
            {source: "hotel", destination: "hotel", action: "inout"},
            {source: "roomNumber", destination: "roomNumber", action: "inout"},
            {source: "reply", destination: "reply", action: "inout"}
        ];
    }
    
    get properties() {
        return this.mappings; //this.shape.properties;
    }
    
    get columns() {
        return [
            {name: "source", type: "input"},
            {name: "destination", type: "input"},
            {name: "action", type: "select",
                items: [
                    { name: "in", value: "in" },
                    { name: "out", value: "out" },
                    { name: "inout", value: "inout" },
                    { name: "delete", value: "delete" }
                ]}
        ];
    }

    onHeaderAction(sender){
        sender.createProperty({source: "source", destination: "destination", action: "inout"});
    }
    
    onChange(item, source, parent, pane){
        if (item.name === "action" && source.value === "delete"){
            parent.remove();
            pane.showHideHeader();
        } 
    }

    getProperty(name) {
        if (name === "label" || name === "name")
            return this.shape[name];
        else
            return this.shape.properties.find(p => p.name === name).value;
    }

    setProperty(name, value){
        if (name === "label" || name === "name")
            this.shape[name] = value;
        else
            this.shape.properties.find(p => p.name === name).value = value;

        if (name === "label" && this.shape["name"] === this.shape["label"])
            document.querySelector("#name").value = value;
    }
}