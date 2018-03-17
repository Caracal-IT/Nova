class Note extends draw2d.shape.note.PostIt  {
    constructor(text, viewCanvas) {
        super({
            text: text,
            userData: {
                type: "paper-note"
            }
        });

        let editor = new draw2d.ui.LabelEditor({
            onCommit: () => {
            }
        });

        this.viewCanvas = viewCanvas;
        super.installEditor(editor);

        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
    }

    remove() {
        const cmd = new draw2d.command.CommandDelete(this);
        this.getCanvas().getCommandStack().execute(cmd);
    }
}