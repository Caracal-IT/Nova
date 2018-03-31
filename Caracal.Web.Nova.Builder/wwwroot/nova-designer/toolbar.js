class Toolbar {
    constructor(elementId, view, workflowServer){
        this.html = $("#" + elementId);

        view.getCommandStack().addEventListener(this);
        view.on("select", $.proxy(this.onSelectionChanged,this));
        
        this.undoButton = this.registerDisabledButton("#undoButton", () => view.undo());
        this.redoButton = this.registerDisabledButton("#redoButton", () => view.redo());
        this.deleteButton = this.registerDisabledButton("#deleteButton", () => this.onDelete(view));
        this.colorDropdown = this.registerColorSelect("#colorDropdown", (sender) => this.onChangeColor(sender));

        this.registerButton("#zoomInButton", () => view.zoomIn());
        this.registerButton("#zoomResetButton", () => view.zoomReset());
        this.registerButton("#zoomOutButton", () => view.zoomOut());
        
        this.registerButton("#publishButton", () => workflowServer.publish());
    }

    registerColorSelect(selector, clickHandler){
        let select = $(selector);
        select[0].disabled = true;
        select.change((sender) => clickHandler(sender));

        FormColor.GetColours().forEach(c => {
            const option = document.createElement("option");
            option.value = c.name;
            option.innerText = c.name;

            select[0].appendChild(option);
        });
        
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
            this.colorDropdown[0].style.color = event.figure.formColor.primary;
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
        if (this.figure && this.figure.changeColor && sender.target.value){
            const formColor = FormColor.GetColour(sender.target.value);
            this.figure.changeColor(formColor);

            this.colorDropdown[0].style.color = formColor.primary;
        }
    }

    stackChanged(event) {
        this.undoButton.button("option", "disabled", !event.getStack().canUndo());
        this.redoButton.button("option", "disabled", !event.getStack().canRedo());
    }
}