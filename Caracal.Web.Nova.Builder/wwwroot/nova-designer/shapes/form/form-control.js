class FormControl extends draw2d.shape.layout.HorizontalLayout {
    constructor(onSelect, text, container, index, outputLocator = null) {
        super({stroke: 0});

        this.onSelect = onSelect;
        this.container = container;
        this.index = index;
        
        this.propertWidget = new FormPropertiesWidget(this);

        this.addLabel(text);
        this.addUp();
        this.addDown();

        this.userData = {
            type: "input",
            name: text,
            properties: []
        };

        if (outputLocator) {
            this.userData.control = {type: "paper-button"};
            this.userData.type = "output";

            super.createPort("output", outputLocator);
        }
        else {
            this.userData
                .control = {
                    type: "paper-input",
                    properties: [
                        { name: "Placeholder", value: "Please select an item" }
                    ]
                };
        }

        this.setName(text);
        this.setLabel(text);
        
        if (this.onSelect) 
            this.label.onClick = () => this.onSelect(this);
    }
    
    getName(){
        return this.userData.name;
    }

    setName(text){
        this.userData.name = text;
        
        this.syncLabelAndText(text);
    }

    getLabel(){
         return this.label.text;
    }

    setLabel(text) {
        this.syncLabelAndText(text);
        
        this.userData.label = text;
        this.label.setText(text);

        this.label.padding.right = (107 - 6 * text.length);
        this.container.refresh();
    }
    
    syncName() {
        return this.userData.name === this.userData.label;
    }
    
    syncLabelAndText(text){
        if (this.userData.name === this.userData.label) {
            this.userData.name = text;
            
            this.userData.label = text;
            this.label.setText(text);
        }
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

    addLabel(){
        this.label = this.createLabel("Label", {left: 5, right: (107 - 30)}, true);
        super.add(this.label);

        const contextMenu = new FormContextMenu(this);
        this.label.onContextMenu = () => contextMenu.show();

        let editor = new draw2d.ui.LabelInplaceEditor({
            onCommit: () => {
                this.label.padding.right = (107 - 6 * this.label.text.length)
                this.container.refresh();

                this.syncLabelAndText(this.label.text);
                
                if (this.onSelect)
                    this.onSelect(this);
            }
        });
        
        this.label.installEditor(editor);
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
}