class Panel extends draw2d.shape.composite.Raft {
    constructor(text, w, h){
        super({
            radius: 5
        });

        this.properties = [
            { name: "name" },
            { name: "label" }
        ];
        
        this.addContextMenu();
        this.addLabel();

        super.setDimension(w, h);
        this.changeColor(FormColor.GetColour("WhiteSmoke"));

        this.label = text;
        this.name = this.id.replace(/-/g, "").substring(0, 20);
    }

    get label(){
        return this.controlLabel.getText();
    }

    set label(text){
        this.controlLabel.setText(text);
    }

    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));

        return bags;
    }

    addContextMenu() {
        this.contextMenu = new ColorContextMenu(this, FormColor.PanelColors());
        this.onContextMenu = () => this.contextMenu.show();
    }

    addLabel() {
        this.controlLabel = new draw2d.shape.basic.Label({
            text:"Panel",
            radius: 5,
            padding: {top:4, right:2, bottom:4,left:3}
        });
        super.add(this.controlLabel, new draw2d.layout.locator.PortLocator());
        this.controlLabel.onContextMenu = () => this.contextMenu.show();
    }

    changeColor(formColor) {
        this.formColor = formColor;
        
        this.setBackgroundColor(formColor.secondary);
        this.controlLabel.setBackgroundColor(formColor.primary);
        this.controlLabel.setFontColor(formColor.font);
    }

    get definition() {
        return {
            id: this.id,
            name: this.name,
            label: this.label,
            type: "Panel",
            factory: "shapeFactory",
            color: this.formColor.name,
            x: this.x,
            y: this.y,
            width: this.getWidth(),
            height: this.getHeight()
        };
    }
}