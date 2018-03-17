class Toolbar {
    constructor(elementId, view){
        this.html = $("#" + elementId);
        let workflowServer = new WorkflowServer(view);

        view.getCommandStack().addEventListener(this);
        view.on("select", $.proxy(this.onSelectionChanged,this));
        
        this.undoButton = this.registerDisabledButton("#undoButton", () => view.undo());
        this.redoButton = this.registerDisabledButton("#redoButton", () => view.redo());
        this.deleteButton = this.registerDisabledButton("#deleteButton", () => view.delete());

        this.registerButton("#zoomInButton", () => view.zoomIn());
        this.registerButton("#zoomResetButton", () => view.zoomReset());
        this.registerButton("#zoomOutButton", () => view.zoomOut());
        
        this.registerButton("#publishButton", () => workflowServer.publish());
    }

    registerButton(selector, clickHandler){
        let button = $(selector);
        button
            .button()
            .click(() => clickHandler());
        
        return button;
    }

    registerDisabledButton(selector, clickHandler){
        return this.registerButton(selector, clickHandler)
                   .button("option", "disabled", true);
    }

    onSelectionChanged(emitter, event){
        this.deleteButton.button( "option", "disabled", event.figure === null );
    }

    stackChanged(event) {
        this.undoButton.button("option", "disabled", !event.getStack().canUndo());
        this.redoButton.button("option", "disabled", !event.getStack().canRedo());
    }
}