import React from "react";
import styled from "styled-components";
import { noop } from "lodash/fp";

import SelectSearch from "packages/select/SelectSearch";
import SelectMultiHeader from "packages/select/SelectMultiHeader";
import SelectNoResults from "packages/select/SelectNoResults";
import SelectOptions from "packages/select/SelectOptions";
import Spinner from "packages/core/Spinner";

import { hexToRgba } from "common/utils";

import { SelectionMenuProps } from "packages/select/types";

const SelectMenuContext = React.createContext({
  onMenuEnter: noop,
  onMenuLeave: noop,
});

const SelectionMenu = (
  props: Omit<SelectionMenuProps, "maxTags" | "onChange" | "options">
) => {
  const {
    isSearchable,
    onSearch,
    getOptions,
    values,
    isMulti,
    selectAll,
    optionRenderer,
    onSelect,
    searchTerm,
    total,
    maxItems,
    searchPlaceholder,
    optionLabelRenderer,
    isSmall,
    isLarge,
    isInlineSearch,
    currentHoveredOptionValue,
    toggleOpen,
    toggleFocus,
    onKeyDown,
    onKeyUp,
    isLoading,
    spinnerColor,
    noResultsRenderer,
  } = props;

  let maxHeight = 400;

  if (isMulti) {
    maxHeight += 5;
  }
  if (isSearchable) {
    maxHeight += 5;
  }

  const options = getOptions();

  return (
    <SelectMenuContext.Consumer>
      {({ onMenuEnter, onMenuLeave }) => (
        <Container
          className="menu"
          maxHeight={`${maxHeight}px`}
          onMouseEnter={onMenuEnter}
          onMouseLeave={onMenuLeave}
        >
          {(isInlineSearch || isSearchable) && isLoading && (
            <SpinnerContainer className="spinner-container">
              <Spinner color={spinnerColor} />
            </SpinnerContainer>
          )}

          {!isInlineSearch && isSearchable && (
            <SelectSearch
              onChange={onSearch}
              value={searchTerm}
              searchPlaceholder={searchPlaceholder}
              isSmall={isSmall}
              isLarge={isLarge}
              toggleFocus={toggleFocus}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            />
          )}

          <SelectMultiHeader
            className="menu-isMulti-header"
            options={options}
            values={values}
            isMulti={isMulti}
            selectAll={selectAll}
            total={total}
          />

          {!total ? (
            noResultsRenderer ? (
              noResultsRenderer()
            ) : (
              <SelectNoResults className="menu-no-results" />
            )
          ) : null}

          <SelectOptions
            options={options}
            values={values}
            optionRenderer={optionRenderer}
            isMulti={isMulti}
            handleClick={onSelect}
            toggleOpen={toggleOpen}
            maxItems={maxItems}
            isSearchable={isSearchable}
            optionLabelRenderer={optionLabelRenderer}
            isSmall={isSmall}
            isLarge={isLarge}
            isInlineSearch={isInlineSearch}
            currentHoveredOptionValue={currentHoveredOptionValue}
          />
        </Container>
      )}
    </SelectMenuContext.Consumer>
  );
};

const SelectMenu = (
  props: Omit<SelectionMenuProps, "maxTags" | "onChange" | "options">
) => {
  const { menuRenderer } = props;

  if (menuRenderer) {
    return menuRenderer({
      ...props,
    });
  }

  return <SelectionMenu {...props} />;
};

const Container = styled.div<{ maxHeight: string }>`
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

export default SelectMenu;
