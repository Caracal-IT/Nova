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
        if (this.bag.headerButton){
            const headerButton = document.createElement("span");
            headerButton.innerText = this.bag.headerButton;

            if (this.bag.onHeaderAction)
                headerButton.onclick = () => this.bag.onHeaderAction(this);
            
            this.content.appendChild(headerButton);
        }
        
        const header = document.createElement("h2");
        header.innerText = this.bag.header;
        this.content.appendChild(header);
    }
    
    showHideHeader(){
        if (this.bag.includeColumnHeaders) {
            if (this.table.children.length > 1)
                this.table.removeAttribute("style");
            else
                this.table.setAttribute("style", "display:none");
        }
    }
    
    createProperties(){
        this.table = document.createElement("table");
        this.table.className = "header";
        this.content.appendChild(this.table);
        
        if (this.bag.includeColumnHeaders) {
            this.createColumnHeaders();
            this.showHideHeader();
        }
        
        this.bag.properties.forEach(p => this.createProperty(p));
    }

    createColumnHeaders() {
        const row = document.createElement("tr");
        this.table.appendChild(row);

        this.bag.columns.forEach(c => {
            let cell = document.createElement("th");

            cell.innerText = c.name;
            cell.setAttribute("style", "background:#C0C0C0;color:white");

            row.appendChild(cell);
        });
    }
    
    createProperty(p){
        if(p.type && p.type === "ignore")
            return;
        
        const row = document.createElement("tr");
        this.table.appendChild(row);
        
        this.bag.columns.forEach(c => {
            let cell = document.createElement("td");
            
            if (c.type === "label") 
                cell.innerText = p[c.name];
            else if (c.type === "input")
                this.createInputPropertyItem(c, p, cell, row);
            else if (c.type === "select") 
                this.createSelectPropertyItem(c, p, cell, row);
            else if (c.type === "control")
                cell.appendChild(this.createControl(p));
            
            row.appendChild(cell);
        });
        
        this.showHideHeader();
    }
    
    createInputPropertyItem(column, property, cell, row){
        const input = document.createElement("input");
        input.value = property[column.name];
        cell.appendChild(input);

        if (this.bag.onChange)
            input.onchange = () => this.bag.onChange(column, property, input, row, this);
    }
    
    createSelectPropertyItem(column, property, cell, row) {
        const select = document.createElement("select");

        column.items.forEach(o => {
            const option = document.createElement("option");
            option.innerText = o.name;
            option.value = o.value;

            select.appendChild(option);
        });

        select.value = property[column.name];
        cell.appendChild(select);

        if (this.bag.onChange)
            select.onchange = () => this.bag.onChange(column, property, select, row, this);
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