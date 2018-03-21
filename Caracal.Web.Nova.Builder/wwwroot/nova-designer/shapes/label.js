class Label extends draw2d.shape.basic.Label {
    constructor(text){
        super({
            text:text,
            padding:{right:23},
            fontSize:15,
            fontColor: "#191970",
            resizeable:true,
            stroke:0
        });

        this.properties = [
            { name: "name" },
            { name: "label", type: "textarea" }
        ];

        this.addContextMenu();

        this.label = text;
        this.name = this.id.replace(/-/g, "").substring(0, 20);
    }

    get label(){
        return this.getText();
    }

    set label(text){
        this.setText(text);
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
            name: this.name,
            label: this.label,
            type: "Label",
            x: this.x,
            y: this.y,
        };
    }
}