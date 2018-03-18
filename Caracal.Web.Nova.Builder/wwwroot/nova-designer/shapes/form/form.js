class Form extends draw2d.shape.layout.VerticalLayout {
    constructor(text, onSelect) {
        super({
            bgColor:"#93d7f3",
            color:"#39b2e5",
            stroke:1,
            radius:2,
            gap:2,
            userData: {
                type: "form",
                controls: []
            }
        });

        this.onSelect = onSelect;
        this.formColor = FormColor.GetColour("Blue");
        
        this.userData.properties = [];
        this.controls = [];
        this.createHeader();

        this.setName(this.id.replace(/-/g, "").substring(0, 20));
        this.setLabel(text);

        this.outputLocator = new CollapsibleOutputLocator();
        
        if (this.onSelect)
            this.header.titleLabel.onClick = () => this.onSelect(this);
    }

    getName(){
        return this.userData.name;
    }

    setName(text){
        this.userData.name = text;
    }

    getLabel(){
        return this.header.titleLabel.text;
    }

    setLabel(text){
        this.userData.label = text;
        this.header.titleLabel.setText(text);
    }

    getProperties() {
        return this.userData.properties;
    }

    setProperty(name, value){
        if (!this.userData || !this.userData.properties)
            return;

        const prop = this.userData.properties.find(p => p.name === name);

        if(prop && prop.value)
            prop.value = value;
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
    }

    createOutputControl(){
        const item = new FormControl(this.onSelect, "Continue", this, this.controls.length, this.outputLocator);
        this.controls.push(item);

        super.add(item);
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
}