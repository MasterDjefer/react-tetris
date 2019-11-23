import BaseItem from "./baseitem";

class LItem extends BaseItem {
    constructor(canvasWidth) {
        super(canvasWidth);
        const { _startPos, _blockSize } = this;
        this._blocks = [{ x: _startPos, y: 0 }, { x: _startPos + _blockSize, y: 0 }, { x: _startPos + _blockSize * 2, y: 0 }, { x: _startPos + _blockSize * 2, y: _blockSize }];
    }
}

export default LItem;