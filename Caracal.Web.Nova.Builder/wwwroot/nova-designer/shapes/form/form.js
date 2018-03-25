class Form extends draw2d.shape.layout.VerticalLayout {
    constructor(text, onSelect) {
        super({
            stroke:1,
            radius:2,
            gap:2
        });

        this.properties = [
            { name: "name" },
            { name: "label" }
        ];
        
        this.onSelect = onSelect;
        this.controls = [];
        this.createHeader();
        
        this.label = text;
        this.name = this.id.replace(/-/g, "").substring(0, 20);
        
        this.changeColor(FormColor.GetColour("Blue"));
        this.outputLocator = new CollapsibleOutputLocator();
        
        if (this.onSelect)
            this.header.titleLabel.onClick = () => this.onSelect(this);
    }

    get label(){
        return this.header.titleLabel.getText();
    }

    set label(text){
        this.header.titleLabel.setText(text);
    }
    
    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));
        
        return bags;
    }
    
    createHeader(){
        const contextMenu = new FormContextMenu(this);
        this.header = new FormHeader(this.onSelect, "Header", this, contextMenu);
        
        super.add(this.header);
    }

    changeColor(formColor) {
        this.formColor = formColor;
        
        super.setColor(formColor.primary);
        super.setBackgroundColor(formColor.secondary);
        this.header.changeColor(formColor);
        
        for (let control of this.controls){
            if(control.getBackgroundColor().blue || control.getBackgroundColor().red){
                const bgColor = new draw2d.util.Color(formColor.secondary);
                control.setBackgroundColor(bgColor.darker(0.10));
            }
        }
            
    }

    createInputControl(){
        const item = new FormControl(this.onSelect, "Name", this, this.controls.length);
        this.controls.push(item);

        super.add(item);

        return item;
    }

    createOutputControl(){
        const item = new FormControl(this.onSelect, "Continue", this, this.controls.length, this.outputLocator);
        this.controls.push(item);

        super.add(item);
        
        return item;
    }

    toggle(){
        this.controls.forEach(ctrl => ctrl.setVisible(!ctrl.isVisible()));
    }

    removeControl(item) {
        this.controls.splice(item.index, 1);

        for (let i = item.index; i < this.controls.length; i++)
            this.controls[i].index = i;

        super.remove(item);
    }

    moveUp(index) {
        if (index === 0 || this.controls.length  === 1)
            return;

        this.controls[index].index--;
        this.controls[index - 1].index++;

        this.refresh();
    }

    moveDown(index) {
        if (index === this.controls.length - 1 || this.controls.length  === 1)
            return;

        this.controls[index].index++;
        this.controls[index + 1].index--;

        this.refresh();
    }

    refresh() {
        this.controls.forEach(ctrl => super.remove(ctrl));
        this.controls.sort((a, b) => a.index >  b.index);
        this.controls.forEach(ctrl => super.add(ctrl));
    }

    get definition() {
        const myControls = [];
        myControls.push(this.header.definition);
        
        this.controls.forEach(c => myControls.push(c.definition));
        
        return {
            id: this.id,
            name: this.name,
            type: "FormActivity",
            factory: "shapeFactory",
            color: this.formColor.name,
            x: this.x,
            y: this.y,
            properties: [
                { name: "form", value: { controls: myControls }}
            ],
            inputPorts: this.getPortIds(this.header.inputPorts),
        };
    }

    getPortIds(ports){
        const portsIds = [];
        ports.data.forEach(p => portsIds.push(p.id));

        return portsIds;
    }
}