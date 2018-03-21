class PropertyPane {
    constructor(propertyBag, container, workflowServer) {

        if (propertyBag["setWorkflowServer"])
            propertyBag.setWorkflowServer(workflowServer);

        this.bag = propertyBag;
        this.container = container;
        this.content = document.createElement("div");
        this.container.appendChild(this.content);
        this.workflowServer = workflowServer;
    }
    
    static renderPane(propertyBag, container, workflowServer) {
        const p = new PropertyPane(propertyBag, container, workflowServer);
        p.render();
    }
    
    render(){
        this.content.innerHTML = "";
        
        this.createHeader();
        this.createProperties();
    }

    createHeader(){
        const header = document.createElement("h2");
        header.innerText = this.bag.header;
        this.content.appendChild(header);
    }
    
    createProperties(){
        const table = document.createElement("table");
        this.content.appendChild(table);
        
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
            this.createSelectOptions(p, e);
            this.createChangeEvent(p,  e);
        }
        else 
            this.createDefaultEvent(p,  e);
        

        e.id = p.name;
        e.value = this.bag.getProperty(p.name);
        
        return e;
    }
    
    createDefaultEvent(property, event) {
        event.onkeyup = () => this.bag.setProperty(property.name, event.value);
    }
    
    createChangeEvent(property, event){
        event.onchange = () => {
            if (this.bag.onChange) {
                this.bag.onChange(event, this);
            }
            else
                this.bag.setProperty(property.name, event.value);
        }
    }
    
    createSelectOptions(property, event) {
        property.items.forEach(i => {
            const option = document.createElement("option");
            option.value = i.value;
            option.innerText = i.name;

            if (property.value === i.value)
                option.checked = true;

            event.appendChild(option);
        });
    }
}