class Activity extends draw2d.shape.node.Between  {
    constructor(text, type, image) {
        super({
            width: 70,
            height: 70,
            resizeable: false,
            radius: 5
        });

        this.properties = [
            { name: "name" },
            { name: "label" }
        ];
       
        this.addContextMenu();
        
        this.addLabel(text);
        this.addImage(image);
        this.addTypeLabel(type);

        this.label = text;
        this.name = this.id.replace(/-/g, "").substring(0, 20);
    }

    get label(){
        return this.contolLabel.getText();
    }

    set label(text){
        this.contolLabel.setText(text);
        this.contolLabel.setVisible(text.length > 0);
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

    changeColor(formColor) {
        super.setBackgroundColor(formColor.secondary);
        this.typeLabel.setBackgroundColor(formColor.primary);
        this.typeLabel.setFontColor(formColor.font);
    }
    
    addLabel(label){
        this.contolLabel = new draw2d.shape.basic.Label({radius: 5, text:label});
        super.add(this.contolLabel, new draw2d.layout.locator.SmartDraggableLocator());
        this.contolLabel.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: (text) => this.contolLabel.setVisible(text.length > 0)
        }));
        
        this.contolLabel.setPosition(0, -28);
    }

    addImage(image){
        let img = new image({ width: 40, height: 40});
        this.add(img, new XYLocator(0, 11));
    }

    addTypeLabel(type){
        this.typeLabel = new draw2d.shape.basic.Label({text:type, radius: 5, padding: {top:4, right:2, bottom:4,left:3}});
        this.add(this.typeLabel, new draw2d.layout.locator.PortLocator());
    }
    
    add(shape, locator){
        super.add(shape, locator);
        shape.onContextMenu = () => this.contextMenu.show();
    }

    get definition() {
        return {
            name: this.name,
            label: this.label,
            properties: this.properties.slice(2)
        };
    }
}