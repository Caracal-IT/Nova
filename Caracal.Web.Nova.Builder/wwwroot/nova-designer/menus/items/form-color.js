class FormColor {
    constructor(name, primary = "transparent", secondary = "transparent", font = "#FFFFFF"){
        this.name = name;
        this.primary = primary;
        this.secondary = secondary;
        this.font = font;
    }

    static GetColours() {
        const colors = [];

        FormColor.FormColors().forEach(c => colors.push(c));
        FormColor.PanelColors().forEach(c => colors.push(c));
        
        return colors;
    }
    
    static FormColors() {
        return [
            new FormColor("Red", "#DC143C", "#F08080"),
            new FormColor("Gold", "#FFD700", "#FFFACD"),
            new FormColor("Pink", "#FF1493", "#FFC0CB"),
            new FormColor("Green", "#2E8B57", "#98FB98"),
            new FormColor("Blue", "#00A8F0", "#93d7f3"),
            new FormColor("Purple", "#800080", "#D8BFD8"),
            new FormColor("Teal", "#008080", "#20B2AA")
        ];
    }

    static PanelColors() {
        return [
            new FormColor("WhiteSmoke", "#DCDCDC", "#F5F5F5", "#000000"),
            new FormColor("Silver", "#C0C0C0", "#DCDCDC"),
            new FormColor("Azure", "#00CED1", "#F0FFFF"),
            new FormColor("AliceBlue", "#1E90FF", "#F0F8FF"),
            new FormColor("MistyRose", "#DA70D6", "#FFF0F5"),
            new FormColor("Khaki", "#BDB76B", "#FFFFF0")
        ];
    }

    static GetColour(name){
        const c = FormColor.GetColours().find(c => c.name === name);

        return c ? c : new FormColor("Blank");
    }
}