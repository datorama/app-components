import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Sticky extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    position: 'relative'
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (this.el) {
      const { top } = this.el.getBoundingClientRect();

      if (top <= 0 && this.state.position !== 'fixed') {
        this.setState({ position: 'fixed' });
      }

      if (top > 0 && this.state.position !== 'relative') {
        this.setState({ position: 'relative' });
      }
    }
  };

  render() {
    const { position } = this.state;
    const { className, children } = this.props;

    return (
      <Skeleton ref={el => (this.el = el)}>
        <Strip position={position} className={className}>
          {children}
        </Strip>
      </Skeleton>
    );
  }
}

export default Sticky;

const Skeleton = styled.div`
  width: 100%;
  height: 50px;
`;

const Strip = styled(Skeleton)`
  position: ${({ position }) => position};
  top: ${({ position }) => (position === 'fixed' ? 0 : 'auto')};
`;
