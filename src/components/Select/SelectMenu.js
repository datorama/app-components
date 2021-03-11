/* eslint react/prop-types: 0 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';

// components
import { optionsType } from './Select.types';
import SelectSearch from './SelectSearch';
import SelectMultiHeader from './SelectMultiHeader';
import SelectNoResults from './SelectNoResults';
import SelectOptions from './SelectOptions';
import { SelectMenuContext } from './context';
import { Spinner } from '../Spinner';

// utils
import { hexToRgba } from '../../utils/theme.utils';
import { createPortal } from 'react-dom';

const SelectionMenu = (props) => {
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
    noResultsRenderer,
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

const SelectMenu = (props) => {
  const {
    menuRenderer,
    usePortalForMenu,
    containerRef,
    small,
    large,
    inlineSearch,
    open,
  } = props;
  const portalRef = useRef(null);
  const [portalPosition, setPortalPosition] = useState([0, 0]);
  if (menuRenderer) {
    return menuRenderer({
      ...props,
      // eslint-disable-next-line react/display-name
      menuRenderer: () => <SelectionMenu {...props} />,
    });
  }

  const repositionPortal = useCallback(() => {
    if (containerRef.current && portalRef.current) {
      const { x, y } = containerRef.current.getBoundingClientRect();
      setPortalPosition([x, y]);
    }
  }, [containerRef.current, portalRef.current, setPortalPosition]);

  useEffect(() => {
    repositionPortal();
    window.addEventListener('resize', repositionPortal);
    window.addEventListener('scroll', repositionPortal);
    return () => {
      window.removeEventListener('resize', repositionPortal);
      window.removeEventListener('scroll', repositionPortal);
    };
  }, [repositionPortal]);

  if (usePortalForMenu && containerRef.current !== null) {
    const { width, x, y } = containerRef.current.getBoundingClientRect();
    return createPortal(
      <PortalSelectContainer
        className="portal-select-menu"
        ref={portalRef}
        small={small}
        large={large}
        width={width}
        xPos={portalPosition[0]}
        yPos={portalPosition[1]}
        inlineSearch={inlineSearch}
      >
        <SelectionMenu {...props} />
      </PortalSelectContainer>,
      document.body
    );
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
  spinnerColor: PropTypes.string,
  usePortalForMenu: PropTypes.bool,
  containerRef: PropTypes.object,
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

const PortalSelectContainer = styled.div.attrs(({ xPos, inlineSearch }) => ({
  style: {
    position: 'absolute',
    left: `${xPos}px`,
    width: `${inlineSearch ? 320 : 170}px`,
  },
}))`
  ${({ theme }) => theme.animation.fade}
  top: ${({ theme, yPos }) => `calc(${yPos}px + ${theme.size.MEDIUM})`};

  ${({ small, yPos, theme }) =>
    small &&
    css`
      top: calc(${yPos}px + ${theme.size.SMALL});
    `};

  ${({ large, yPos, theme }) =>
    large &&
    css`
      top: calc(${yPos}px + ${theme.size.LARGE});
    `};
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
