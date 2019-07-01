import React from 'react';
import styled from 'styled-components';
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
    optionLabelRenderer,
    small,
    large,
    groupLabel,
    currentHoveredOptionValue
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
        onClick={() => handleClick(option)}
        selected={selected && !multi}
        hovered={currentHoveredOptionValue === option.value}
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
    <Container>
      <GroupLabel small={small} large={large}>
        {groupLabel}
      </GroupLabel>
      {items}
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
  inlineSearch: PropTypes.bool,
  currentHoveredOptionValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

const Container = styled.div``;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

export default SelectOptionsGroup;
