import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card.js'
import GridCell from './GridCell.js'
import { connect } from 'react-redux';

const GRID_SIZE = 8;

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

  renderCell(x,y) {
    return (
      <GridCell x={x} y={y} onCellClick={this.props.onCellClick}>
        {this.getCard(x,y)}
      </GridCell>
    );
  }

  render() {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        cells.push(this.renderCell(x,y));
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
//export default connect(mapStateToProps, mapDispatchToProps)(CardGrid);