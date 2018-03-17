class Terminator extends draw2d.shape.basic.Circle {
    constructor(text, color, port, fontColor = "#FFFFFF"){
        super({
            bgColor: color,
            resizeable: false,
            userData: {
                type: text
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

    //remove() {
       // const cmd = new draw2d.command.CommandDelete(this);
       // this.viewCanvas.getCommandStack().execute(cmd);
    //}
}