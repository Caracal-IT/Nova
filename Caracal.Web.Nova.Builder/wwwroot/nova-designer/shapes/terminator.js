class Terminator extends draw2d.shape.basic.Circle {
    constructor(text, color, port, fontColor = "#FFFFFF"){
        super({
            bgColor: color,
            resizeable: false,
            userData: {
                type: text,
                name: text,
                properties: []
            }
        });
        
        const label = new draw2d.shape.basic.Label({
            text:text,
            color:color,
            fontColor:fontColor
        });

        super.add(label, new draw2d.layout.locator.CenterLocator);
        this.createPort(port);

        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
        label.onContextMenu = () => contextMenu.show();
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
}