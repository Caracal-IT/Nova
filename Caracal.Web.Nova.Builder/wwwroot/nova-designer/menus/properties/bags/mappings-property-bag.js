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
        const property = {source: "source", destination: "destination", action: "inout"};
        this.properties.push(property);
        sender.createProperty(property);
    }
    
    onChange(column, property, source, parent, pane){
        const index = this.properties.indexOf(property);
        
        if (column.name === "action" && source.value === "delete"){
            this.properties.splice(index, 1);
            
            parent.remove();
            pane.showHideHeader();
        } 
        else 
            this.properties[index][column.name] = source.value;
    }
}