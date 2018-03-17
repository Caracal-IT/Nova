class FormHeader extends draw2d.shape.layout.HorizontalLayout {
    constructor(text, container, contextMenu){
        super({
            stroke: 0,
            radius: 0,
            bgColor: "#1daeef"
        });

        this.container = container;
        this.contextMenu = contextMenu;
        this.images = [];

        this.addTitle(text);
        this.images.push(this.addImage(draw2d.shape.icon.Contract));
        this.images.push(this.addImage(draw2d.shape.icon.Expand, false));
    }

    addTitle(text){
        super.createPort("input");
        this.titleLabel = new draw2d.shape.basic.Label({
            text: text,
            fontColor:"#ffffff",
            stroke:0,
            fontSize:10,
            fontFamily:"Verdana",
            padding:{left:5, right:50 - text.length}
        });

        this.titleLabel.installEditor(new draw2d.ui.LabelInplaceEditor());
        this.titleLabel.onContextMenu = () => this.contextMenu.show();

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
}