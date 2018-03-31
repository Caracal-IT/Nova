class FormHeader extends draw2d.shape.layout.HorizontalLayout {
    constructor(onSelect, caption, container, contextMenu) {
        super({
            stroke: 0,
            radius: 0,
            bgColor: "#1daeef"
        });

        this.onSelect = onSelect;
        this.container = container;
        this.contextMenu = contextMenu;
        this.images = [];

        this.createPorts();
        this.addCaption(caption);
        this._caption = caption;
        this._label = this.getCamelCase(caption);
        // this.images.push(this.addImage(draw2d.shape.icon.Contract));
        // this.images.push(this.addImage(draw2d.shape.icon.Expand, false));
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get caption() {
        return this._caption;
    }

    set caption(value) {
        this.syncLabel(value);
        this.captionLabel.setText(value);
    }
    
    syncLabel(value) {
        if (this.trimAll(this._caption) === this.trimAll(this._label))
            this._label = this.getCamelCase(value);
            
        this._caption = value;
    }
    
    getCamelCase(value) {
        return value.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    }
    
    trimAll(value){
        return value.replace(/\s/g, '');
    }
    
    addCaption(text) {
        this.captionLabel = new draw2d.shape.basic.Label({
            text: text,
            fontColor: "#ffffff",
            stroke: 0,
            fontSize: 10,
            fontFamily: "Verdana",
            padding: {left: 5, right: 60 - text.length}
        });

        this.captionLabel.onContextMenu = () => this.contextMenu.show();

        let editor = new draw2d.ui.LabelInplaceEditor({
            onCommit: () => {
                this.syncLabel(this.captionLabel.getText());

                if (this.onSelect)
                    this.onSelect(this.container);
            }
        });

        this.captionLabel.installEditor(editor);

        super.add(this.captionLabel);
    }

    createPorts() {
        super.createPort("input", new draw2d.layout.locator.LeftLocator());
        super.createPort("input", new draw2d.layout.locator.RightLocator());
        super.createPort("input", new draw2d.layout.locator.TopLocator());
    }

    addImage(image, visible = true) {
        let img = new image({minWidth: 20, minHeight: 20, width: 20, height: 20, visible: visible});
        img.on("click", () => this.toggle());
        super.add(img);

        return img;
    }

    toggle() {
        this.images.forEach(img => img.setVisible(!img.isVisible()));
        this.container.toggle();
    }

    changeColor(formColor) {
        super.setBackgroundColor(formColor.primary);
        this.captionLabel.setFontColor(formColor.font);
    }

    get definition() {
        return {
            id: this.id,
            name: "_header_",
            type: "paper-header",
            label: this.label,
            caption: this.caption,
            outputPorts: [],
            properties: []
        };
    }
}