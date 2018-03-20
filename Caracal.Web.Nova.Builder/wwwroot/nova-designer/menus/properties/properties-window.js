class PropertyWindow {
    constructor(container, workflowServer) {
        this.container = document.querySelector(container);
        this.workflowServer = workflowServer;
    }

    show(shape) {
        if (this.shape && this.shape.unSelectItem)
            this.shape.unSelectItem();

        if (shape && shape.selectItem)
            shape.selectItem();

        this.shape = shape;
        this.renderPanes();

        this.container.innerHTML = "";

        if (shape && shape.getPropertyBags)
            this.renderPanes(shape.getPropertyBags());
    }

    renderPanes(propertyBags){
        if (propertyBags)
            propertyBags.forEach(p => PropertyPane.renderPane(p, this.container, this.workflowServer));
    }
}