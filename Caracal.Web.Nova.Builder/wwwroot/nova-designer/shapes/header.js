class Header extends draw2d.shape.basic.Label{
    constructor(caption) {
        super({
            text:caption,
            padding:{right:23},
            fontSize:60,
            fontColor:"#00CED1",
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
            type: "Header",
            factory: "shapeFactory",
            x: this.x,
            y: this.y,
        };
    }
}