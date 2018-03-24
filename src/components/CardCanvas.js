import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card.js'

class CardCanvas extends React.Component {
  componentDidMount() {
      this.updateCanvas();
  }
  
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 100, 100);
  }

  render () {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(CardCanvas);