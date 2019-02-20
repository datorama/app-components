import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { optionsType } from './Select.types';
import { Arrow } from './SelectHeader';

// placeholder={props.placeholder || 'Search'}
// value={props.value}

const InlineSearch = props => {
  return (
    <Container
      onClick={props.toggleOpen}
      error={props.error}
      small={props.small}
      large={props.large}
    >
      <Inner>
        {props.values.map(value => (
          <SmallTag key={`small-tag-${value.id}`}>
            <SmallTagLabel>{value.label}</SmallTagLabel>
            <CloseIcon />
          </SmallTag>
        ))}
        <SmallInput onChange={props.onSearch} />
      </Inner>
      <Arrow rotation={props.open ? '180deg' : '0deg'} />
    </Container>
  );
};

InlineSearch.proptypes = {
  values: optionsType,
  placeholder: PropTypes.string,
  toggleOpen: PropTypes.func,
  error: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  open: PropTypes.bool,
  value: PropTypes.string,
  onSearch: PropTypes.func
};

export default InlineSearch;

const Container = styled.div`
  cursor: pointer;
  min-width: 170px;
  height: ${({ theme }) => theme.size.MEDIUM};
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
`;

const Inner = styled.div`
  width: calc(100% - 15px);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px 0 0;
`;

const SmallTag = styled.div`
  padding: 0 18px 0 2px;
  background: ${({ theme }) => theme.a400};
  cursor: pointer;
  border-radius: 2px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;

  &:hover {
    background: ${({ theme }) => theme.a500};
  }
`;

const SmallTagLabel = styled.div`
  ${({ theme }) => theme.text.sm};
  color: #fff;
  line-height: 12px;
  height: 20px;
  display: flex;
  align-items: center;
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
    height: 1px;
  }
`;

const SmallInput = styled.input`
  border: none;
  height: 24px;
  background: transparent;
  color: ${({ theme }) => theme.p800};
  ${({ theme }) => theme.text.sm};
`;
