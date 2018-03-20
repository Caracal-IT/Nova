class DefaultPropertyBag {
    constructor(shape){
        this.header = "Properties";
        this.shape = shape;
    }

    get properties() {
        return this.shape.properties;
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