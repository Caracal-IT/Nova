export class Canvas {
    constructor(private container: any) { }

    form(text: string, x: number, y: number) {
        const figure = new CollapsibleShape({ x: x, y: y, header: text });
        this.container.add(figure);

        return figure;
    }
}