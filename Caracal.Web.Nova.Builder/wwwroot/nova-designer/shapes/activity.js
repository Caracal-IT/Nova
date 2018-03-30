class Activity extends draw2d.shape.basic.Rectangle  {
    constructor(caption, type, image) {
        super({
            width: 70,
            height: 70,
            resizeable: false,
            radius: 5
        });

        this.properties = [
            { name: "name" },
            { name: "caption" }
        ];
       
        this.propertyBags = [new DefaultPropertyBag(this)];
        
        this.addPorts();
        this.addContextMenu();
        
        this.addCaptionLabel(caption);
        this.addImage(image);
        this.addTypeLabel(type);

        this.type = type;
        this.caption = caption;
        this.name = this.id.replace(/-/g, "").substring(0, 20);
    }

    get caption(){
        return this.captionLabel.getText();
    }

    set caption(value){
        this.captionLabel.setText(value);
        this.captionLabel.setVisible(value.length > 0);
    }

    addPropertyBag(bag) {
        this.propertyBags.push(bag);
    }
    
    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));

        return this.propertyBags;
    }
    
    addPorts(){
        this.createPort("hybrid", new draw2d.layout.locator.LeftLocator());
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(0, 0));
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(0, 17));        
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(0, 53));
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(0, 70));


        this.createPort("hybrid", new draw2d.layout.locator.RightLocator());
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(70, 0));
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(70, 17));        
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(70, 53));
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(70, 70));


        this.createPort("hybrid", new draw2d.layout.locator.TopLocator());
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(17, 0));        
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(53, 0));


        this.createPort("hybrid", new draw2d.layout.locator.BottomLocator());
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(17, 70));        
        this.createPort("hybrid", new draw2d.layout.locator.XYAbsPortLocator(53, 70));
    }
    
    addContextMenu() {
        this.contextMenu = new ColorContextMenu(this);
        this.onContextMenu = () => this.contextMenu.show();
    }

    changeColor(formColor) {
        this.formColor = formColor;
        
        super.setBackgroundColor(formColor.secondary);
        this.typeLabel.setBackgroundColor(formColor.primary);
        this.typeLabel.setFontColor(formColor.font);
    }

    addCaptionLabel(caption){
        this.captionLabel = new draw2d.shape.basic.Label({radius: 5, text:caption});
        super.add(this.captionLabel, new draw2d.layout.locator.SmartDraggableLocator());
        this.captionLabel.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: (caption) => this.captionLabel.setVisible(caption.length > 0)
        }));
        
        this.captionLabel.setPosition(0, -28);
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
        const props = [];

        this.properties.forEach(p => {
            if (p.name !== "name" && p.name !== "caption")
                props.push({name: p.name, value: p.value })
        });
        
        return {
            id: this.id, 
            name: this.name,
            caption: this.caption,
            type: this.type,
            factory: "activityFactory",
            color: this.formColor.name,
            x: this.x,
            y: this.y,
            labelPos: { 
                x:  this.captionLabel.x, 
                y: this.captionLabel.y
            },
            outputPorts: this.getPortIds(this.hybridPorts),
            inputPorts: this.getPortIds(this.inputPorts),
            properties: props
        };
    }

    getPortIds(ports){
        const portsIds = [];
        ports.data.forEach(p => portsIds.push(p.id));

        return portsIds;
    }
}