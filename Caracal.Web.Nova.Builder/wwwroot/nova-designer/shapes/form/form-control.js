class FormControl extends draw2d.shape.layout.HorizontalLayout {
    constructor(onSelect, caption, container, index, isOutputControl = false) {
        super({stroke: 0});

        this.properties = [
            { name: "name" },
            { name: "caption", sync: ["name", "label"] },
            { name: "label", sync: ["name"] }
        ];
        
        this.onSelect = onSelect;
        this.container = container;
        this.index = index;
        this.control = [];
        
        this.addCaptionLabel(caption);
        this.addUp();
        this.addDown();

        this.type = "input";

        if (isOutputControl) {
            this.type = "output";
            this.createPorts();           
        }
        
        this._name = caption;
        this._label = caption;
        this.caption = caption;

        this.onSelect(this);
        
        if (this.onSelect) 
            this.captionLabel.onClick = () => this.onSelect(this);
    }

    createPorts(){
        this.createPort("output", new draw2d.layout.locator.LeftLocator());
        this.createPort("output", new draw2d.layout.locator.RightLocator());        
    }
    
    get caption(){
        return this._caption;
    }

    set caption(value){
        this.syncLabelAndName(value);
        this.captionLabel.setText(value);

        this.captionLabel.padding.right = (107 - 6 * value.length);
        this.container.refresh();
    }
    
    get name(){
        return this._name;
    }

    set name(text){
        this._name = text;
    }

    get label(){
        return this._label;
    }

    set label(value){
        this.syncName(value);
        this._label = value;
    }

    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));
        bags.push(new ControlPropertyBag(this));

        return bags;
    }
    
    syncLabelAndName(value){
        if (this.trimAll(this._caption) === this.trimAll(this._label)) 
            this._label = this.getCamelCase(value);
        
        if (this.trimAll(this._caption) === this.trimAll(this._name)) 
            this._name = this.trimAll(value);
        
        this._caption = value;
    }

    syncName(value){
        if (this.trimAll(this._label) === this.trimAll(this._name)) 
            this._name = this.trimAll(value);

        this._label = value;
    }

    getCamelCase(value) {
        return value.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    }

    trimAll(value){
        if (value) 
            return value.replace(/\s/g, '');
        
        return value;
    }
    
    addCaptionLabel(){
        this.captionLabel = FormControl.createCaptionLabel("Label", {left: 5, right: (107 - 30)}, true);
        super.add(this.captionLabel);

        const contextMenu = new FormContextMenu(this);
        this.captionLabel.onContextMenu = () => contextMenu.show();

        let editor = new draw2d.ui.LabelInplaceEditor({
            onCommit: () => {
                this.captionLabel.padding.right = (107 - 6 * this.captionLabel.text.length);
                this.container.refresh();

                this.syncLabelAndName(this.captionLabel.text);
                
                if (this.onSelect)
                    this.onSelect(this);
            }
        });
        
        this.captionLabel.installEditor(editor);
    }

    addUp(){
        let up = FormControl.createCaptionLabel("⬆");
        super.add(up, new draw2d.layout.locator.RightLocator());
        up.on('click', () => this.moveUp());
    }

    addDown(){
        let down = FormControl.createCaptionLabel("⬇");
        super.add(down, new draw2d.layout.locator.RightLocator());
        down.on('click', () => this.moveDown());
    }

    moveUp() {
        this.container.moveUp(this.index);
    }

    moveDown() {
        this.container.moveDown(this.index);
    }

    static createCaptionLabel(text, padding = {}, resizeable = false) {
        return new draw2d.shape.basic.Label({
            text: text,
            padding: padding,
            fontSize: 10,
            fontColor: "#303030",
            fontFamily: "Lucida Console",
            stroke: 0,
            resizeable: resizeable
        });
    }

    selectItem() {
        const bgColor = new draw2d.util.Color(this.container.formColor.secondary);
        
        super.setBackgroundColor(bgColor.darker(0.10));
        
        this.container.selectedItem = this;
    }

    unSelectItem(){
        super.setBackgroundColor(undefined);
        this.container.selectedItem = null;
    }

    changeColor(formColor) {
        this.container.changeColor(formColor);
    }

    createInputControl(){
        this.container.createInputControl();
    }

    createOutputControl(){
        this.container.createOutputControl();
    }

    remove() {
        this.container.removeControl(this);
    }

    get definition() {
        let def = {
            id: this.id, 
            name: this.name,
            label: this.label,
            caption: this.caption,
            outputPorts: this.getPortIds(this.outputPorts),
            properties: []
        };

        this.control.forEach(c => def.properties.push({name: c.name, value: c.value }));
        
        return def;
    }

    getPortIds(ports){
        const portsIds = [];
        ports.data.forEach(p => portsIds.push(p.id));

        return portsIds;
    }
}

// .replace(/([a-z](?=[A-Z]))/g, '$1 ')