class WFConnection extends draw2d.Connection{
    constructor(view){
        super();

        this.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
        this.setRouter(new draw2d.layout.connection.InteractiveManhattanConnectionRouter());
        this.setOutlineStroke(1);
        this.setOutlineColor("#303030");
        this.setStroke(5);
        this.setColor('#00A8F0');
        this.setRadius(20);
        
        this.contextMenu = new ColorContextMenu(this);
        this.onContextMenu = () => this.contextMenu.show();
        
        this.remove = () => view.removeItem(this);
    }

    delegateTarget(draggedFigure) {
        return this;
    }

    changeColor(formColor) {
        super.setColor(formColor.primary);
    }
}