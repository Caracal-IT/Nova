class PropertiesWindow {
    constructor(id, view){
        this.id = "#" + id;
        this.items = $(this.id).find("#items");
        
        view.on("select", $.proxy(this.onSelectionChanged,this));
    }

    onSelectionChanged(emitter, event){
        this.items.html("");
        
        if (event && event.figure && event.figure.getProperties) {
            this.addTable();

            if (event.figure.setName)
                this.addItem("Name", event.figure.getName(), (text) => event.figure.setName(text));
            
            if (event.figure.setLabel) 
                this.addItem("Label", event.figure.getLabel(), (text) => event.figure.setLabel(text));
     
            for (let item of event.figure.getProperties())
                this.addItem(item.name, item.value, (text) => event.figure.setProperty(item.name, text));
        }
    }
    
    addTable(){
        this.items.html("<table style='width: 100%;'></table>");
    }
    
    addItem(name, value, onchange){
        let table = this.items.find("table");
        table.append(`
            <tr>
                <td>${name}</td>
                <td>
                <div><input id="${name}" type="text" value="${value}" style="width:100%;"></div></td>
            </tr>
        `);

        let input = this.items.find("#" + name);
        input.on("keyup", (event) => onchange(event.target.value));
    }
}