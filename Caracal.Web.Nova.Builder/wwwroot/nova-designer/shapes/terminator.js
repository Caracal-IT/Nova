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
    
    get name(){
        return this.label.text;
    }
    
    set name(value) {
        this.label.text = value;
    }
    
    get definition() {
        return {
          name: this.name.toLowerCase(),
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