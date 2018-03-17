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