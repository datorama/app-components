import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Popup from './Popup';

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
  };

  state = {
    open: false
  };

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }));

  title = () => this.props.title;

  render() {
    const { children, position = 'TOP' } = this.props;
    const { open } = this.state;

    return (
      <StyledPopup open={open} contentRenderer={this.title} position={position}>
        <Container
          onMouseEnter={this.toggleOpen}
          onMouseLeave={this.toggleOpen}
        >
          {children}
        </Container>
      </StyledPopup>
    );
  }
}

export default Tooltip;

const Container = styled.span``;

const StyledPopup = styled(Popup)`
  white-space: nowrap;
`;
