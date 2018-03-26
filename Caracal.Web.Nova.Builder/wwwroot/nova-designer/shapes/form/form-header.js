class FormHeader extends draw2d.shape.layout.HorizontalLayout {
    constructor(onSelect, text, container, contextMenu){
        super({
            stroke: 0,
            radius: 0,
            bgColor: "#1daeef"
        });

        this.onSelect = onSelect;
        this.container = container;
        this.contextMenu = contextMenu;
        this.images = [];

        this.addTitle(text);
        // this.images.push(this.addImage(draw2d.shape.icon.Contract));
        // this.images.push(this.addImage(draw2d.shape.icon.Expand, false));
    }

    addTitle(text){
        super.createPort("input");
        this.titleLabel = new draw2d.shape.basic.Label({
            text: text,
            fontColor:"#ffffff",
            stroke:0,
            fontSize:10,
            fontFamily:"Verdana",
            padding:{left:5, right:60 - text.length}
        });
        
        this.titleLabel.onContextMenu = () => this.contextMenu.show();

        let editor = new draw2d.ui.LabelInplaceEditor({
            onCommit: () => {
                if (this.onSelect)
                    this.onSelect(this.container);
            }
        });

        this.titleLabel.installEditor(editor);
        
        super.add(this.titleLabel);
    }

    addImage(image, visible = true){
        let img = new image({ minWidth:20, minHeight:20, width:20, height:20, visible: visible});
        img.on("click", () => this.toggle());
        super.add(img);

        return img;
    }

    toggle(){
        this.images.forEach(img => img.setVisible(!img.isVisible()));
        this.container.toggle();
    }

    changeColor(formColor) {
        super.setBackgroundColor(formColor.primary);
    }

    get definition() {
        return {
            id: this.id,
            name: "_#header",
            type: "paper-header",
            properties: [
                {name: "label", value: this.titleLabel.getText()}
            ]
        };
    }

    getPortIds(ports){
        const portsIds = [];
        ports.data.forEach(p => portsIds.push(p.id));

        return portsIds;
    }
}