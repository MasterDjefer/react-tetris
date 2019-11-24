import React from 'react';
import './App.css';
import OItem from './Components/oitem';
import LItem from './Components/litem';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.drawElements = this.drawElements.bind(this);
    this.checkStopping = this.checkStopping.bind(this);

    this.canvas = {
      width: 500,
      height: 900
    };

    this.state = {
      elements: [],
      currentActiveItem: null
    };
  }

  checkStopping() {
    const { currentActiveItem } = this.state;

    for (const element of this.state.elements) {
      if (currentActiveItem.isOn(element)) {
        return true;
      }
    }

    return false;
  }

  handleKeyPressed(event) {
    const { ctx, width, height } = this.canvas;
    const { key } = event;
    const { currentActiveItem } = this.state;

    if (key === " ") {
      const currentActiveItem = new LItem(width);
      
      this.setState({ currentActiveItem });

      const intervalId = setInterval(() => {
        ctx.clearRect(0, 0, width, height);

        let { currentActiveItem } = this.state;        
        if (!currentActiveItem.moveDown(height) || this.checkStopping()) {
          const { elements } = this.state;
          elements.push(currentActiveItem);
          currentActiveItem = null;
          this.setState({ elements });

          clearInterval(intervalId);
        }
        this.setState({ currentActiveItem });
      }, 100);
    } else
    if (key === "ArrowLeft") {
      if (currentActiveItem) {
        currentActiveItem.moveLeft(0);
        this.setState({ currentActiveItem });
      }
    } else
    if (key === "ArrowRight") {      
      if (currentActiveItem) {
        currentActiveItem.moveRight(width);
        this.setState({ currentActiveItem });
      }
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPressed, false);
    this.canvas.ctx = this.refs.canvas.getContext('2d');
  }

  componentDidUpdate() {
    this.drawElements();
  }

  drawElements() {   
      this.state.elements.forEach((element) => {
        const blockSize = element.blockSize;
        const borderWidth = 1;
        for (let i = 0; i < element.blocksCount; ++i) {
          const rect = element.block(i);
          this.canvas.ctx.fillStyle = "black";
          this.canvas.ctx.fillRect(rect.x, rect.y, blockSize, blockSize);
          this.canvas.ctx.fillStyle = "green";
          this.canvas.ctx.fillRect(rect.x + borderWidth, rect.y + borderWidth, blockSize - borderWidth * 2, blockSize - borderWidth * 2);
        }        
      });

      const { currentActiveItem } = this.state;
      if (currentActiveItem) {
        const blockSize = currentActiveItem.blockSize;
        const borderWidth = 1;
        for (let i = 0; i < currentActiveItem.blocksCount; ++i) {
          const rect = currentActiveItem.block(i);
          this.canvas.ctx.fillStyle = "black";
          this.canvas.ctx.fillRect(rect.x, rect.y, blockSize, blockSize);
          this.canvas.ctx.fillStyle = "green";
          this.canvas.ctx.fillRect(rect.x + borderWidth, rect.y + borderWidth, blockSize - borderWidth * 2, blockSize - borderWidth * 2);
        }        
      }
  }

  render() {    
    return (
      <div>
        <canvas ref="canvas" width={this.canvas.width} height={this.canvas.height} style={{ backgroundColor: "red" }}></canvas>
      </div>
    );
  }
}

export default App;
