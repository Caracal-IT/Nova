class FormControl extends draw2d.shape.layout.HorizontalLayout {
    constructor(text, container, index, outputLocator = null) {
        super({stroke: 0});

        this.container = container;
        this.index = index;

        this.addLabel(text);
        this.addUp();
        this.addDown();

        this.userData = {
            type: "input"
        };

        if (outputLocator) {
            this.userData = {
                type: "output"
            };

            super.createPort("output", outputLocator);
        }
    }

    addLabel(text){
        let label = this.createLabel(text, {left: 5, right: (107 - 6 * text.length)}, true);
        super.add(label);

        const contextMenu = new FormContextMenu(this);
        label.onContextMenu = () => contextMenu.show();

        let editor = new draw2d.ui.LabelInplaceEditor({
            onCommit: () => {
                label.padding.right = (107 - 6 * label.text.length)
                this.container.refresh();
            }
        });
        label.installEditor(editor);
    }

    addUp(){
        let up = this.createLabel("⬆");
        super.add(up, new draw2d.layout.locator.RightLocator());
        up.on('click', () => this.moveUp());
    }

    addDown(){
        let down = this.createLabel("⬇");
        super.add(down, new draw2d.layout.locator.RightLocator());
        down.on('click', () => this.moveDown());
    }

    moveUp() {
        this.container.moveUp(this.index);
    }

    moveDown() {
        this.container.moveDown(this.index);
    }

    createLabel(text, padding = {}, resizeable = false) {
        return new draw2d.shape.basic.Label({
            text: text,
            padding: padding,
            fontSize: 10,
            fontColor: "#303030",
            fontFamily: "Lucida Console",
            stroke: 0,
            resizeable: resizeable
        });
    }

    changeColor(formColor) {
        this.container.changeColor(formColor);
    }

    createInputControl(){
        this.container.createInputControl();
    }

    createOutputControl(){
        this.container.createOutputControl();
    }

    remove() {
        this.container.remove(this.index);
    }
}