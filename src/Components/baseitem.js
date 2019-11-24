class BaseItem {
    constructor(canvasWidth) {
        this._blockSize = 50;
        this._x = Math.floor(canvasWidth / 2 / this._blockSize) * this._blockSize;
        this._y = 0;
        this._matrix = [];
        this._blocks = [];      
        this._pivot = {};   
    }

    _generateBlocks() {
        this._blocks = [];
        const { _x, _y, _blockSize } = this;

        for (let i = 0; i < this._matrix.length; ++i) {
            for (let j = 0; j < this._matrix[i].length; ++j) {
                if (this._matrix[i][j]) {
                    this._blocks.push({ x: _x + j * _blockSize, y: _y + i * _blockSize });
                }
            }
        }
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

    isOn(item) {
        for (let i = 0; i < this._blocks.length; ++i) {
            for (let j = 0; j < item._blocks.length; ++j) {
                if (this._blocks[i].x === item._blocks[j].x && this._blocks[i].y + this._blockSize === item._blocks[j].y) {
                    return true;
                }
            }
        }

        return false;
    }

    isLeft(item) {
        for (let i = 0; i < this._blocks.length; ++i) {
            for (let j = 0; j < item._blocks.length; ++j) {
                if (this._blocks[i].x - this._blockSize === item._blocks[j].x && this._blocks[i].y === item._blocks[j].y) {
                    return true;
                }
            }
        }

        return false;
    }

    isRight(item) {
        for (let i = 0; i < this._blocks.length; ++i) {
            for (let j = 0; j < item._blocks.length; ++j) {
                if (this._blocks[i].x + this._blockSize === item._blocks[j].x && this._blocks[i].y === item._blocks[j].y) {
                    return true;
                }
            }
        }

        return false;
    }

    get blockSize() {
        return this._blockSize; 
    }

    get blocksCount() {
        return this._blocks.length;
    }

    get height() {
        return this._getBlockPos("y", "max") - this._getBlockPos("y", "min") + this._blockSize;
    }

    get width() {
        return this._getBlockPos("x", "max") - this._getBlockPos("x", "min") + this._blockSize;
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

    moveDown(canvasHeight, elements) {
        if (this.y + this.height + this._blockSize > canvasHeight) {            
            return false;
        }

        for (const element of elements) {
            if (this.isOn(element)) {
                return false;
            }
        }

        this._blocks.forEach(block => block.y += this._blockSize);
        this._y += this._blockSize;
        return true;
    }

    moveLeft(canvasStartWidth, elements) {
        for (const element of elements) {
            if (this.isLeft(element)) {
                return;
            }
        }

        if (this.x - this._blockSize >= canvasStartWidth) {
            this._blocks.forEach(block => block.x -= this._blockSize);  
        }

        this._x -= this._blockSize;
    }

    moveRight(canvasWidth, elements) {
        for (const element of elements) {
            if (this.isRight(element)) {
                return;
            }
        }

        if (this.x + this.width + this._blockSize <= canvasWidth) {
            this._blocks.forEach(block => block.x += this._blockSize);
        }

        this._x += this._blockSize;
    }

    clearMatrix() {
        for (let i = 0; i < this._matrix.length; ++i) {
            for (let j = 0; j < this._matrix[i].length; ++j) {
                this._matrix[i][j] = 0;
            }
        }
    }

    multiplyVector(vector) {
        return { x: vector.y, y: -vector.x };
    }

    rotate() {
        const { _pivot } = this;
        const points = [];
        for (let i = 0; i < this._matrix.length; ++i) {
            for (let j = 0; j < this._matrix[i].length; ++j) {
                if (this._matrix[i][j]) {
                    points.push({ x: i, y: j });
                }
            }
        }
        this.clearMatrix();

        for (const point of points) {
            const vector = { x: point.x - this._pivot.x, y: point.y - this._pivot.y };
            let rotatedPoint = this.multiplyVector(vector);
            rotatedPoint.x += _pivot.x;
            rotatedPoint.y += _pivot.y;
            this._matrix[rotatedPoint.x][rotatedPoint.y] = 1;
        }
        this._generateBlocks();
    }
}

export default BaseItem;