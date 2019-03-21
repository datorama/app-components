import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Collapsible from './Collapsible';

// icons
import ArrowDown from '../icons/ArrowDown.icon';

class Collapse extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    label: PropTypes.string
  };

  state = {
    open: false
  };

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }));

  render() {
    const { open } = this.state;
    const { children, className, label } = this.props;

    return (
      <Container className={className}>
        <Header onClick={this.toggleOpen}>
          <StyledArrow open={open} />
          {label}
        </Header>
        <Collapsible open={open} toggleOpen={this.toggleOpen}>
          {children}
        </Collapsible>
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
