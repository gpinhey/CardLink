import React from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

const cellTarget = {
  drop(props, monitor) {
    props.onCellDrop(monitor.getItem().id, props.x, props.y);
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
    const {x, y, connectDropTarget, onPath} = this.props;
    return connectDropTarget(
      <div style={{ width: '2%',
                    height: '2%',
                    border: '1px dotted blue',
                    boxSizing: 'border-box',
                    backgroundColor: onPath ? 'red' : ''}}>
        {this.props.children}&nbsp;
      </div>
    );
  }
}

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onCellDrop: PropTypes.func.isRequired,
  onPath: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
}

export default DropTarget("Card", cellTarget, collect)(GridCell);