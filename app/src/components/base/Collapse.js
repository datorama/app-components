import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// icons
import ArrowDown from '../icons/ArrowDown.icon';

class Collapse extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    label: PropTypes.string
  };

  state = {
    open: true,
    height: 'auto'
  };

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }));

  handleRef = el => {
    if (el) {
      const { height } = el.getBoundingClientRect();

      this.setState({ height: `${height}px` }, this.toggleOpen);
    }
  };

  render() {
    const { open, height } = this.state;
    const { children, className, label } = this.props;

    let calcHeight = open ? height : 0;
    return (
      <Container className={className}>
        <Header onClick={this.toggleOpen}>
          <StyledArrow open={open} />
          {label}
        </Header>
        <Content height={calcHeight} open={open} ref={this.handleRef}>
          {children}
        </Content>
      </Container>
    );
  }
}

export default Collapse;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 34px;
  background: ${({ theme }) => theme.p0};
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.text.smBold};
  line-height: 12px;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  transition: all 300ms;
  overflow: hidden;
  opacity: ${({ open }) => (open ? 1 : 0)};
`;

const StyledArrow = styled(ArrowDown)`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  transition: all 300ms;
  transform: rotate(${({ open }) => (open ? '0deg' : '-90deg')});

  * {
    fill: ${({ theme }) => theme.p300};
  }
`;
