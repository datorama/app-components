import React from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import { find } from 'lodash/fp';

// components
import Checkbox from '../Checkbox';
import { Option, Label } from './Select';
import { optionsType } from './Select.types';

const SelectOptions = props => {
  const {
    options,
    values,
    optionRenderer,
    multi,
    handleClick,
    maxItems,
    searchable,
    optionLabelRenderer,
    small,
    large,
    inlineSearch
  } = props;

  const items = options.map(option => {
    const selected = find(op => op.value === option.value, values);

    if (optionRenderer) {
      return optionRenderer({ option, selected });
    }

    return (
      <Option
        className="option"
        key={option.value}
        onClick={handleClick(option)}
        selected={selected && !multi}
        title={option.label}
        small={small}
        large={large}
      >
        {multi && <StyledCheckbox checked={!!selected} />}
        {optionLabelRenderer ? (
          optionLabelRenderer(option)
        ) : (
          <Label>{option.label}</Label>
        )}
      </Option>
    );
  });

  return (
    <Container
      maxItems={maxItems}
      marginTop={multi || (searchable && !inlineSearch) ? '5px' : 0}
      small={small}
      large={large}
    >
      <Inner>{items}</Inner>
    </Container>
  );
};

SelectOptions.propTypes = {
  options: optionsType,
  values: optionsType,
  optionRenderer: PropTypes.func,
  multi: PropTypes.bool,
  handleClick: PropTypes.func,
  maxItems: PropTypes.number,
  searchable: PropTypes.bool,
  optionLabelRenderer: PropTypes.func,
  small: PropTypes.bool,
  large: PropTypes.bool,
  inlineSearch: PropTypes.bool
};

export default SelectOptions;

const Container = styled.div`
  margin-top: ${({ marginTop }) => marginTop};
  width: 100%;
  max-height: ${({ maxItems, theme }) =>
    `calc(${maxItems} * ${theme.size.MEDIUM})`};
  overflow: auto;

  ${({ theme, small, maxItems }) =>
    small &&
    css`
      max-height: calc(${maxItems} * ${theme.size.SMALL});
    `};

  ${({ theme, large, maxItems }) =>
    large &&
    css`
      max-height: calc(${maxItems} * ${theme.size.LARGE});
    `};
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;
