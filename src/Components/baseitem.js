class BaseItem {
    constructor(canvasWidth) {
        this._blockSize = 50;
        this._startPos = Math.floor(canvasWidth / 2 / this._blockSize) * this._blockSize;
        this._blocks = [];
    }
    
    _getBlockPos(coorType, valueType) {
        const { x, y } = this._blocks[0];
        const obj = { xmin: x, xmax: x, ymin: y, ymax: y};
        this._blocks.forEach(item => { 
            if (item.x > obj.xmax) obj.xmax = item.x;
            if (item.x < obj.xmin) obj.xmin = item.x;
            if (item.y > obj.ymax) obj.ymax = item.y;
            if (item.y < obj.ymin) obj.ymin = item.y;
        });

        return obj[coorType + valueType];
    }

    get blockSize() {
        return this._blockSize; 
    }

    get height() {
        return this._getBlockPos("y", "max") - this._getBlockPos("y", "min") +  this._blockSize;
    }

    get x() {
        return this._getBlockPos("x", "min");
    }

    get y() {
        return this._getBlockPos("y", "min");
    }

    block(index) {
        return this._blocks[index];
    }

    moveDown() {
        this._blocks.forEach(block => block.y += this._blockSize);
    }
}

export default BaseItem;