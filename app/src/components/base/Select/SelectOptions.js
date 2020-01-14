import React, { useRef, useMemo, useContext } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { find, isEmpty, get } from 'lodash/fp';

// components
import Checkbox from '../Checkbox';
import { Option, Label } from './Select.common';
import { optionsType } from './Select.types';
import SelectOptionsGroup from './SelectOptionsGroup';
import { getOptionHeight } from './select.utils';
import { CurrentHoveredIndexContext } from './Select';
import VirtualScroll from '../VirtualScroll';

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
    currentHoveredOptionValue,
    theme
  } = props;

  const containerRef = useRef(null);
  const itemsRef = useRef({});

  const rowHeight = useMemo(() => getOptionHeight({ small, large, theme }), [
    large,
    small,
    theme
  ]);

  const maxHeight = useMemo(() => maxItems * rowHeight, [maxItems, rowHeight]);

  const currentHoveredIndex = useContext(CurrentHoveredIndexContext);

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
          groups={options}
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

  const innerListHeight = rowHeight * items.length;

  return (
    <Container
      className="menu-options-container"
      ref={containerRef}
      maxHeight={maxHeight}
      marginTop={multi || (searchable && !inlineSearch) ? '5px' : 0}
    >
      {get('[0].options', options) ? (
        <Inner className="menu-options">{items}</Inner>
      ) : (
        <VirtualScroll
          className="menu-options"
          height={innerListHeight < maxHeight ? innerListHeight : maxHeight}
          scrollToIndex={currentHoveredIndex}
          rowCount={items.length}
          rowHeight={rowHeight}
          rowRenderer={({ index, style }) =>
            React.cloneElement(items[index], {
              style,
              transition: 'none'
            })
          }
        />
      )}
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

export default withTheme(SelectOptions);

const Container = styled.div`
  position: relative;
  margin-top: ${({ marginTop }) => marginTop};
  width: 100%;
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  overflow: auto;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;
