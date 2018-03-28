import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card.js'
import GridCell from './GridCell.js'
import { connect } from 'react-redux';
import {AStar, Direction, gridToGraph, euclidean} from '../AStar';

const GRID_SIZE = 50;
const GRID_GRAPH = gridToGraph(GRID_SIZE, GRID_SIZE);

class CardGrid extends React.Component {
  getCard(x,y) {
    const card = this.props.cards.find(c => c.x === x
                                         && c.y === y);
    if (card) {
      return (
        <Card label={card.id} />
      );
    }
  }

  calcPath(a,b) {
    const { cards } = this.props;
    const cardA = cards.find(card => card.id === a);
    const cardB = cards.find(card => card.id === b);
    const otherCards = cards.filter(card => !(card.id === a || card.id === b));
    let blocks = [];
    otherCards.forEach(card => blocks = blocks.concat(GRID_GRAPH[card.x][card.y]));
    return AStar(GRID_GRAPH, cardA, cardB, euclidean, blocks);
  }

  renderCell(x,y,path) {
    const pathIndex = path.findIndex(p=> p.x === x && p.y === y);
    const onPath = -1 != pathIndex ? true : false;
    const fromDir = Direction.opposite(-1 != pathIndex ?
                                       path[pathIndex].direction : Direction.CENTER);
    const toDir = (pathIndex - 1) > -1 ? path[pathIndex-1].direction : Direction.CENTER;
    return (
      <GridCell key={x*GRID_SIZE+y} x={x} y={y} onPath={onPath}
                fromDir={fromDir} toDir={toDir}
                onCellDrop={this.props.moveCard}>
        {this.getCard(x,y)}
      </GridCell>
    );
  }

  render() {
    const path = this.calcPath("A","B");
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        cells.push(this.renderCell(x,y,path));
      }
    }
    return (
      <div style={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {cells}
      </div>
    );
  }
}

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  moveCard: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    cards: state.cards
  }
}

function moveCard(id,x,y) {
  return ({type:"MOVE_CARD",
            id: id,
            x: x,
            y: y});
}

const mapDispatchToProps = dispatch => {
  return {
    moveCard: (id,x,y) => {
      dispatch(moveCard(id,x,y));
    }
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(CardGrid));
