class View extends draw2d.Canvas {
    constructor(id, callback){
        super(id);
        
        this.callback = callback;
        this.setScrollArea("#" + id);
        this.installPolicies();
    }

    installPolicies(){
        // super.installEditPolicy(new CopyInterceptorPolicy());
        
        super.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: () => new WFConnection(this)
        }));
    }
    
    onDrag(droppedDomNode, x, y){
        
    }

    onDrop(droppedDomNode, x, y, shiftKey, ctrlKey){
        let factory = new Factory();

        const ds = droppedDomNode[0].dataset;
        let shape = factory.create(ds.factory, ds.shape);
        
        shape.remove = () => this.removeItem(shape);
        const cmd = new draw2d.command.CommandAdd(this, shape, x,  y);
        this.getCommandStack().execute(cmd);
    }
    
    removeItem(item) {
        const cmd = new draw2d.command.CommandDelete(item);
        super.getCommandStack().execute(cmd);
    }

    undo(){
        this.getCommandStack().undo();
    }

    redo(){
        this.getCommandStack().redo()
    }

    delete(){
        this.getCommandStack()
            .execute(
                new draw2d.command.CommandDelete(this.getPrimarySelection())
            );
    }

    zoomIn(){
        this.setZoom(this.getZoom() * 0.7, true);
    }

    zoomReset(){
        this.setZoom(1.0, true);
    }

    zoomOut(){
        this.setZoom(this.getZoom() * 1.3, true)
    }
}