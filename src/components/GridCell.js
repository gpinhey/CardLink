import React from 'react';
import PropTypes from 'prop-types';

class GridCell extends React.Component {
  render() {
    const {onCellClick, x, y} = this.props;
    return (
      <div style={{ width: '12%',
                    height: '12%',
                    border: '1px dotted blue' }}
          onClick={() => onCellClick(x,y)}>
        {this.props.children}&nbsp;
      </div>
    );
  }
}

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onCellClick: PropTypes.func.isRequired
}

export default GridCell;