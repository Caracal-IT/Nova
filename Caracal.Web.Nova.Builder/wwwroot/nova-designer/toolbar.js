class Toolbar {
    constructor(elementId, view, workflowServer){
        this.html = $("#" + elementId);

        view.getCommandStack().addEventListener(this);
        view.on("select", $.proxy(this.onSelectionChanged,this));
        
        this.undoButton = this.registerDisabledButton("#undoButton", () => view.undo());
        this.redoButton = this.registerDisabledButton("#redoButton", () => view.redo());
        this.deleteButton = this.registerDisabledButton("#deleteButton", () => this.onDelete(view));
        this.colorDropdown = this.registerSelect("#colorDropdown", (sender) => this.onChangeColor(sender));

        this.registerButton("#zoomInButton", () => view.zoomIn());
        this.registerButton("#zoomResetButton", () => view.zoomReset());
        this.registerButton("#zoomOutButton", () => view.zoomOut());
        
        this.registerButton("#publishButton", () => workflowServer.publish());
    }

    registerSelect(selector, clickHandler){
        let select = $(selector);
        select[0].disabled = true;
        select.change((sender) => clickHandler(sender));

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
        this.figure = event.figure;
        
        this.colorDropdown[0].disabled = (event.figure === null);
        
        if (this.colorDropdown[0].disabled) 
            this.colorDropdown[0].value = "";
        else if (event.figure.formColor) {
            this.colorDropdown[0].value = event.figure.formColor.name;
            this.colorDropdown[0].style.color = event.figure.formColor.name;
        }
        
        this.deleteButton.button( "option", "disabled", event.figure === null );
    }
    
    onDelete(view){
        if (this.figure && this.figure.selectedItem) {
            this.figure.selectedItem.remove();
            this.figure.onSelect(this.figure);
        }
        else
            view.delete();
    }
    
    onChangeColor(sender){
        this.colorDropdown[0].style.color = sender.target.value;

        if (this.figure && this.figure.changeColor && sender.target.value){
            const formColor = FormColor.GetColour(sender.target.value);
            this.figure.changeColor(formColor);
        }
    }

    stackChanged(event) {
        this.undoButton.button("option", "disabled", !event.getStack().canUndo());
        this.redoButton.button("option", "disabled", !event.getStack().canRedo());
    }
}