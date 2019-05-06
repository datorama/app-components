import React, { Component } from 'react';
import { withContext } from './DragDropProvider';
import PropTypes from 'prop-types';

class Droppable extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    setHover: PropTypes.func.isRequired
  };

  setHover = hovering => e => {
    e.stopPropagation();
    this.props.setHover(hovering ? this.props.id : null);
  };

  render() {
    return (
      <div
        className={this.props.className}
        onMouseOver={this.setHover(true)}
        onMouseOut={this.setHover(false)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default withContext(Droppable);
