class Header extends draw2d.shape.basic.Label{
    constructor(text, viewCanvas) {
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

        this.viewCanvas = viewCanvas;

        super.installEditor(new draw2d.ui.LabelEditor());

        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
    }

    remove() {
        const cmd = new draw2d.command.CommandDelete(this);
        this.viewCanvas.getCommandStack().execute(cmd);
    }
}