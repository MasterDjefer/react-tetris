import BaseItem from "./baseitem";

class LItem extends BaseItem {
    constructor(canvasWidth) {
        super(canvasWidth);
        this._matrix = [[0,0,0,0],
                        [1,1,1,1],
                        [0,0,0,0],
                        [0,0,0,0]];
        this._generateBlocks();
    }

    rotate() {
        super.rotate();
        this._rotateClock = !this._rotateClock;
    }
}

export default LItem;
