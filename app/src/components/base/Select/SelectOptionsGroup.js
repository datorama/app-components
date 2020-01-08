import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { find, get, isEmpty, forEach } from 'lodash/fp';

// components
import Checkbox from '../Checkbox';
import { Option, Label } from './Select.common';
import { optionsType } from './Select.types';
import { GroupLabel } from './Select.common';
import { calcScrollTop } from './select.utils';
import { CurrentHoveredIndexContext } from './Select';

const getFlatOptions = groups => {
  const res = [];

  forEach(group => {
    res.push(...group.options);
  }, groups);

  return res;
};

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
    currentHoveredOptionValue,
    containerRef,
    groups
  } = props;

  const itemsRef = useRef({});
  const groupLabelsRef = useRef({});
  const currentHoveredIndex = useContext(CurrentHoveredIndexContext);

  useEffect(() => {
    const flatList = getFlatOptions(groups);

    if (flatList[currentHoveredIndex]) {
      const value = flatList[currentHoveredIndex].value;

      forEach(option => {
        if (value === option.value) {
          containerRef.current.scrollTop = calcScrollTop(
            get(['current', option.value], itemsRef),
            containerRef.current,
            get(['current', groupLabel, 'clientHeight'], groupLabelsRef)
          );
        }
      }, options);
    }
  }, [containerRef, currentHoveredIndex, groupLabel, groups, options]);

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
    <Container className="menu-options-group">
      <GroupLabel
        className="menu-options-group-label"
        ref={el => (groupLabelsRef.current[groupLabel] = el)}
        small={small}
        large={large}
      >
        {groupLabel}
      </GroupLabel>
      {items}
    </Container>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.options.length === nextProps.options.length &&
    prevProps.values.length === nextProps.values.length &&
    prevProps.groups.length === nextProps.groups.length &&
    prevProps.currentHoveredOptionValue === nextProps.currentHoveredOptionValue
  );
};

SelectOptionsGroup.propTypes = {
  options: optionsType,
  group: PropTypes.array,
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

export default React.memo(SelectOptionsGroup, areEqual);
