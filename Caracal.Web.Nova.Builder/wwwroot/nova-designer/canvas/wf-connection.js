class WFConnection extends draw2d.Connection{
    constructor(view){
        super();

        this.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
        this.setRouter(new draw2d.layout.connection.InteractiveManhattanConnectionRouter());
        this.setOutlineStroke(1);
        this.setStroke(5);
        this.setRadius(20);
        
        this.contextMenu = new ColorContextMenu(this);
        this.onContextMenu = () => this.contextMenu.show();
        this.changeColor(FormColor.GetColour("Blue"));
        
        this.remove = () => view.removeItem(this);
    }

    delegateTarget(draggedFigure) {
        return this;
    }

    changeColor(formColor) {
        this.formColor = formColor;
        
        this.setColor(formColor.secondary);
        this.setOutlineColor(formColor.primary);
    }

    get definition() {
        return {
            source: this.sourcePort.id,
            target: this.targetPort.id,
            color: this.formColor.name,
            lineSegments: this.lineSegments.data
        };
    }
}