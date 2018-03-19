class PropertyWindow {
   constructor(container) {
       this.container = document.querySelector(container);
   } 
   
   show(shape) {
       if (this.shape && this.shape.unSelectItem)
           this.shape.unSelectItem();

       if (shape && shape.selectItem)
           shape.selectItem();
       
       this.shape = shape;
       this.renderPanes();
       
       this.container.innerHTML = "";
       
       if (shape && shape.getPropertyBags)
           this.renderPanes(shape.getPropertyBags());
   }
   
   renderPanes(propertyBags){
       if (propertyBags)
           propertyBags.forEach(p => PropertyPane.renderPane(p, this.container));
   }
}

class PropertyPane {
    constructor(propertyBag, container) {
        this.bag = propertyBag;
        this.container = container;
    }
    
    static renderPane(propertyBag, container) {
        const p = new PropertyPane(propertyBag, container);
        p.render();
    }
    
    render(){
        this.createHeader();
        this.createProperties();
    }

    createHeader(){
        const header = document.createElement("h2");
        header.innerText = this.bag.header;
        this.container.appendChild(header);
    }
    
    createProperties(){
        const table = document.createElement("table");
        this.container.appendChild(table);
        
        this.bag.properties.forEach(p => this.createProperty(table, p));
    }
    
    createProperty(table, p){
        const row = document.createElement("tr");
        table.appendChild(row);
        
        const cell1 = document.createElement("td");
        cell1.innerText = p.name;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.appendChild(this.createControl(p));
        row.appendChild(cell2);
    }
    
    createControl(p) {
        let e = document.createElement(p.type||"input");
        
        if (p.type === "select" && p.items) {
            p.items.forEach(i => {
                const option = document.createElement("option");
                option.value = i.value;
                option.innerText = i.name;
                
                if (p.value === i.value) 
                    option.checked = true;
                    
                e.appendChild(option);
            });

            e.onchange = () => this.bag.setProperty(p.name, e.value);
        }
        else {
            
            e.onkeyup = () => this.bag.setProperty(p.name, e.value);
        }

        e.id = p.name;
        e.value = this.bag.getProperty(p.name);
        
        return e;
    }
}

class DefaultPropertyBag {
    constructor(shape){
        this.name = "Default";
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