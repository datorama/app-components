import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

// components
import Draggable from './Draggable';

class Range extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    initialValue: PropTypes.number,
    disabled: PropTypes.bool,
    className: PropTypes.string
  };

  state = {
    percentage: this.props.initialValue
      ? Math.round(
          (this.props.initialValue / 100) * (this.props.max - this.props.min)
        ) + this.props.min
      : 0,
    lastPercentage: 0,
    dragging: false,
    value: this.props.initialValue || 0
  };

  handleDrag = ({ translateX }) => {
    const { width } = this.el.getBoundingClientRect();
    const { lastPercentage } = this.state;
    const { min, max, onChange } = this.props;
    const calcPercentage = Math.min(
      100,
      lastPercentage + (translateX / width) * 100
    );
    const percentage = Math.max(0, calcPercentage);

    this.setState(
      {
        percentage,
        value: Math.round((percentage / 100) * (max - min)) + min
      },
      () => {
        if (onChange) {
          onChange(this.state.value);
        }
      }
    );
  };

  handleDragStart = () => this.setState({ dragging: true });

  handleDragEnd = () =>
    this.setState({
      lastPercentage: this.state.percentage,
      dragging: false
    });

  render() {
    const { percentage, dragging, value } = this.state;
    const { min, max, disabled, className } = this.props;

    return (
      <Container disabled={disabled} className={className}>
        <Outer ref={el => (this.el = el)} className="outer" disabled={disabled}>
          <Inner width={percentage} className="inner" />
        </Outer>
        <Draggable
          onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDragEnd={this.handleDragEnd}
          controlled
        >
          <Thumb
            className="thumb"
            left={percentage}
            dragging={dragging}
            disabled={disabled}
          />
        </Draggable>
        <Value left={percentage} visible={dragging} className="value">
          {value}
        </Value>

        <Label left="-20px" className="label">
          {min}
        </Label>
        <Label left="calc(100% - 20px)" className="label">
          {max}
        </Label>
      </Container>
    );
  }
}

export default Range;

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 6px;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const Outer = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.p200 : hexToRgba(theme.a300, 40)};
  border-radius: 3px;
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div.attrs(({ width }) => ({
  style: { width: `${width}%` }
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: ${({ theme }) => theme.a400};
  transition: all 100ms;
`;

const Thumb = styled.div.attrs(({ left }) => ({
  style: { left: `calc(${left}% - 6px)` }
}))`
  width: 12px;
  height: 12px;
  cursor: pointer;
  border-radius: 50%;
  background: ${({ theme }) => theme.a400};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: -3px;
  left: -6px;
  opacity: 1;
  transition: all 100ms;

  ${({ dragging }) =>
    dragging &&
    css`
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transform: scale(1.1);
    `};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.p200};
    `};

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
`;

const Label = styled.div`
  position: absolute;
  top: 10px;
  left: ${({ left }) => left};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 20px;
  pointer-events: none;
  ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.p300};
`;

const Value = styled.div.attrs(({ left }) => ({
  style: { left: `${left}%` }
}))`
  padding: 2px 6px;
  ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.p0};
  border-radius: 3px;
  background: ${({ theme }) => hexToRgba(theme.p500, 90)};
  transform: translateX(-50%);
  position: absolute;
  transition: all 100ms;
  top: -28px;
  opacity: 0;

  ${({ visible }) =>
    visible &&
    css`
      top: -36px;
      opacity: 1;
    `};
`;
