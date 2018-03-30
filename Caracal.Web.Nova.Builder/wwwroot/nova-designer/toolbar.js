class Toolbar {
    constructor(elementId, view, workflowServer){
        this.html = $("#" + elementId);

        view.getCommandStack().addEventListener(this);
        view.on("select", $.proxy(this.onSelectionChanged,this));
        
        this.undoButton = this.registerDisabledButton("#undoButton", () => view.undo());
        this.redoButton = this.registerDisabledButton("#redoButton", () => view.redo());
        this.deleteButton = this.registerDisabledButton("#deleteButton", () => view.delete());
        this.colorDropdown = this.registerSelect("#colorDropdown", () => {});

        this.registerButton("#zoomInButton", () => view.zoomIn());
        this.registerButton("#zoomResetButton", () => view.zoomReset());
        this.registerButton("#zoomOutButton", () => view.zoomOut());
        
        this.registerButton("#publishButton", () => workflowServer.publish());
    }

    registerSelect(selector, clickHandler){
        let select = $(selector);
        select[0].disabled = true;
        select.click(() => clickHandler());

        return select;
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
        this.colorDropdown[0].disabled = (event.figure === null);
        
        if (this.colorDropdown[0].disabled) 
            this.colorDropdown[0].value = "";
        
        this.deleteButton.button( "option", "disabled", event.figure === null );
    }

    stackChanged(event) {
        this.undoButton.button("option", "disabled", !event.getStack().canUndo());
        this.redoButton.button("option", "disabled", !event.getStack().canRedo());
    }
}