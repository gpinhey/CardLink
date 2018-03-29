import React from 'react';
import PropTypes from 'prop-types';
import {Direction} from '../AStar';

class CardCanvas extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  getPoint(direction, rightMost, bottomMost) {
    const rightMid = rightMost / 2;
    const bottomMid = bottomMost / 2;
    switch(direction) {
      case Direction.TOP:
      return [rightMid,0];
      case Direction.TOPRIGHT:
      return [rightMost,0];
      case Direction.RIGHT:
      return [rightMost,bottomMid];
      case Direction.BOTTOMRIGHT:
      return [rightMost,bottomMost];
      case Direction.BOTTOM:
      return [rightMid, bottomMost];
      case Direction.BOTTOMLEFT:
      return [0,bottomMost];
      case Direction.LEFT:
      return [0, bottomMid];
      case Direction.TOPLEFT:
      return [0,0];
      case Direction.CENTER:
      default:
      return [rightMid,bottomMid];
    }
  }

  pointDistanceSquared(p1,p2) {
    const xdiff = p1[0] - p2[0];
    const ydiff = p1[1] - p2[1];
    return xdiff * xdiff + ydiff * ydiff;
  }

  getAnchor(startPoint, endPoint, rightMost, bottomMost) {
    const points = [];
    for (const dir in [Direction.TOP, Direction.TOPRIGHT,
                       Direction.RIGHT, Direction.BOTTOMRIGHT,
                       Direction.BOTTOM, Direction.BOTTOMLEFT,
                       Direction.LEFT, Direction.TOPLEFT]) {
       points.push(this.getPoint(dir, rightMost, bottomMost));
    }
    let max = -1;
    let maxPoint = [];
    for (const point of points) {
      const startdist = this.pointDistanceSquared(startPoint, point);
      const enddist   = this.pointDistanceSquared(endPoint, point);
      if (startdist + enddist > max) {
        max = startdist + enddist;
        maxPoint = point;
      }
    }
    return maxPoint;
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    const { width, height } = ctx.canvas;
    const { onPath, fromDir, toDir } = this.props;
    ctx.clearRect(0, 0, width, height);
    if (onPath) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.beginPath();
      const fromPoint = this.getPoint(fromDir, width, height);
      ctx.moveTo(fromPoint[0], fromPoint[1]);
      const toPoint = this.getPoint(toDir, width, height);
      const anchorPoint = this.getAnchor(fromPoint, toPoint, width, height);
      ctx.quadraticCurveTo(anchorPoint[0], anchorPoint[1], toPoint[0], toPoint[1]);
      ctx.stroke();
    }
  }

  render () {
    return (
      <canvas ref="canvas"
              style={{display: "block",
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
  onPath: PropTypes.bool.isRequired,
  fromDir: PropTypes.string.isRequired,
  toDir: PropTypes.string.isRequired
};

export default CardCanvas;