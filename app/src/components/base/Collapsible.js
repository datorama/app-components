import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Collapsible extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired
  };

  state = {
    height: 'auto',
    open: true
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open });
    }
  }

  handleRef = el => {
    if (el) {
      const { height } = el.getBoundingClientRect();

      this.setState({ height: `${height}px` }, () => {
        if (!this.props.open) {
          this.setState({ open: false });
        }
      });
    }
  };

  render() {
    const { height, open } = this.state;
    const { children, className } = this.props;

    let calcHeight = open ? height : 0;
    return (
      <Content
        className={className}
        height={calcHeight}
        open={open}
        ref={this.handleRef}
      >
        {children}
      </Content>
    );
  }
}

export default Collapsible;

const Content = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  transition: all 300ms;
  overflow: hidden;
  opacity: ${({ open }) => (open ? 1 : 0)};
  position: relative;
`;
