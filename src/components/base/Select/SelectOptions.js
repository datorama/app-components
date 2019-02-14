import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { find } from 'lodash/fp';

// components
import Checkbox from '../Checkbox';
import { Option, Label } from './Select';
import { optionsType } from './Select.types';

const OPTION_HEIGHT = 35;

const SelectOptions = props => {
  const {
    options,
    values,
    optionRenderer,
    multi,
    handleClick,
    maxItems,
    searchable,
    optionLabelRenderer
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
    <Container maxItems={maxItems} marginTop={multi || searchable ? '5px' : 0}>
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
  optionLabelRenderer: PropTypes.func
};

export default SelectOptions;

const Container = styled.div`
  margin-top: ${({ marginTop }) => marginTop};
  width: 100%;
  max-height: ${({ maxItems }) => `calc(${maxItems} * ${OPTION_HEIGHT}px)`};
  overflow: auto;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;
