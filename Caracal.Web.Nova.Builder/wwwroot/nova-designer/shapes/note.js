class Note extends draw2d.shape.note.PostIt  {
    constructor(caption) {
        super({
            text: caption
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

    set caption(text){
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
            id: this.id,
            name: this.name,
            caption: this.caption,
            type: "Note",
            factory: "shapeFactory",
            x: this.x,
            y: this.y,
        };
    }
}