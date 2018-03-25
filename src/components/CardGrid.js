import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card.js'
import GridCell from './GridCell.js'
import { connect } from 'react-redux';
import {AStar, gridToGraph, euclidean} from '../AStar';

const GRID_SIZE = 50;
const GRID_GRAPH = gridToGraph(GRID_SIZE, GRID_SIZE);

class CardGrid extends React.Component {
  getCard(x,y) {
    const card = this.props.cards.find(c => Number(c.x) === x
                                         && Number(c.y) === y);
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
    return AStar(GRID_GRAPH, cardA, cardB, euclidean);
  }

  renderCell(x,y,path) {
    const onPath = path.find(p=> p.x === x && p.y === y);
    return (
      <GridCell key={x*GRID_SIZE+y} x={x} y={y} onPath={onPath ? true : false}
                onCellClick={this.props.onCellClick}>
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
  onCellClick: PropTypes.func.isRequired
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
    onCellClick: (id,x,y) => {
      dispatch(moveCard(id,x,y));
    }
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(CardGrid));
