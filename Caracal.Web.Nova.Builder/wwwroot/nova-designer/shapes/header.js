class Header extends draw2d.shape.basic.Label{
    constructor(text) {
        super({
            text:text,
            padding:{right:23},
            fontSize:60,
            fontColor:"#00CED1",
            resizeable:true,
            stroke:0,
            userData: {
                type: "paper-header"
            }
        });
        
        this.userData.properties = [];
        this.addContextMenu();

        this.installEditor(new draw2d.ui.LabelEditor({
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