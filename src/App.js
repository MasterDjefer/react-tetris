import React from 'react';
import './App.css';
import OItem from './Components/oitem';
import LItem from './Components/litem';
import JItem from './Components/jitem';
import IItem from './Components/iitem';
import TItem from './Components/titem';
import SItem from './Components/sitem';
import ZItem from './Components/zitem';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu">
        <div className="button-play" onClick={this.props.onPlayClicked}>Press me</div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.drawElements = this.drawElements.bind(this);
    this.handlePlayClicked = this.handlePlayClicked.bind(this);

    this.items = [OItem, LItem, JItem, TItem, SItem, ZItem];

    this.canvas = {
      width: 500,
      height: 700
    };

    this.state = {
      elements: [],
      currentActiveItem: null,
      isPlayOn: false
    };
  }

  getRandomItem() {
    // this.items[Math.floor(Math.random() * 1000) % this.items.length]
    return new this.items[Math.floor(Math.random() * 1000) % this.items.length](this.canvas.width);
  }

  moveDownItem() {
    const { currentActiveItem, elements } = this.state;
    if (currentActiveItem) {
      if (!currentActiveItem.moveDown(this.canvas.height, elements)) {
        elements.push(currentActiveItem);
        this.setState({ elements, currentActiveItem: null });
        return false;
      }

      this.setState({ currentActiveItem });
      return true;
    }
  }

  moveLeftItem() {
    const { currentActiveItem, elements } = this.state;
    if (currentActiveItem) {
      currentActiveItem.moveLeft(0, elements);
      this.setState({ currentActiveItem });
    }
  }

  moveRightItem() {
    const { currentActiveItem, elements } = this.state;
    if (currentActiveItem) {
      currentActiveItem.moveRight(this.canvas.width, elements);
      this.setState({ currentActiveItem });
    }
  }

  handleKeyPressed(event) {
    const { key } = event;

    if (key === " ") {
      const currentActiveItem = this.getRandomItem();
      this.setState({ currentActiveItem });

      const timerId = setInterval(() => {
        if (!this.moveDownItem()) {
          clearInterval(timerId);
        }
      }, 800);
    } else
    if (key === "ArrowLeft") {
      this.moveLeftItem();
    } else
    if (key === "ArrowRight") {
      this.moveRightItem();
    } else
    if (key === "ArrowDown") {
      this.moveDownItem();
    } else
    if (key === "ArrowUp") {
      const { currentActiveItem } = this.state;
      if (currentActiveItem) {
        currentActiveItem.rotate();
        this.setState({ currentActiveItem });
      }
    }
  }

  drawElements() {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPressed, false);
    this.canvas.ctx = this.refs.canvas.getContext('2d');
  }

  componentDidUpdate() {
    this.drawElements();
  }

  startGame() {
    const currentActiveItem = this.getRandomItem();
    this.setState({ currentActiveItem });

    const timerId = setInterval(() => {
      if (!this.moveDownItem()) {
        this.startGame();
        clearInterval(timerId);
      }
    }, 800);
  }

  handlePlayClicked() {
    this.setState({ isPlayOn: true });

    this.startGame();
  }

  render() {
    return (
      <div className="container">
        <div className="canvas-container">
          <canvas ref="canvas" width={this.canvas.width} height={this.canvas.height}></canvas>
        </div>

        {
          !this.state.isPlayOn ? <Menu onPlayClicked={this.handlePlayClicked}/> : ""
        }
      </div>
    );
  }
}

export default App;
