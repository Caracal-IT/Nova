class FormPropertiesWidget {
    constructor(figure){
        this.figure = figure;
        
        this.controls = [
            {
                control: "paper-input",
                type: "input",
                properties: [
                    { name: "Placeholder", value: "Please select an item" }
                ]
            },
            {
                control: "paper-controlLabel",
                type: "input",
                properties: [
                    { name: "Text", value: "Welcome !!" }
                ]
            },
            {
                control: "paper-button",
                type: "output",
                properties: [
                    { name: "style", value: "default" }
                ]
            }
        ];
            
        
    }
    
    show(container, figure){
        this.container = container;
        this.figure = figure;
        this.type = figure.userData.type;
        this.control = figure.userData.control;
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
            if (c.type === this.type) {
                if (this.controlType === c.control)
                    input.append(`<option selected value="${c.control}">${c.control}</option>`);
                else
                    input.append(`<option value="${c.control}">${c.control}</option>`);
            }
        });

        input.on("change", (event) => {
            const option = input.val();
            this.createProperties(option);
            this.control.type = option;

            //if (this.control.type !== option) {
                console.log(option);
                this.control.properties = [];

                for (let prop of this.controls.find(p => p.control === option).properties) {
                    this.control.properties.push({name: prop.name, value: prop.value});
                }
           // }
        });
    }

    createProperties(option){
        this.table.find("[data-type=property]").each(function(index){ $(this).remove(); });
        // prop.forEach(p => p.remove());

        if (option.length > 0) {
            let properties = this.controls.find(c => c.control === option).properties;

            properties.forEach(p => this.addItem(p.name, p.value));
        }
    }
    
    addItem(name, value, onchange){
        let property = null;
        if (this.control && this.control.properties) {
            property = this.control.properties.find(p => p.name === name);

            if (property && property.value)
                value = property.value;
        }
        
        this.table.append(`
            <tr data-type="property">
                <td>${name}</td>
                <td>
                <div><input id="${name}" type="text" value="${value}" style="width:100%;"></div></td>
            </tr>
        `);

        let input = this.table.find("#" + name);
        input.on("keypress", (event) => {
            if (this.control && this.control.properties) {
                property = this.control.properties.find(p => p.name === name);
                
                if (property)
                    property.value = event.target.value;
                else 
                    this.control.properties.push({name: name, value: event.target.value});
            }
            
        });

        return input;
    }
}