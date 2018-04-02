class MappingsPropertyBag {
    constructor(shape){
        this.header = "Mappings";
        this.headerButton = "➕";
        this.shape = shape;
        this.includeColumnHeaders = true;
    }
    
    get properties() {
        const mappings = this.shape.properties.find(p => p.name === "mappings");
        return mappings.value;
    }
    
    get columns() {
        return [
            {name: "source", title:"Api", type: "input"},
            {name: "destination", title:"Process", type: "input"},
            {name: "direction", title:"action", type: "select",
                items: [
                    { name: "in", value: "in" },
                    { name: "out", value: "out" },
                    { name: "inout", value: "inout" },
                    { name: "delete", value: "delete" }
                ]}
        ];
    }
    
    onHeaderAction(sender){
        const property = {source: "source", destination: "destination", direction: "inout"};
        this.properties.push(property);
        sender.createProperty(property);
    }
    
    onChange(column, property, source, parent, pane){
        const index = this.properties.indexOf(property);
        
        if (column.title === "action" && source.value === "delete"){
            this.properties.splice(index, 1);
            
            parent.remove();
            pane.showHideHeader();
        } 
        else 
            this.properties[index][column.name] = source.value;
    }
}