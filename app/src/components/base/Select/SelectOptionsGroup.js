import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { find, isEmpty } from 'lodash/fp';

// components
import Checkbox from '../Checkbox';
import { Option, Label } from './Select.common';
import { optionsType } from './Select.types';
import { GroupLabel } from './Select.common';

const SelectOptionsGroup = props => {
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
    inlineSearch,
    groupLabel
  } = props;

  if (isEmpty(options)) {
    return null;
  }

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
          <Label small={small} large={large}>
            {option.label}
          </Label>
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
      <Inner>
        <GroupLabel small={small} large={large}>
          {groupLabel}
        </GroupLabel>
        {items}
      </Inner>
    </Container>
  );
};

SelectOptionsGroup.propTypes = {
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

export default SelectOptionsGroup;