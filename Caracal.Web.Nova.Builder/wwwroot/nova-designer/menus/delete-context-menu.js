class DeleteContextMenu {
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
        return {
            "delete":  new DeleteMenuItem("Delete", this.container),
            "sep0":   "---------"
        };
    }

}