import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Popup from './Popup';

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    long: PropTypes.bool,
    onClickInfo: PropTypes.func,
    position: PropTypes.string,
    fixed: PropTypes.bool,
    visible: PropTypes.bool
  };

  title = () => <Text>{this.props.title}</Text>;

  render() {
    const { visible, children, position = 'TOP', fixed } = this.props;
    // const { open } = this.state;

    return (
      <StyledPopup
        open={visible}
        contentRenderer={this.title}
        position={position}
        fixed={fixed}
      >
        <span>{children}</span>
      </StyledPopup>
    );
  }
}

export default Tooltip;

const StyledPopup = styled(Popup)`
  white-space: nowrap;
`;

const Text = styled.span`
  font-size: 11px;
  color: #fff;
  font-weight: 300;
`;
