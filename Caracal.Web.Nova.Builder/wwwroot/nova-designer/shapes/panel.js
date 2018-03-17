class Panel extends draw2d.shape.composite.Raft {
    constructor(text, w, h, viewCanvas){
        super({
            radius: 5,
            userData: {
                type: "paper-panel"
            }
        });

        this.viewCanvas = viewCanvas;

        const label = new draw2d.shape.basic.Label({
            text:text,
            radius: 5,
            padding: {top:4, right:2, bottom:4,left:3}
        });

        const contextMenu = new DeleteContextMenu(this);
        label.onContextMenu = () => contextMenu.show();

        super.setDimension(w, h);
        super.add(label, new draw2d.layout.locator.PortLocator());
        label.installEditor(new draw2d.ui.LabelInplaceEditor());

        super.toBack();
    }

    remove() {
        const cmd = new draw2d.command.CommandDelete(this);
        this.viewCanvas.getCommandStack().execute(cmd);
    }
}