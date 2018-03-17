class Activity extends draw2d.shape.node.Between  {
    constructor(label, type, color, image) {
        super({
            bgColor: color,
            width: 70,
            height: 70,
            resizeable: false,
            radius: 5,
            userData: { label: label }
        });
        
        this.setName(this.id.replace(/-/g, "").substring(0, 20));
        
        this.addContextMenu();
        
        this.addLabel(label);
        this.addImage(image);
        this.addTypeLabel(type);
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
        this.contextMenu = new DeleteContextMenu(this);
        this.onContextMenu = () => this.contextMenu.show();
    }

    addLabel(label){
        this.label = new draw2d.shape.basic.Label({radius: 5, text:label});
        super.add(this.label, new draw2d.layout.locator.SmartDraggableLocator());
        this.label.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: (text) => { this.userData.label = text }
        }));
    }

    addImage(image){
        let img = new image({ width: 40, height: 40});
        this.add(img, new XYLocator(0, 11));
    }

    addTypeLabel(type){
        let t = new draw2d.shape.basic.Label({text:type, radius: 5, padding: {top:4, right:2, bottom:4,left:3}});
        this.add(t, new draw2d.layout.locator.PortLocator());
    }
    
    add(shape, locator){
        super.add(shape, locator);
        shape.onContextMenu = () => this.contextMenu.show();
    }
}