import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import { optionsType } from './Select.types';
import SelectSearch from './SelectSearch';
import SelectMultiHeader from './SelectMultiHeader';
import SelectNoResults from './SelectNoResults';
import SelectOptions from './SelectOptions';
import { SelectMenuContext } from '../../contexts';
import Spinner from '../Spinner';

// utils
import { hexToRgba } from '../../utils';

const SelectionMenu = props => {
  const {
    open,
    searchable,
    onSearch,
    getOptions,
    values,
    multi,
    selectAll,
    optionRenderer,
    onSelect,
    searchTerm,
    total,
    maxItems,
    searchPlaceholder,
    optionLabelRenderer,
    small,
    large,
    inlineSearch,
    currentHoveredOptionValue,
    toggleOpen,
    toggleFocus,
    onKeyDown,
    onKeyUp,
    loading,
    spinnerColor,
    noResultsRenderer
  } = props;

  let maxHeight = 400;

  if (multi) {
    maxHeight += 5;
  }
  if (searchable) {
    maxHeight += 5;
  }

  const options = getOptions();

  return (
    <SelectMenuContext.Consumer>
      {({ onMenuEnter, onMenuLeave }) => (
        <Container
          visible={open}
          className="menu"
          maxheight={`${maxHeight}px`}
          onMouseEnter={onMenuEnter}
          onMouseLeave={onMenuLeave}
        >
          {(inlineSearch || searchable) && loading && (
            <SpinnerContainer className="spinner-container">
              <Spinner color={spinnerColor} />
            </SpinnerContainer>
          )}

          {!inlineSearch && searchable && (
            <SelectSearch
              onChange={onSearch}
              value={searchTerm}
              searchPlaceholder={searchPlaceholder}
              small={small}
              large={large}
              toggleFocus={toggleFocus}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            />
          )}

          <SelectMultiHeader
            className="menu-multi-header"
            options={options}
            values={values}
            multi={multi}
            selectAll={selectAll}
            total={total}
            onChange={onSearch}
            value={searchTerm}
          />

          {!total &&
            (noResultsRenderer ? (
              noResultsRenderer()
            ) : (
              <SelectNoResults className="menu-no-results" />
            ))}

          <SelectOptions
            options={options}
            values={values}
            optionRenderer={optionRenderer}
            multi={multi}
            handleClick={onSelect}
            toggleOpen={toggleOpen}
            maxItems={maxItems}
            searchable={searchable}
            optionLabelRenderer={optionLabelRenderer}
            small={small}
            large={large}
            inlineSearch={inlineSearch}
            currentHoveredOptionValue={currentHoveredOptionValue}
          />
        </Container>
      )}
    </SelectMenuContext.Consumer>
  );
};

const SelectMenu = props => {
  const { menuRenderer } = props;

  if (menuRenderer) {
    return menuRenderer({
      ...props,
      menuRenderer: () => <SelectionMenu {...props} />
    });
  }

  return <SelectionMenu {...props} />;
};

export default SelectMenu;

SelectMenu.propTypes = {
  open: PropTypes.bool,
  searchable: PropTypes.bool,
  onSearch: PropTypes.func,
  onMenuEnter: PropTypes.func,
  onMenuLeave: PropTypes.func,
  getOptions: PropTypes.func,
  values: optionsType,
  multi: PropTypes.bool,
  selectAll: PropTypes.func,
  optionRenderer: PropTypes.func,
  onSelect: PropTypes.func,
  searchTerm: PropTypes.string,
  total: PropTypes.number,
  maxItems: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  optionLabelRenderer: PropTypes.func,
  noResultsRenderer: PropTypes.func,
  small: PropTypes.bool,
  large: PropTypes.bool,
  inlineSearch: PropTypes.bool,
  toggleFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  loading: PropTypes.bool,
  spinnerColor: PropTypes.string
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 20px;
  max-height: ${({ maxHeight }) => maxHeight};
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  user-select: none;
  overflow: hidden;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => hexToRgba(theme.p0, 80)};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
