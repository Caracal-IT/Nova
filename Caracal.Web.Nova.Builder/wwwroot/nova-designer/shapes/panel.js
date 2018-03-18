class Panel extends draw2d.shape.composite.Raft {
    constructor(text, w, h){
        super({
            radius: 5,
            userData: {
                type: "paper-panel"
            }
        });

        this.userData.properties = [];
        
        this.addContextMenu();
        this.addLabel();

        this.setName(this.id.replace(/-/g, "").substring(0, 20));
        this.setLabel(text);
        
        super.setDimension(w, h);

        this.changeColor(FormColor.GetColour("WhiteSmoke"));
    }

    getName(){
        return this.userData.name;
    }

    setName(text){
        this.userData.name = text;
    }
    
    getLabel(){
        return this.label.text;
    }

    setLabel(text){
        this.userData.label = text;
        this.label.setText(text);

        this.label.setVisible(text.length > 0);
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

    addContextMenu() {
        this.contextMenu = new ColorContextMenu(this, FormColor.PanelColors());
        this.onContextMenu = () => this.contextMenu.show();
    }

    addLabel() {
        this.label = new draw2d.shape.basic.Label({
            text:"Panel",
            radius: 5,
            padding: {top:4, right:2, bottom:4,left:3}
        });
        super.add(this.label, new draw2d.layout.locator.PortLocator());
        this.label.onContextMenu = () => this.contextMenu.show();
        this.label.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: (text) => { 
                this.userData.label = text;
                this.label.setVisible(text.length > 0);
            }
        }));
    }

    changeColor(formColor) {
        this.setBackgroundColor(formColor.secondary);
        this.label.setBackgroundColor(formColor.primary);
        this.label.setFontColor(formColor.font);
    }
}