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

    init(attr, setter, getter) {
        super.init(attr, setter, getter);
        
        if (this.userData && this.userData.color)
            this.changeColor(FormColor.GetColour(this.userData.color));
    }
    
    setColor(value) {
        if (this.userData && this.userData.color)
            this.formColor = FormColor.GetColour(this.userData.color);
        
        super.setColor(value);
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
        let parent = port.parent;
        
        while (parent.parent != null)
            parent = parent.parent;
        
        return {
            id: port.id,
            name: port.name,
            parent: {
                id: parent.id,
                name: parent.name
            }
        };
    }
}