class MenuItem {
    constructor(text){
        this.name = text;
    }

    execute() {
        console.log(this.name);
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