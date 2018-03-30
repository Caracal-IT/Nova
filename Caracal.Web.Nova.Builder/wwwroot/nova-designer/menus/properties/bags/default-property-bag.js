class DefaultPropertyBag {
    constructor(shape){
        this.header = "Properties";
        this.shape = shape;
    }

    get properties() {
        return this.shape.properties;
    }

    get columns() {
        return [
            {name: "name", type: "label"},
            {name: "value", type: "control"}
        ];
    }

    getProperty(name) {
        if (name === "caption" || name === "label" || name === "name")
            return this.shape[name];
        else
            return this.shape.properties.find(p => p.name === name).value;
    }

    setProperty(name, value){
        if (name === "caption" || name === "label" || name === "name")
            this.shape[name] = value;
        else
            this.shape.properties.find(p => p.name === name).value = value;

        const property = this.shape.properties.find(p => p.name === name);
        
        if (property.sync) {
            property.sync.forEach(p => {
                document.querySelector(`#${p}`).value = this.shape[p];
            });
        }
    }
}