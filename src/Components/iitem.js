import BaseItem from "./baseitem";

class LItem extends BaseItem {
    constructor(canvasWidth) {
        super(canvasWidth);
        this._matrix = [[1,1,1,1],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0]];
        this._pivot = { x: 1, y: 1 };
        this._generateBlocks();
    }
}

export default LItem;