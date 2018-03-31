class Panel extends draw2d.shape.composite.Raft {
    constructor(caption, w, h){
        super({
            radius: 5
        });

        this.properties = [
            { name: "caption" },
            { name: "name" }
        ];
        
        this.addContextMenu();
        this.addCaptionLabel();

        super.setDimension(w, h);

        this.caption = caption;
        this.name = this.id.replace(/-/g, "").substring(0, 20);
    }

    get caption() {
        return this.captionLabel.getText();
    }

    set caption(value){
        this.captionLabel.setText(value);
    }

    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));

        return bags;
    }

    addContextMenu() {
        this.contextMenu = new ColorContextMenu(this);
        this.onContextMenu = () => this.contextMenu.show();
    }

    addCaptionLabel() {
        this.captionLabel = new draw2d.shape.basic.Label({
            text: "Panel",
            radius: 5,
            padding: {top:4, right:2, bottom:4,left:3}
        });
        super.add(this.captionLabel, new draw2d.layout.locator.PortLocator());
        this.captionLabel.onContextMenu = () => this.contextMenu.show();
    }

    changeColor(formColor) {
        this.formColor = formColor;
        
        this.setBackgroundColor(formColor.panel.secondary);
        this.captionLabel.setBackgroundColor(formColor.panel.primary);
        this.captionLabel.setFontColor(formColor.panel.font);
    }

    get definition() {
        return {
            id: this.id,
            name: this.name,
            caption: this.caption,
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