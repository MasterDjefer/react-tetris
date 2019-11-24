import BaseItem from "./baseitem";

class OItem extends BaseItem {
    constructor(canvasWidth) {
        super(canvasWidth);
        this._matrix = [[1,1,0,0],
                        [1,1,0,0],
                        [0,0,0,0],
                        [0,0,0,0]];
        this._generateBlocks();
    }

    rotate() {
        //override because dont need to rotate
    }
}

export default OItem;