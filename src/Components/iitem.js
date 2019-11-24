import BaseItem from "./baseitem";

class LItem extends BaseItem {
    constructor(canvasWidth) {
        super(canvasWidth);
        this._matrix = [[0,0,0,0],
                        [1,1,1,1],
                        [0,0,0,0],
                        [0,0,0,0]];
        this._pivot = { x: 1, y: 1 };
        this._generateBlocks();
    }

    // rotate() {
    //     if (this.state) {
    //         this._matrix = [[0,0,0,0],
    //         [1,1,1,1],
    //                         [0,0,0,0],
    //                         [0,0,0,0]];
    //     } else {                    
    //         this._matrix = [[0,1,0,0],
    //                         [0,1,0,0],
    //                         [0,1,0,0],
    //                         [0,1,0,0]];
    //     }

    //     this.state = !this.state;
    //     this._generateBlocks();
    // }
}

export default LItem;