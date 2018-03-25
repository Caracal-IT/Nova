class FormControl extends draw2d.shape.layout.HorizontalLayout {
    constructor(onSelect, text, container, index, outputLocator = null) {
        super({stroke: 0});

        this.properties = [
            { name: "name" },
            { name: "label" }
        ];
        
        this.onSelect = onSelect;
        this.container = container;
        this.index = index;
        this.control = [];
        
        this.addLabel(text);
        this.addUp();
        this.addDown();

        this.type = "input";

        if (outputLocator) {
            this.type = "output";
            super.createPort("output", outputLocator);
        }
        
        this._name = text;
        this._label = text;
        this.label = text;

        this.onSelect(this);
        
        if (this.onSelect) 
            this.controlLabel.onClick = () => this.onSelect(this);
    }
    
    get label(){
        return this.controlLabel.getText();
    }

    set label(text){
        this.syncLabelAndText(text);
        
        this.controlLabel.setText(text);

        this.controlLabel.padding.right = (107 - 6 * text.length);
        this.container.refresh();
    }
    
    get name(){
        return this._name;
    }

    set name(text){
        this._name = text;
    }

    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));
        bags.push(new ControlPropertyBag(this));

        return bags;
    }
    
    syncLabelAndText(text){
        if (this._name === this._label) {
            this._name = text;
            this._label = text;
            this.controlLabel.setText(text);
        }
    }

    addLabel(){
        this.controlLabel = this.createLabel("Label", {left: 5, right: (107 - 30)}, true);
        super.add(this.controlLabel);

        const contextMenu = new FormContextMenu(this);
        this.controlLabel.onContextMenu = () => contextMenu.show();

        let editor = new draw2d.ui.LabelInplaceEditor({
            onCommit: () => {
                this.controlLabel.padding.right = (107 - 6 * this.controlLabel.text.length)
                this.container.refresh();

                this.syncLabelAndText(this.controlLabel.text);
                
                if (this.onSelect)
                    this.onSelect(this);
            }
        });
        
        this.controlLabel.installEditor(editor);
    }

    addUp(){
        let up = this.createLabel("⬆");
        super.add(up, new draw2d.layout.locator.RightLocator());
        up.on('click', () => this.moveUp());
    }

    addDown(){
        let down = this.createLabel("⬇");
        super.add(down, new draw2d.layout.locator.RightLocator());
        down.on('click', () => this.moveDown());
    }

    moveUp() {
        this.container.moveUp(this.index);
    }

    moveDown() {
        this.container.moveDown(this.index);
    }

    createLabel(text, padding = {}, resizeable = false) {
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
    }

    unSelectItem(){
        super.setBackgroundColor(undefined);
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