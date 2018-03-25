class WFConnection extends draw2d.Connection{
    constructor(view){
        super();

        this.initilize();
        
        this.remove = () => view.removeItem(this);
    }
    
    initilize(){
        this.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
        this.setRouter(new draw2d.layout.connection.InteractiveManhattanConnectionRouter());
        this.setOutlineStroke(1);
        this.setStroke(5);
        this.setRadius(20);

        this.contextMenu = new ColorContextMenu(this);
        this.onContextMenu = () => this.contextMenu.show();
        this.changeColor(FormColor.GetColour("Blue"));
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
        let vertices = [];
        this.vertices.data.forEach(v => vertices.push({x: v.x, y: v.y}));
        
        return {
            source: this.getPort(this.sourcePort),
            target: this.getPort(this.targetPort),
            color: this.formColor.name,
            vertices: vertices
        };
    }
    
    getPort(port){
        return {
            id: port.id,
            name: port.name,
            parent: {
                id: port.parent.id,
                name: port.parent.name
            }
        };
    }
}