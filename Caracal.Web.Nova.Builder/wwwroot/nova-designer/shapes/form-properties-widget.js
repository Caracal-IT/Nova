class FormPropertiesWidget {
    constructor(figure){
        this.figure = figure;
        
        this.controls = [
            {
                type: "paper-input",
                properties: [
                    { name: "Placeholder", value: "please select an item" }
                ]
            },
            {
                type: "paper-label",
                properties: [
                    { name: "Text", value: "Welcome !!" }
                ]
            }
        ];
            
        
    }
    
    show(container, figure){
        this.container = container;
        this.figure = figure;
        this.controlType = figure.userData.control.type;

        this.container.append("<h2 style='top:10px;'>Control</h2>");
        this.addTable();
        this.addType();

        this.createProperties(this.controlType);
    }

    addTable(){
        this.table = this.container.append("<table style='width: 100%;'></table>");
    }
    
    addType(){
        this.table.append(`
            <tr>
                <td>Type</td>
                <td>
                    <div>
                        <select id="type" type="text" style="height:100%;width:100%;"><option></option></select>
                    </div>
                </td>
            </tr>
        `);

        let input = this.table.find("#type");

        this.controls.forEach(c => {
            if (this.controlType === c.type)
                input.append(`<option selected value="${c.type}">${c.type}</option>`);
            else
                input.append(`<option value="${c.type}">${c.type}</option>`);
        });

        input.on("change", (event) => {
            const option = input.val();
            this.createProperties(option);
           
        });
    }

    createProperties(option){
        this.table.find("[data-type=property]").each(function(index){ $(this).remove(); });
        // prop.forEach(p => p.remove());

        if (option.length > 0) {
            let properties = this.controls.find(c => c.type === option).properties;

            properties.forEach(p => this.addItem(p.name, p.value));
        }
    }
    
    addItem(name, value, onchange){

        this.table.append(`
            <tr data-type="property">
                <td>${name}</td>
                <td>
                <div><input id="${name}" type="text" value="${value}" style="width:100%;"></div></td>
            </tr>
        `);

        let input = this.table.find("#" + name);
       // input.on("keyup", (event) => onchange(event.target.value));

        return input;
    }
}