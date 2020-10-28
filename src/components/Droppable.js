import React, { Component } from 'react';
import { withContext } from './DragDropProvider';
import * as PropTypes from 'prop-types';

class DroppableComp extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    setHover: PropTypes.func.isRequired,
  };

  setHover = (hovering) => (e) => {
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

export const Droppable = withContext(DroppableComp);
