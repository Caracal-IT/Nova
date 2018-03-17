


    










class Note extends draw2d.shape.note.PostIt  {
    constructor(text, viewCanvas) {
        super({ 
            text: text, 
            userData: {
                type: "paper-note"
            } 
        });

        let editor = new draw2d.ui.LabelEditor({
            onCommit: () => {
            }
        });

        this.viewCanvas = viewCanvas;
        super.installEditor(editor);

        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
    }

    remove() {
        const cmd = new draw2d.command.CommandDelete(this);
        this.getCanvas().getCommandStack().execute(cmd);
    }
}

class Panel extends draw2d.shape.composite.Raft {
    constructor(text, w, h, viewCanvas){
        super({
            radius: 5,
            userData: {
                type: "paper-panel"
            }
        });

        this.viewCanvas = viewCanvas;
        
        const label = new draw2d.shape.basic.Label({
            text:text,
            radius: 5,
            padding: {top:4, right:2, bottom:4,left:3}
        });

        const contextMenu = new DeleteContextMenu(this);
        label.onContextMenu = () => contextMenu.show();
        
        super.setDimension(w, h);
        super.add(label, new draw2d.layout.locator.PortLocator());
        label.installEditor(new draw2d.ui.LabelInplaceEditor());

        super.toBack();
    }

    remove() {
        const cmd = new draw2d.command.CommandDelete(this);
        this.viewCanvas.getCommandStack().execute(cmd);
    }
}

class Terminator extends draw2d.shape.basic.Circle {
    constructor(text, color, port, viewCanvas, fontColor = "#FFFFFF"){
        super({
            bgColor: color,
            resizeable: false,
            userData: {
                type: text
            }
        });

        this.viewCanvas = viewCanvas;
        
        const label = new draw2d.shape.basic.Label({
            text:text,
            color:color,
            fontColor:fontColor
        });

        super.add(label, new draw2d.layout.locator.CenterLocator);
        this.createPort(port);

        const contextMenu = new DeleteContextMenu(this);
        super.onContextMenu = () => contextMenu.show();
        label.onContextMenu = () => contextMenu.show();
    }

    remove() {
        const cmd = new draw2d.command.CommandDelete(this);
        this.viewCanvas.getCommandStack().execute(cmd);
    }
}










class Form extends draw2d.shape.layout.VerticalLayout {
    constructor(text, viewCanvas) {
        super({
            bgColor:"#93d7f3", 
            color:"#39b2e5", 
            stroke:1, 
            radius:2, 
            gap:2,
            userData: {
                type: "form",
                controls: []
            }
        });

        //this.viewCanvas = viewCanvas;
        
        this.controls = [];
        this.createHeader(text);
        
        this.outputLocator = new CollapsibleOutputLocator();
    }
    
    createHeader(text){
        const contextMenu = new FormContextMenu(this);
        this.header = new FormHeader(text, this, contextMenu);

       // const cmd = new draw2d.command.CommandAdd(this, this.header, 0, 0);
       // this.viewCanvas.getCommandStack().execute(cmd);
        
        super.add(this.header);
    }

    changeColor(formColor) {
        super.setColor(formColor.primary);
        super.setBackgroundColor(formColor.secondary);
        this.header.changeColor(formColor);
    }

    createInputControl(){
        const item = new FormControl("Name", this, this.controls.length);
        this.controls.push(item);
        
        super.add(item);
    }

    createOutputControl(){
        const item = new FormControl("Continue", this, this.controls.length, this.outputLocator);
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
        
        //const cmd = new draw2d.command.CommandDelete(this);
        //this.viewCanvas.getCommandStack().execute(cmd);
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
        
        this.userData = {
          type: "input"  
        };
        
        if (outputLocator) {
            this.userData = {
                type: "output"
            };
            
            super.createPort("output", outputLocator);
        }
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