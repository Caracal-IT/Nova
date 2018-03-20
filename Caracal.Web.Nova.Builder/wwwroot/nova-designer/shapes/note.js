class Note extends draw2d.shape.note.PostIt  {
    constructor(text) {
        super({
            text: text
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
            label: this.label
        };
    }
}