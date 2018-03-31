class ColorContextMenu {
    constructor(container){
        this.container = container;
        this.colors = FormColor.GetColours();
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
        let items = { };

        this.colors.forEach(c => items[c.name] = new ColorMenuItem(c.name, this.container));

        items["sep1"] = "---------";
        items["delete"] = new DeleteMenuItem("Delete", this.container);

        return items;
    }

}