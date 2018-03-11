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
        return this.add(new Terminator("Start", "#AFEEEE", "output", "#008080"), x, y);
    }
    
    end(x, y) {
        return this.add(new Terminator("End", "#F08080", "input"), x, y);
    }
    
    form(text, x, y) {
        //const figure = new CollapsibleShape({ x: x, y: y, header: text });
        //this.container.add(figure);

        let f = new Form(text);
        this.container.add(f,  x, y);
        
        return f;
    }

    email(text, x, y){
        return this.add(new Activity(text, "E-Mail", "#FFD700", draw2d.shape.icon.Mail), x, y);
    }

    webService(text, x, y){
        return this.add(new Activity(text, "Webservice", "#BA55D3", draw2d.shape.icon.GlobeAlt), x, y);
    }

    resume(text, x, y){
        return this.add(new Activity(text, "Resume", "#FF1493", draw2d.shape.icon.Cube), x, y);
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

        super.installEditor(new draw2d.ui.LabelEditor());
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

class Note extends draw2d.shape.note.PostIt  {
    constructor(text) {
        super({ text: text });

        let editor = new draw2d.ui.LabelEditor({
            onCommit: () => {
            }
        });
        
        super.installEditor(editor);
    }
}

class Panel extends draw2d.shape.composite.Raft {
    constructor(text, w, h){
        super({
            radius: 5
        });
        
        const label = new draw2d.shape.basic.Label({
            text:text,
            radius: 5,
            padding: {top:4, right:2, bottom:4,left:3}
        });
        
        super.setDimension(w, h);
        super.add(label, new draw2d.layout.locator.PortLocator());
        label.installEditor(new draw2d.ui.LabelInplaceEditor());
    }
}

class Terminator extends draw2d.shape.basic.Circle {
    constructor(text, color, port, fontColor = "#FFFFFF"){
        super({
            bgColor: color,
            resizeable: false
        });
        
        const label = new draw2d.shape.basic.Label({
            text:text,
            color:color,
            fontColor:fontColor
        });

        super.add(label, new draw2d.layout.locator.CenterLocator);
        this.createPort(port);
    }
}

class Activity extends draw2d.shape.node.Between  {
    constructor(text, label, color, image) {
        super({
            bgColor: color, 
            width: 70, 
            height: 70,
            resizeable: false,
            radius: 5
        });
        
        let img = new image({ width: 40, height: 40 });
        super.add(img, new draw2d.layout.locator.XYRelPortLocator(22,37));
        
        let title = new draw2d.shape.basic.Label({radius: 5, text:text});
        super.add(title, new draw2d.layout.locator.SmartDraggableLocator());
        title.installEditor(new draw2d.ui.LabelInplaceEditor());
        
        super.add(new draw2d.shape.basic.Label({text:label, radius: 5, padding: {top:4, right:2, bottom:4,left:3}}), new draw2d.layout.locator.PortLocator());

    }
}

class Form extends draw2d.shape.layout.VerticalLayout {
    constructor(text) {
        super({
            bgColor:"#93d7f3", 
            color:"#39b2e5", 
            stroke:1, 
            radius:2, 
            gap:2
        });
        
        this.controls = [];
        this.createHeader(text);
        
        this.outputLocator = new CollapsibleOutputLocator();
    }
    
    createHeader(text){
        const contextMenu = new FormContextMenu(this);
        this.header = new FormHeader(text, this, contextMenu);
        super.add(this.header);
    }

    changeColor(formColor) {
        super.setColor(formColor.primary);
        super.setBackgroundColor(formColor.secondary);
        this.header.changeColor(formColor);
    }

    createInputControl(){
        const item = new FormControl("⌨️ Name", this, this.controls.length);
        this.controls.push(item);
        
        super.add(item);
    }

    createOutputControl(){
        const item = new FormControl("🆗 Continue", this, this.controls.length, this.outputLocator);
        this.controls.push(item);
        
        super.add(item);
    }
    
    toggle(){
        this.controls.forEach(ctrl => ctrl.setVisible(!ctrl.isVisible()));
    }

    remove(index = -1) {
        if (index >= 0) {
            super.remove(this.controls[index]);
            this.controls.splice(index, 1);
            
            for (let i = index; i < this.controls.length; i++)
                this.controls[i].index = i;
            
            this.refresh();
            
            return;    
        } 
        
        const cmd = new draw2d.command.CommandDelete(this);
        this.getCanvas().getCommandStack().execute(cmd);
    }
    
    moveUp(index) {
        if (index === 0 || this.controls.length  === 1)
            return;

        this.controls[index].index--;
        this.controls[index - 1].index++;
        
        this.refresh();
    }

    moveDown(index) {
        if (index === this.controls.length - 1 || this.controls.length  === 1)
            return;

        this.controls[index].index++;
        this.controls[index + 1].index--;
        
        this.refresh();
    }
    
    refresh() {
        this.controls.forEach(ctrl => super.remove(ctrl));
        this.controls.sort((a, b) => a.index >  b.index);
        this.controls.forEach(ctrl => super.add(ctrl));
    }
}


class FormControl extends draw2d.shape.layout.HorizontalLayout {
    constructor(text, container, index, outputLocator = null) {
        super({stroke: 0});
        
        this.container = container;
        this.index = index;
        
        this.addLabel(text);
        this.addUp();
        this.addDown();
        
        if (outputLocator)
            super.createPort("output", outputLocator);
    }
    
    addLabel(text){
        let label = this.createLabel(text, {left: 5, right: (107 - 6 * text.length)}, true);
        super.add(label);

        const contextMenu = new FormContextMenu(this);
        label.onContextMenu = () => contextMenu.show();
        
        let editor = new draw2d.ui.LabelInplaceEditor({
            onCommit: () => {
                label.padding.right = (107 - 6 * label.text.length)
                this.container.refresh();
            }
        });
        label.installEditor(editor);
    }
    
    addUp(){
        let up = this.createLabel("⬆");
        super.add(up, new draw2d.layout.locator.RightLocator());
        up.on('click', () => this.moveUp());
    }
    
    addDown(){
        let down = this.createLabel("⬇");
        super.add(down, new draw2d.layout.locator.RightLocator());
        down.on('click', () => this.moveDown());
    }
    
    moveUp() {
        this.container.moveUp(this.index);
    }

    moveDown() {
        this.container.moveDown(this.index);
    }
    
    createLabel(text, padding = {}, resizeable = false) {
        return new draw2d.shape.basic.Label({
            text: text,
            padding: padding,
            fontSize: 10,
            fontColor: "#303030",
            fontFamily: "Lucida Console",
            stroke: 0,
            resizeable: resizeable
        });
    }

    changeColor(formColor) {
        this.container.changeColor(formColor);
    }

    createInputControl(){
        this.container.createInputControl();
    }

    createOutputControl(){
        this.container.createOutputControl();
    }

    remove() {
        this.container.remove(this.index);
    }
}


class FormHeader extends draw2d.shape.layout.HorizontalLayout {
    constructor(text, container, contextMenu){
        super({
            stroke: 0,
            radius: 0,
            bgColor: "#1daeef"
        });
        
        this.container = container;
        this.contextMenu = contextMenu;
        this.images = [];

        this.addTitle(text);
        this.images.push(this.addImage(draw2d.shape.icon.Contract));
        this.images.push(this.addImage(draw2d.shape.icon.Expand, false));
    }
    
    addTitle(text){
        super.createPort("input");
        this.titleLabel = new draw2d.shape.basic.Label({
            text: text,
            fontColor:"#ffffff",
            stroke:0,
            fontSize:10,
            fontFamily:"Verdana",
            padding:{left:5, right:50 - text.length}
        });

        this.titleLabel.installEditor(new draw2d.ui.LabelInplaceEditor());
        this.titleLabel.onContextMenu = () => this.contextMenu.show();
        
        super.add(this.titleLabel);
    }
    
    addImage(image, visible = true){
        let img = new image({ minWidth:20, minHeight:20, width:20, height:20, visible: visible});
        img.on("click", () => this.toggle());
        super.add(img);
        
        return img;
    }

    toggle(){
        this.images.forEach(img => img.setVisible(!img.isVisible()));
        this.container.toggle();
    }

    changeColor(formColor) {
        super.setBackgroundColor(formColor.primary);
    }
}

class FormContextMenu {
    constructor(container){ 
        this.container = container;
    }

    show(){
        $.contextMenu({
            selector: 'body',
            events: {hide:function(){ $.contextMenu( 'destroy' ); } },
            callback: this.onMenuSelected,
            items: this.menuItems()
        }); 
    }

    onMenuSelected(key, options) {
        if (options.items[key] && options.items[key].execute)
            options.items[key].execute()
    }
    
    menuItems() {
        let items = {
            "input":  new InputControlMenuItem("Input", this.container),
            "output":  new OutputControlMenuItem("Output", this.container),
            "sep0":   "---------"
        };
        
        FormColor.GetColours().forEach(c => items[c.name] = new ColorMenuItem(c.name, this.container));
        
        items["sep1"] = "---------";
        items["delete"] = new DeleteMenuItem("Delete", this.container);
       
        return items;
    }
    
}

class MenuItem {
    constructor(text){
        this.name = text;
    }
    
    execute() {
        console.log(this.name);
    }
}

class InputControlMenuItem extends MenuItem {
    constructor(text, container){
        super(text);

        this.container = container;
    }

    execute() {
        this.container.createInputControl(this.name);
    }
}

class OutputControlMenuItem extends MenuItem {
    constructor(text, container){
        super(text);

        this.container = container;
    }

    execute() {
        this.container.createOutputControl(this.name);
    }
}

class ColorMenuItem extends MenuItem {
    constructor(text, container){
        super(text);
        
        this.container = container;
    }
    
    execute() {
       this.container.changeColor(FormColor.GetColour(this.name));
    }
}

class DeleteMenuItem {
    constructor(text, container){
        this.name = text;
        this.container = container;
    }

    execute() {
        this.container.remove();
    }
}

class FormColor {
    constructor(name, primary = "transparent", secondary = "transparent", font = "#FFFFFF"){
        this.name = name;
        this.primary = primary;
        this.secondary = secondary;
        this.font = font;
    }
    
    static GetColours() {
        return [
            new FormColor("Red", "#F3546A", "#FFC0CB"),
            new FormColor("Green", "2E8B57", "98FB98"),
            new FormColor("Blue", "#00A8F0", "#93d7f3"),
            new FormColor("Purple", "#800080", "#D8BFD8")
        ];
    }

    static GetColour(name){
        const c = FormColor.GetColours().find(c => c.name === name);
        
        return c ? c : new FormColor("Blank");
    }
}