import React from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import CardCanvas from './CardCanvas';

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
    const {x, y, connectDropTarget, onPath, fromDir, toDir} = this.props;
    return connectDropTarget(
      <div style={{ width: '2%',
                    height: '2%',
                    border: '1px dotted blue',
                    boxSizing: 'border-box',
                    position: 'relative',
                    margin: 0,
                    padding: 0}}>
        <CardCanvas width='100%' height='100%' onPath={onPath}
                    fromDir={fromDir} toDir={toDir}/>
        {this.props.children}
      </div>
    );
  }
}

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onCellDrop: PropTypes.func.isRequired,
  onPath: PropTypes.bool.isRequired,
  fromDir: PropTypes.string.isRequired,
  toDir: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
}

export default DropTarget("Card", cellTarget, collect)(GridCell);