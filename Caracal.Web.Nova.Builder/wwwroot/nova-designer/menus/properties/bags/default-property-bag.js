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

        if (name === "label" && this.shape["name"] === this.shape["label"])
            document.querySelector("#name").value = value;

        if (name === "caption" && this.shape["name"] === this.shape["text"])
            document.querySelector("#name").value = value;
    }
}