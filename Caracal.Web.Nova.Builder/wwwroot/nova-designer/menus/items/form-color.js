colors = [
    {
        name: "Aqua",
        primary: "#008080",
        secondary: "#AFEEEE",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#00CED1",
        
        panel: { 
            primary: "#20B2AA",  
            secondary: "#F0FFFF",
            font: "#F5F5F5"
        }
    },
    {
        name: "Fuchsia",
        primary: "#8B008B",
        secondary: "#D8BFD8",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#DA70D6",
        
        panel: {
            primary: "#BA55D3",
            secondary: "#F8F8FF",
            font: "#FFFFFF"
        }
    },
    {
        name: "Silver",
        primary: "#708090",
        secondary: "#DCDCDC",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#C0C0C0",

        panel: {
            primary: "#A9A9A9",
            secondary: "#F5F5F5",
            font: "#F5F5F5"
        }
    },
    {
        name: "Blue",
        primary: "#0074D9",
        secondary: "#ADD8E6",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#00BFFF",

        panel: {
            primary: "#4169E1",
            secondary: "#F0F8FF",
            font: "#F5F5F5"
        }
    },
    {
        name: "Pistachio",
        primary: "#6B8E23",
        secondary: "#E9FFDB",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#8FBC8F",

        panel: {
            primary: "#93C572",
            secondary: "#F5FFFA",
            font: "#F5F5F5"
        }
    },
    {
        name: "Orange",
        primary: "#FF4136",
        secondary: "#FFA07A",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#F08080",

        panel: {
            primary: "#FF4500",
            secondary: "#FFFAFA",
            font: "#F5F5F5"
        }
    },
    {
        name: "Pink",
        primary: "#DB7093",
        secondary: "#FFB6C1",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#F56FA1",

        panel: {
            primary: "#C71585",
            secondary: "#FFF0F5",
            font: "#F5F5F5"
        }
    },
    {
        name: "Gold",
        primary: "#DAA520",
        secondary: "#FFFACD",
        form: "#DCDCDC",
        font: "#FFFFFF",
        line: "#FFD700",

        panel: {
            primary: "#BDB76B",
            secondary: "#FFFFF0",
            font: "#F5F5F5"
        }
    }
];

class FormColor {
    static GetColours() {
        return colors;
    }
    
    static GetColour(name){
        const c = FormColor.GetColours().find(c => c.name === name);

        return c ? c : colors[0];
    }
}