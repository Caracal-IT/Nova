class XYLocator extends draw2d.layout.locator.Locator{
    constructor(left, top){
        super();
        
        this.left = left;
        this.top = top;
    }

    relocate(index, target) {
        const parent = target.getParent();
        const boundingBox = parent.getBoundingBox();
        const targetBoundingBox = target.getBoundingBox();
        
        const width = (boundingBox.w - targetBoundingBox.w) / 2 + this.left;
        const height = (boundingBox.h - targetBoundingBox.h) / 2 + this.top;
        target.setPosition(width, height);
    }
}