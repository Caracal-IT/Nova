class Form extends draw2d.shape.layout.VerticalLayout {
    constructor(text, viewCanvas) {
        super({
            bgColor:"#93d7f3",
            color:"#39b2e5",
            stroke:1,
            radius:2,
            gap:2,
            userData: {
                type: "form",
                controls: []
            }
        });

        //this.viewCanvas = viewCanvas;

        this.controls = [];
        this.createHeader(text);

        this.outputLocator = new CollapsibleOutputLocator();
    }

    createHeader(text){
        const contextMenu = new FormContextMenu(this);
        this.header = new FormHeader(text, this, contextMenu);

        // const cmd = new draw2d.command.CommandAdd(this, this.header, 0, 0);
        // this.viewCanvas.getCommandStack().execute(cmd);

        super.add(this.header);
    }

    changeColor(formColor) {
        super.setColor(formColor.primary);
        super.setBackgroundColor(formColor.secondary);
        this.header.changeColor(formColor);
    }

    createInputControl(){
        const item = new FormControl("Name", this, this.controls.length);
        this.controls.push(item);

        super.add(item);
    }

    createOutputControl(){
        const item = new FormControl("Continue", this, this.controls.length, this.outputLocator);
        this.controls.push(item);

        super.add(item);
    }

    toggle(){
        this.controls.forEach(ctrl => ctrl.setVisible(!ctrl.isVisible()));
    }

    remove(index = -1) {
        if (index >= 0) {
            super.remove(this.controls[index]);
            this.controls.splice(index, 1);

            for (let i = index; i < this.controls.length; i++)
                this.controls[i].index = i;

            this.refresh();

            return;
        }

        //const cmd = new draw2d.command.CommandDelete(this);
        //this.viewCanvas.getCommandStack().execute(cmd);
    }

    moveUp(index) {
        if (index === 0 || this.controls.length  === 1)
            return;

        this.controls[index].index--;
        this.controls[index - 1].index++;

        this.refresh();
    }

    moveDown(index) {
        if (index === this.controls.length - 1 || this.controls.length  === 1)
            return;

        this.controls[index].index++;
        this.controls[index + 1].index--;

        this.refresh();
    }

    refresh() {
        this.controls.forEach(ctrl => super.remove(ctrl));
        this.controls.sort((a, b) => a.index >  b.index);
        this.controls.forEach(ctrl => super.add(ctrl));
    }
}