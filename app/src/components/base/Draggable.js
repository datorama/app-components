import React from 'react';
import styled, { css } from 'styled-components';
import { withContext } from './DragDropProvider';
import PropTypes from 'prop-types';

class Draggable extends React.Component {
  static propTypes = {
    onDrag: PropTypes.func,
    id: PropTypes.string.isRequired,
    setDrag: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: clientX,
        originalY: clientY,
        isDragging: true
      },
      () => {
        this.props.setDrag(this.props.id);
      }
    );
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(
      prevState => ({
        translateX: clientX - prevState.originalX,
        translateY: clientY - prevState.originalY
      }),
      () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      }
    );
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        translateX: 0,
        translateY: 0,
        isDragging: false
      },
      () => {
        this.props.setDrag(null);
      }
    );
  };

  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;

    return (
      <Container
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
      >
        {children}
      </Container>
    );
  }
}

export default withContext(Draggable);

const Container = styled.div.attrs(({ x, y }) => ({
  style: { transform: `translate(${x}px, ${y}px)` }
}))`
  cursor: grab;
  user-select: none;

  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.8;
      pointer-events: none;
      cursor: grabbing;
    `};
`;
