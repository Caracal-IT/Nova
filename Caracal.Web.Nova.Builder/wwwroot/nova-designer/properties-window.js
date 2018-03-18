class PropertiesWindow {
    constructor(id, view){
        this.id = "#" + id;
        this.items = $(this.id).find("#items");
        
        this.figure = null;
        
        view.on("select", $.proxy(this.onSelectionChanged,this));
    }

    onSelectionChanged(emitter, event) {
        this.items.html("");
        
        if (this.figure && this.figure.unSelectItem)
            this.figure.unSelectItem();
        
        if (event && event.figure) 
            this.showProp(event.figure);
    }
    
    showProp(figure){
        if (this.figure && this.figure.unSelectItem)
            this.figure.unSelectItem();
        
        if (figure.selectItem)
            figure.selectItem();
        
        this.figure = figure;
        this.items.html("");
        
        this.addTable();
        let nameTextbox = null;
        
        if (figure.setName)
            nameTextbox = this.addItem("Name", figure.getName(), (text) => figure.setName(text));

        this.addLabel(figure, nameTextbox);
        
        if (figure.getProperties) {
            for (let item of figure.getProperties())
                this.addItem(item.name, item.value, (text) => figure.setProperty(item.name, text));
        }
    }
    
    addLabel(figure, nameTextbox){
        if (figure.setLabel) {
            this.addItem("Label", figure.getLabel(), (text) => {
                if (figure.syncName && figure.syncName() && nameTextbox)
                    nameTextbox.val(text);

                figure.setLabel(text);
            });
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
        
        return input;
    }
}