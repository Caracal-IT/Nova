
var CollapsibleShape = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "CollapsibleShape",
    init : function(attr)
    {
        this.inputLocator  = new CollapsibleInputLocator();
        this.outputLocator = new CollapsibleOutputLocator();

        this._super($.extend({bgColor:"#93d7f3", color:"#39b2e5", stroke:1, radius:2, gap:5},attr));

        this.header = new draw2d.shape.layout.HorizontalLayout({
            stroke: 0,
            radius: 0,
            bgColor: "#1daeef"
        });

        this.headerLabel = null;
        this.header.add(headerLabel =new draw2d.shape.basic.Label({
            text: attr.header,
            fontColor:"#ffffff",
            stroke:0,
            fontSize:16,
            fontFamily:"Verdana",
            padding:{left:5, right:10}
        }));

        this.header.createPort("input",  this.inputLocator);

        var img1 = new draw2d.shape.icon.Contract({ minWidth:20, minHeight:20, width:20, height:20});
        var img2 = new draw2d.shape.icon.Expand({  minWidth:20, minHeight:20, width:20, height:20, visible:false });

        var toggle=function(){
            this.row1.portRelayoutRequired=true;
            this.row2.portRelayoutRequired=true;

            this.row1.setVisible(!this.row1.isVisible());
            this.row2.setVisible(!this.row2.isVisible());

            this.row1.portRelayoutRequired=true;
            this.row1.layoutPorts();

            this.row2.portRelayoutRequired=true;
            this.row2.layoutPorts();
            img1.setVisible(!img1.isVisible());
            img2.setVisible(!img2.isVisible());
        }.bind(this);

        img1.on("click",toggle);
        img2.on("click",toggle);
        headerLabel.on("click",toggle);
        img1.addCssClass("pointer");
        img2.addCssClass("pointer");
        this.header.add(img1, new draw2d.layout.locator.InputPortLocator());
        this.header.add(img2, new draw2d.layout.locator.RightLocator());
        
        this.row1 = new draw2d.shape.layout.HorizontalLayout({
            stroke: 0,
            radius: 0,
           // bgColor: "#93d7f3"
        });

        var up = null;
        var down = null;
        var rect = new draw2d.shape.basic.Rectangle(200, 10);
        var label1 = null;
        this.row1.add(label1 = new draw2d.shape.basic.Label({text:"📋 Textbox [Name]", padding:{right:23}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
        this.row1.add(up = new draw2d.shape.basic.Label({text:"⬆", fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
        this.row1.add(down = new draw2d.shape.basic.Label({text:"⬇", fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));

        var up2 = null;
        var down2 = null;
        //this.row2 = new draw2d.shape.basic.Label({text:"🎛️ Button [Continue]  ⬆⬇", fontSize:20, fontColor:"#303030", resizeable:true, stroke:0});
        this.row2 = new draw2d.shape.layout.HorizontalLayout({
            stroke: 0,
            radius: 0,
           // bgColor: "#93d7f3"
        });

        var label2 = null;
        this.row2.add(label2 = new draw2d.shape.basic.Label({text:"🎛️ Button [Continue]", padding:{right:10}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
        this.row2.add(up2 = new draw2d.shape.basic.Label({text:"⬆", fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
        this.row2.add(down2 = new draw2d.shape.basic.Label({text:"⬇", fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));

        this.row1.setDimension(20,1,1);
        this.row2.setDimension(20,1,1);
        
        up.on('click', (event) => {
            this.remove(this.row1);
        this.row1.remove(up);
        this.row1.remove(down);
        
            this.add(this.row1, this.row1.locator, 1);
        this.row1.add(up);
        this.row1.add(down);
            this.repaint();
        });

        down.on('click', (event) => {
           this.remove(this.row1);
        this.row1.remove(up);
        this.row1.remove(down);
           this.add(this.row1, this.row1.locator, 2);
        this.row1.add(up);
        this.row1.add(down);
           // this.relocate(1, 2);
        });

        up2.on('click', (event) => {
              this.remove(this.row2);
        this.row2.remove(up2);
        this.row2.remove(down2);
             this.add(this.row2, this.row2.locator, 1);
        this.row2.add(up2);
        this.row2.add(down2);
        });

        down2.on('click', (event) => {
            this.remove(this.row2);
        this.row2.remove(up2);
        this.row2.remove(down2);
            this.add(this.row2, this.row2.locator, 2);
        this.row2.add(up2);
        this.row2.add(down2);
        });

        
        label1.on('click',  () => {
            
            // this.add(new draw2d.shape.basic.Label({text:"🎛️ Button [Continue]", padding:{right:10}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
        });


      //  }
        var me = this;
        label1.onContextMenu = function(x,y) {
            

            //    var menu = function(x,y){
            $.contextMenu({
                selector: 'body',
                events:
                    {
                        hide:function(){ $.contextMenu( 'destroy' ); }
                    },
                callback: $.proxy(function(key, options)
                {
                    switch(key){
                        case "textbox":
                            me.add(label1 = new draw2d.shape.basic.Label({text:"📋 Textbox [Name]", padding:{right:23}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
                            //this.setColor('#f3546a');
                            break;
                        case "button":
                            me.add(new draw2d.shape.basic.Label({text:"🎛️ Button [Continue]", padding:{right:10}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));

                            // this.setColor('#b9dd69');
                            break;
                        case "red":
                            me.header.setBackgroundColor('#f3546a');
                            me.setBackgroundColor('#FFC0CB');
                            me.setColor('#f3546a');
                            // this.setColor('#00A8F0');
                            break;
                        case "green":
                            me.header.setBackgroundColor('#2E8B57');
                            me.setBackgroundColor('#98FB98');
                            me.setColor('#2E8B57');
                            break;
                        case "blue":
                            me.header.setBackgroundColor('#00A8F0');
                            me.setBackgroundColor('#93d7f3');
                            me.setColor('#00A8F0');
                            // this.setColor('#00A8F0');
                            break;
                        case "purple":
                            me.header.setBackgroundColor('#800080');
                            me.setBackgroundColor('#D8BFD8');
                            me.setColor('#800080');
                            break;
                        case "delete":
                            console.log(this);
                        // without undo/redo support
                        //     this.getCanvas().remove(this);

                        // with undo/redo support
                         var cmd = new draw2d.command.CommandDelete(this.parent);
                         this.getCanvas().getCommandStack().execute(cmd);
                        default:
                            break;
                    }

                },this),
                // x:x,
                // y:y,
                items:
                    {
                        "textbox":    {name: "Textbox"},
                        "button":  {name: "Button"},
                        "sep0":   "---------",
                        "red":    {name: "Red"},
                        "green":  {name: "Green"},
                        "blue":  {name: "Blue"},
                        "purple":  {name: "Purple"},
                        "sep1":   "---------",
                        "delete": {name: "Delete"}
                    }
            });}



        label2.onContextMenu = function(x,y) {


            //    var menu = function(x,y){
            $.contextMenu({
                selector: 'body',
                events:
                    {
                        hide:function(){ $.contextMenu( 'destroy' ); }
                    },
                callback: $.proxy(function(key, options)
                {
                    switch(key){
                        case "textbox":
                            me.add(label1 = new draw2d.shape.basic.Label({text:"📋 Textbox [Name]", padding:{right:23}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
                            //this.setColor('#f3546a');
                            break;
                        case "button":
                            me.add(new draw2d.shape.basic.Label({text:"🎛️ Button [Continue]", padding:{right:10}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));

                            // this.setColor('#b9dd69');
                            break;
                        case "red":
                            me.header.setBackgroundColor('#f3546a');
                            me.setBackgroundColor('#FFC0CB');
                            me.setColor('#f3546a');
                            // this.setColor('#00A8F0');
                            break;
                        case "green":
                            me.header.setBackgroundColor('#2E8B57');
                            me.setBackgroundColor('#98FB98');
                            me.setColor('#2E8B57');
                            break;
                        case "blue":
                            me.header.setBackgroundColor('#00A8F0');
                            me.setBackgroundColor('#93d7f3');
                            me.setColor('#00A8F0');
                            // this.setColor('#00A8F0');
                            break;
                        case "purple":
                            me.header.setBackgroundColor('#800080');
                            me.setBackgroundColor('#D8BFD8');
                            me.setColor('#800080');
                            break;
                        case "delete":
                            console.log(this);
                            // without undo/redo support
                            //     this.getCanvas().remove(this);

                            // with undo/redo support
                            var cmd = new draw2d.command.CommandDelete(this.parent);
                            this.getCanvas().getCommandStack().execute(cmd);
                        default:
                            break;
                    }

                },this),
                // x:x,
                // y:y,
                items:
                    {
                        "textbox":    {name: "Textbox"},
                        "button":  {name: "Button"},
                        "sep0":   "---------",
                        "red":    {name: "Red"},
                        "green":  {name: "Green"},
                        "blue":  {name: "Blue"},
                        "purple":  {name: "Purple"},
                        "sep1":   "---------",
                        "delete": {name: "Delete"}
                    }
            });}
        
       // this.row1.createPort("input",  this.inputLocator);
       // this.row1.createPort("output", this.outputLocator);

       // this.row2.createPort("input",  this.inputLocator);
        this.row2.createPort("output", this.outputLocator);

        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.row1.isDraggable();
        this.row2.isDraggable();
        
        this.radius = 5;
        this.header.radius = 5;
        
        this.add(this.header);
        this.add(this.row1);
        this.add(this.row2);

        //this.row1.onClick = function() {alert('ggg');};
    },
    onContextMenu:function(x,y) {
        var me = this;

        //    var menu = function(x,y){
        $.contextMenu({
            selector: 'body',
            events:
                {
                    hide:function(){ $.contextMenu( 'destroy' ); }
                },
            callback: $.proxy(function(key, options)
            {
                switch(key){
                    case "textbox":
                        me.add(label1 = new draw2d.shape.basic.Label({text:"📋 Textbox [Name]", padding:{right:23}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));
                        //this.setColor('#f3546a');
                        break;
                    case "button":
                        me.add(new draw2d.shape.basic.Label({text:"🎛️ Button [Continue]", padding:{right:10}, fontSize:20, fontColor:"#303030", resizeable:true, stroke:0}));

                        // this.setColor('#b9dd69');
                        break;
                    case "red":
                        me.header.setBackgroundColor('#f3546a');
                        me.setBackgroundColor('#FFC0CB');
                        // this.setColor('#00A8F0');
                        break;
                    case "green":
                        me.header.setBackgroundColor('#2E8B57');
                        me.setBackgroundColor('#98FB98');
                        break;
                    case "blue":
                        me.header.setBackgroundColor('#00A8F0');
                        me.setBackgroundColor('#93d7f3');
                        // this.setColor('#00A8F0');
                        break;
                    case "purple":
                        me.header.setBackgroundColor('#800080');
                        me.setBackgroundColor('#D8BFD8');
                        break;
                    case "delete":
                        console.log(this);
                    // without undo/redo support
                    //     this.getCanvas().remove(this);

                    // with undo/redo support
                    // var cmd = new draw2d.command.CommandDelete(this);
                    // this.getCanvas().getCommandStack().execute(cmd);
                    default:
                        break;
                }

            },this),
            // x:x,
            // y:y,
            items:
                {
                    "textbox":    {name: "Textbox"},
                    "button":  {name: "Button"},
                    "sep0":   "---------",
                    "red":    {name: "Red"},
                    "green":  {name: "Green"},
                    "blue":  {name: "Blue"},
                    "purple":  {name: "Purple"},
                    "sep1":   "---------",
                    "delete": {name: "Delete"}
                }
        });
    }
});