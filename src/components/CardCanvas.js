import React from 'react';
import PropTypes from 'prop-types';

class CardCanvas extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (this.props.onPath) {
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "black"
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
      ctx.stroke();
    }
  }

  render () {
    return (
      <canvas ref="canvas"
              style={{display: "absolute",
                      margin: 0,
                      border: 0,
                      padding: 0,
                      objectFit: "fill",
                      width: this.props.width,
                      height: this.props.height}}
              width={100}
              height={100}
      />
    );
  }
}

CardCanvas.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onPath: PropTypes.bool.isRequired
};

export default CardCanvas;