import React from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

const cellTarget = {
  drop(props, monitor) {
    props.onCellClick(monitor.getItem().id, props.x, props.y);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class GridCell extends React.Component {
  render() {
    const {onCellClick, x, y, connectDropTarget, onPath} = this.props;
    return connectDropTarget(
      <div style={{ width: '1.85%',
                    height: '2%',
                    border: '1px dotted blue',
                    backgroundColor: onPath ? 'red' : ''}}
          onClick={() => onCellClick('A',x,y)}>
        {this.props.children}&nbsp;
      </div>
    );
  }
}

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onPath: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
}

export default DropTarget("Card", cellTarget, collect)(GridCell);