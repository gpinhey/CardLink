import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const propTypes = {
  label: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

class Card extends React.Component {
  render() {
    const cardStyle = {
      position: "absolute",
      border: "2px solid black"
    };
    return this.props.connectDragSource(
      <div style={cardStyle}>
        {this.props.label}
      </div>
    );
  }
}

Card.propTypes = propTypes;

export default DragSource("Card", cardSource, collect)(Card);
