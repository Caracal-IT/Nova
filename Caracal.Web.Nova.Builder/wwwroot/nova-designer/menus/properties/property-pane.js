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
            p.items.forEach(i => {
                const option = document.createElement("option");
                option.value = i.value;
                option.innerText = i.name;
                
                if (p.value === i.value) 
                    option.checked = true;
                    
                e.appendChild(option);
            });

            e.onchange = () => {
                if (this.bag.onChange)
                    this.bag.onChange(e.value, this);
                else 
                    this.bag.setProperty(p.name, e.value);
            }
        }
        else {
            
            e.onkeyup = () => this.bag.setProperty(p.name, e.value);
        }

        e.id = p.name;
        e.value = this.bag.getProperty(p.name);
        
        return e;
    }
}