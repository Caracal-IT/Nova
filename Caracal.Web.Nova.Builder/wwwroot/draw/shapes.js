class Canvas {
    constructor(container){
        this.container = container;
        this.createPolicies();
    }

    title(text, x, y) {
        return this.add(new Header(text), x,  y);
    }

    label(text, x, y) {
        return this.add(new Label(text), x,  y);
    }

    note(text, x, y) {
        return this.add(new Note(text), x,  y);
    }
    
    panel(text, x, y, w, h){
        return this.add(new Panel(text, w,  h), x,  y); 
    }

    start(x, y) {
        return this.add(new Start(), x, y);
    }
    
    end(x, y) {
        return this.add(new End(), x, y);
    }
    
    form(text, x, y) {
        const figure = new CollapsibleShape({ x: x, y: y, header: text });
        this.container.add(figure);

        return figure;
    }

    email(text, x, y){
        return this.add(new EMail(text), x, y);
    }

    webService(text, x, y){
        return this.add(new WebService(text), x, y);
    }

    resume(text, x, y){
        return this.add(new Resume(text), x, y);
    }

    add(shape, x, y){
        this.container.add(shape, x, y);

        return shape;
    }
    
    createPolicies(){
        this.container.installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy());

        this.container.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: Canvas.createConnection
        }));
    }

    static createConnection() {
        const ctx = new MyConnection();
        ctx.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
        return ctx;
    }
}

class Header extends draw2d.shape.basic.Label{
    constructor(text) {
        super({
            text:text, 
            padding:{right:23}, 
            fontSize:60, 
            fontColor:"#00CED1", 
            resizeable:true, 
            stroke:0
        });
    }
}

class Label extends draw2d.shape.basic.Label {
    constructor(text){
        super({
            text:text, 
            padding:{right:23}, 
            fontSize:15, 
            fontColor: "#191970", 
            resizeable:true, 
            stroke:0}
        );
    }
}

class Panel extends draw2d.shape.composite.Raft {
    constructor(text, w, h){
        super();
        
        const label = new draw2d.shape.basic.Label({
            text:text,
            radius: 5,
            padding: {top:4, right:2, bottom:4,left:3}
        });
        
        super.setDimension(w, h);
        super.add(label, new draw2d.layout.locator.PortLocator());
    }
}

class Start extends draw2d.shape.node.Start {
    constructor(){
        super();
        
        super.setBackgroundColor("#AFEEEE");
        super.radius = 40;
        super.setResizeable(false);
        
        const label = new draw2d.shape.basic.Label({
            text:"Start",
            color:"#AFEEEE",
            fontColor:"#008080"
        });
        
        super.add(label, new draw2d.layout.locator.CenterLocator);
    }
}

class End extends draw2d.shape.node.End {
    constructor(){
        super();

        super.setBackgroundColor("#F08080");
        super.radius = 40;
        super.setResizeable(false);

        const label = new draw2d.shape.basic.Label({
            text:"End",
            color:"#F08080",
            fontColor:"#FFFFFF"
        });

        super.add(label, new draw2d.layout.locator.CenterLocator);
    }
}

class EMail extends draw2d.shape.node.Between {
    constructor(text){
        super({ width: 70, height: 70 });

        super.setBackgroundColor("#FFD700");
        const image = new draw2d.shape.icon.Mail({ width: 50, height: 30 });
        super.add(image, new draw2d.layout.locator.XYRelPortLocator(15,45));
        super.resizeable = false;
        super.add(new draw2d.shape.basic.Label({text:text}), new draw2d.layout.locator.SmartDraggableLocator());
        super.add(new draw2d.shape.basic.Label({text:"E-Mail", radius: 5, padding: {top:4, right:2, bottom:4,left:3}}), new draw2d.layout.locator.PortLocator());
        super.radius = 5;
    }
}

class Resume extends draw2d.shape.node.Between {
    constructor(text){
        super({ width: 70, height: 70 });

        super.setBackgroundColor("#FF1493");
        const image = new draw2d.shape.icon.Cube({ width: 30, height: 30 });
        super.add(image, new draw2d.layout.locator.XYRelPortLocator(30,45));
        super.resizeable = false;
        super.add(new draw2d.shape.basic.Label({text:text}), new draw2d.layout.locator.SmartDraggableLocator());
        super.add(new draw2d.shape.basic.Label({text:"Resume", radius: 5, padding: {top:4, right:2, bottom:4,left:3}}), new draw2d.layout.locator.PortLocator());
        super.radius = 5;
    }
}

class WebService extends draw2d.shape.node.Between {
    constructor(text){
        super({ width: 70, height: 70 });

        super.setBackgroundColor("#BA55D3");
        const image = new draw2d.shape.icon.Run({ width: 30, height: 30 });
        super.add(image, new draw2d.layout.locator.XYRelPortLocator(30,45));
        super.resizeable = false;
        super.add(new draw2d.shape.basic.Label({text:text}), new draw2d.layout.locator.SmartDraggableLocator());
        super.add(new draw2d.shape.basic.Label({text:"Webservice", radius: 5, padding: {top:4, right:2, bottom:4,left:3}}), new draw2d.layout.locator.PortLocator());
        super.radius = 5;
    }
}

class Note extends draw2d.shape.note.PostIt  {
    constructor(text) {
        super({ text: text });
    }
}