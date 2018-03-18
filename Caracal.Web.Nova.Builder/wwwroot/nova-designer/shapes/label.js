class Label extends draw2d.shape.basic.Label {
    constructor(text){
        super({
            text:text,
            padding:{right:23},
            fontSize:15,
            fontColor: "#191970",
            resizeable:true,
            stroke:0,
            userData: {
                type: "paper-label"
            }
        });

        this.userData.properties = [];

        this.addContextMenu();

        this.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: (text) => { this.userData.label = text }
        }));

        this.setName(this.id.replace(/-/g, "").substring(0, 20));
    }

    getName(){
        return this.userData.name;
    }

    setName(text){
        this.userData.name = text;
    }
    
    getLabel(){
        return this.text;
    }

    setLabel(text){
        this.userData.label = text;
        this.setText(text);
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
}