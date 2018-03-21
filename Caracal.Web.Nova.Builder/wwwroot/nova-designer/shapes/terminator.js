class Terminator extends draw2d.shape.basic.Circle {
    constructor(text, color, port, fontColor = "#FFFFFF"){
        super({
            bgColor: color,
            resizeable: false
        });

        this.properties = [];
            
        this.label = new draw2d.shape.basic.Label({
            text:text,
            color:color,
            fontColor:fontColor
        });

        super.add(this.label, new draw2d.layout.locator.CenterLocator);
        this.createPort(port);

        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
        this.label.onContextMenu = () => contextMenu.show();
    }

    getPropertyBags() {
        const bags = [];
        bags.push(new DefaultPropertyBag(this));

        return bags;
    }
    
    get definition() {
        return {
          name: this.label.text,
          type: this.label.text,
          x: this.x,
          y: this.y, 
          outputPorts: this.getPortIds(this.outputPorts), 
          inputPorts: this.getPortIds(this.inputPorts),
          properties: this.properties
        };
    }
    
    getPortIds(ports){
        const portsIds = [];
        ports.data.forEach(p => portsIds.push(p.id));
        
        return portsIds;
    }
}