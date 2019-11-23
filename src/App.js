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
      height: 500
    };

    this.state = {
      elements: []
    };
  }

  checkStopping(item) {
    const elements = this.state.elements.filter((element) => element !== item);

    // for (const element of elements) {
    //   if (rect.y + rect.height === element.y && rect.x === element.x) {
    //     return true;
    //   }
    // }
    if (item.y + item.height >= this.canvas.height) {
      return true;
    }

    return false;
  }

  handleKeyPressed(event) {
    const { ctx, width, height } = this.canvas;
    switch (event.key) {
      case " ":
        const item = new LItem(width);
        const { elements } = this.state;
        elements.push(item);
        this.setState({ elements });

        const intervalId = setInterval(() => {
          ctx.clearRect(0, 0, width, height);

          const { elements } = this.state;
          const foundItem = elements.find(element => element === item);
          foundItem.moveDown();
          if (this.checkStopping(foundItem)) {
            clearInterval(intervalId);
          }
          this.setState({ elements });
        }, 500);
        break;
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
        for (let i = 0; i < 4; ++i) {
          const rect = element.block(i);
          this.canvas.ctx.fillStyle = "black";
          this.canvas.ctx.fillRect(rect.x, rect.y, blockSize, blockSize);
          this.canvas.ctx.fillStyle = "green";
          this.canvas.ctx.fillRect(rect.x + borderWidth, rect.y + borderWidth, blockSize - borderWidth * 2, blockSize - borderWidth * 2);
        }        
      });
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
