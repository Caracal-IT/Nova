class Label extends draw2d.shape.basic.Label {
    constructor(caption){
        super({
            text:caption,
            padding:{right:23},
            fontSize:15,
            fontColor: "#191970",
            resizeable:true,
            stroke:0
        });

        this.properties = [
            { name: "name" },
            { name: "caption", type: "textarea" }
        ];

        this.addContextMenu();

        this.caption = caption;
        this.name = this.id.replace(/-/g, "").substring(0, 20);
    }

    get caption(){
        return this.getText();
    }

    set caption(value){
        this.setText(value);
    }

    changeColor(formColor) {
        this.formColor = formColor;
        this.setFontColor(formColor.primary);
    }
    
    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));

        return bags;
    }        
    
    addContextMenu() {
        this.contextMenu = new DeleteContextMenu(this);
        this.onContextMenu = () => this.contextMenu.show();
    }

    get definition() {
        return {
            id: this.id,
            name: this.name,
            caption: this.caption,
            color: this.formColor.name,
            type: "Label",
            factory: "shapeFactory",
            x: this.x,
            y: this.y,
        };
    }
}