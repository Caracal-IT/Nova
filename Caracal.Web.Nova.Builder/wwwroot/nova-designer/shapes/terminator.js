class Terminator extends draw2d.shape.basic.Circle {
    constructor(text, port){
        super({
            resizeable: false
        });

        this.properties = [];
        this.name = text.toLowerCase();
            
        this.label = new draw2d.shape.basic.Label({
            text:text,
            bold: true
        });

        super.add(this.label, new draw2d.layout.locator.CenterLocator);
                
        this.createPort(port, new draw2d.layout.locator.TopLocator);
        this.createPort(port, new draw2d.layout.locator.RightLocator);
        this.createPort(port, new draw2d.layout.locator.BottomLocator);
        this.createPort(port, new draw2d.layout.locator.LeftLocator);
                
        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
        this.label.onContextMenu = () => contextMenu.show();
    }

    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));

        return bags;
    }
    
    get name(){
        return this._name;
    }
    
    set name(value) {
        this._name = value;
    }

    changeColor(formColor) {
        this.formColor = formColor;

        this.setBackgroundColor(formColor.secondary);
        this.label.setColor(formColor.secondary);
        this.label.setFontColor(formColor.primary);
        this.setColor(formColor.primary);
    }
    
    get definition() {
        return {
          id: this.id,
          name: this.name, 
          factory: "shapeFactory",
          type: "CodeActivity",
          x: this.x,
          y: this.y,
          outputPorts: this.getPortIds(this.outputPorts), 
          inputPorts: this.getPortIds(this.inputPorts),
          properties: [
                { name: "code", value: "function execute(params, wf, notify) { }" }
          ]
        };
    }
    
    getPortIds(ports){
        const portsIds = [];
        ports.data.forEach(p => portsIds.push(p.id));
        
        return portsIds;
    }
}