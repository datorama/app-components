import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { optionsType } from './Select.types';
import { Arrow } from './SelectHeader';
import { map } from 'lodash/fp';

const mapWithIndex = map.convert({ cap: false });

class InlineSearch extends Component {
  static propTypes = {
    values: optionsType,
    placeholder: PropTypes.string,
    toggleOpen: PropTypes.func,
    error: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    open: PropTypes.bool,
    value: PropTypes.string,
    onSearch: PropTypes.func,
    maxTags: PropTypes.number,
    onSelect: PropTypes.func,
    toggleFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func
  };

  componentDidUpdate(prevProps) {
    if (this.props.values !== prevProps.values) {
      this.focus();
    }
  }

  handleRef = el => {
    if (el) {
      this.el = el;
    }
  };

  focus() {
    if (this.el) {
      this.el.focus();
    }
  }

  handleClick = () => {
    this.props.toggleOpen();
    this.focus();
  };

  handleInput = el => {
    const { open, toggleOpen } = this.props;

    if (!open) {
      toggleOpen();
    }
    this.props.onSearch(el);
  };

  render() {
    const { small, onKeyDown, onKeyUp } = this.props;
    const tags = [];

    mapWithIndex((option, index) => {
      if (index < this.props.maxTags) {
        tags.push(
          <SmallTag key={`small-tag-${option.value}`} title={option.label}>
            <SmallTagLabel small={small}>{option.label}</SmallTagLabel>
            <CloseIcon onClick={() => this.props.onSelect(option)} />
          </SmallTag>
        );
      }
    }, this.props.values);

    if (this.props.values.length > this.props.maxTags) {
      tags.push(
        <SmallTag key="extra-tags" type="info">
          <SmallTagLabel small={small}>
            +{this.props.values.length - this.props.maxTags}
          </SmallTagLabel>
        </SmallTag>
      );
    }

    return (
      <Container
        onClick={this.handleClick}
        error={this.props.error}
        small={this.props.small}
        large={this.props.large}
        className="inline-container"
        open={this.props.open}
      >
        <Inner>
          {tags}
          <SmallInput
            onChange={this.handleInput}
            value={this.props.value}
            placeholder={this.props.placeholder || 'Search'}
            ref={this.handleRef}
            small={this.props.small}
            onFocus={this.props.toggleFocus}
            onBlur={this.props.toggleFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
          />
        </Inner>
        <StyledArrow rotation={this.props.open ? '180deg' : '0deg'} />
      </Container>
    );
  }
}

export default InlineSearch;

const Container = styled.div`
  cursor: pointer;
  width: 320px;
  min-height: ${({ theme }) => theme.size.MEDIUM};
  box-sizing: border-box;
  padding: 0 4px;
  border: 1px solid ${({ error, theme }) => (error ? theme.r400 : theme.p200)};
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;
  user-select: none;

  ${({ open, theme, error }) =>
    open &&
    css`
      border-color: ${error ? theme.r400 : theme.a400};
    `};

  ${({ small, theme }) =>
    small &&
    css`
      height: ${theme.size.SMALL};
      ${theme.text.sm};
    `};

  ${({ large, theme }) =>
    large &&
    css`
      height: ${theme.size.LARGE};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `};
`;

const Inner = styled.div`
  width: calc(100% - 15px);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px 0 0;
  flex-wrap: wrap;
`;

const SmallTag = styled.div`
  padding: ${({ padding }) => padding || '0 18px 0 4px'};
  background: ${({ theme }) => theme.a400};
  cursor: pointer;
  border-radius: 2px;
  margin: 2px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;

  ${({ type }) =>
    type === 'info' &&
    css`
      padding: 0 4px;
      pointer-events: none;
    `};

  &:hover {
    background: ${({ theme }) => theme.a500};
  }
`;

const SmallTagLabel = styled.div`
  ${({ theme }) => theme.text.sm};
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60px;
  padding: 2px;

  ${({ small }) =>
    small &&
    css`
      font-size: 12px;
    `};
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 4px;
  top: 7px;
  width: 8px;
  height: 8px;
  margin-left: 4px;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #fff;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 2px;
  }
`;

const SmallInput = styled.input`
  border: none;
  width: 40px;
  height: 24px;
  background: transparent;
  color: ${({ theme }) => theme.p600};
  ${({ theme }) => theme.text.sm};
  font-size: 14px;
  flex: 1;
  box-sizing: border-box;
  padding: 0 4px;

  ${({ small }) =>
    small &&
    css`
      font-size: 12px;
    `};

  &::placeholder {
    color: ${({ theme }) => theme.p300};
  }
`;

const StyledArrow = styled(Arrow)`
  margin-right: 12px;
`;
