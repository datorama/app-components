import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { find, isEmpty, get } from 'lodash/fp';

// components
import Checkbox from '../Checkbox';
import { Option, Label } from './Select.common';
import { optionsType } from './Select.types';
import SelectOptionsGroup from './SelectOptionsGroup';
import { calcScrollTop } from './select.utils';

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
    inlineSearch,
    currentHoveredOptionValue
  } = props;

  const containerRef = useRef(null);
  const itemsRef = useRef({});

  if (isEmpty(options)) {
    return null;
  }

  if (
    currentHoveredOptionValue === null &&
    get('current.scrollTop', containerRef)
  ) {
    containerRef.current.scrollTop = 0;
  }

  const items = options.map(option => {
    if (option.options) {
      return (
        <SelectOptionsGroup
          key={`group-options group-options-${option.label}`}
          options={option.options}
          values={values}
          multi={multi}
          inlineSearch={inlineSearch}
          handleClick={handleClick}
          groupLabel={option.label}
          small={small}
          large={large}
          optionRenderer={optionRenderer}
          maxItems={maxItems}
          searchable={searchable}
          optionLabelRenderer={optionLabelRenderer}
          currentHoveredOptionValue={currentHoveredOptionValue}
          containerRef={containerRef}
        />
      );
    }

    const selected = find(op => op.value === option.value, values);

    if (optionRenderer) {
      return optionRenderer({ option, selected });
    }

    if (currentHoveredOptionValue === option.value) {
      containerRef.current.scrollTop = calcScrollTop(
        get(['current', option.value], itemsRef),
        containerRef.current
      );
    }

    return (
      <Option
        ref={el => (itemsRef.current[option.value] = el)}
        className={!multi && selected ? 'option option-selected' : 'option'}
        key={option.value}
        onClick={() => handleClick(option)}
        selected={selected && !multi}
        hovered={currentHoveredOptionValue === option.value}
        title={option.label}
        small={small}
        large={large}
      >
        {multi && (
          <StyledCheckbox
            checked={!!selected}
            className="menu-option-checkbox"
          />
        )}
        {optionLabelRenderer ? (
          optionLabelRenderer(option)
        ) : (
          <Label small={small} large={large} className="menu-option-label">
            {option.label}
          </Label>
        )}
      </Option>
    );
  });

  return (
    <Container
      className="menu-options-container"
      ref={containerRef}
      maxItems={maxItems}
      marginTop={multi || (searchable && !inlineSearch) ? '5px' : 0}
      small={small}
      large={large}
    >
      <Inner className="menu-options">{items}</Inner>
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
  inlineSearch: PropTypes.bool,
  currentHoveredOptionValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default SelectOptions;

const Container = styled.div`
  position: relative;
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
