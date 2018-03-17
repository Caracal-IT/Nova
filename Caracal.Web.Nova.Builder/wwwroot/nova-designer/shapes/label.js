class Label extends draw2d.shape.basic.Label {
    constructor(text, viewCanvas){
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

        this.viewCanvas = viewCanvas;

        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
    }

    remove() {
        const cmd = new draw2d.command.CommandDelete(this);
        this.viewCanvas.getCommandStack().execute(cmd);
    }
}