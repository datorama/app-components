/* eslint react/prop-types: 0 */
import React, { createRef } from 'react';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';
import { find, orderBy, debounce, map, set, get, unionBy } from 'lodash/fp';
import {
  getOptionByValue,
  getOptionsSize,
  getAllOptions,
  hasGroups,
} from './select.utils';

// components
import { ClickOut } from '../ClickOut';
import SelectHeader from './SelectHeader';
import SelectMenu from './SelectMenu';
import { optionsType } from './Select.types';
import InlineSearch from './InlineSearch';
import Fade from '../Fade';
import { CurrentHoveredIndexContext } from './context';

export class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    options: optionsType,
    values: optionsType,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onClose: PropTypes.func,
    placeholder: PropTypes.string,
    sortBy: PropTypes.string,
    sortable: PropTypes.bool,
    multi: PropTypes.bool,
    disabled: PropTypes.bool,
    searchable: PropTypes.bool,
    keepOpen: PropTypes.bool,
    searchBy: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
    debounce: PropTypes.number,
    headerRenderer: PropTypes.func,
    optionRenderer: PropTypes.func,
    optionLabelRenderer: PropTypes.func,
    placeholderRenderer: PropTypes.func,
    noResultsRenderer: PropTypes.func,
    menuRenderer: PropTypes.func,
    maxItems: PropTypes.number,
    closeOnSelect: PropTypes.bool,
    sortDirection: PropTypes.oneOf(['asc', 'desc']),
    searchPlaceholder: PropTypes.string,
    error: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    inlineSearch: PropTypes.bool,
    maxTags: PropTypes.number,
    clearOnClose: PropTypes.bool,
    keepSelected: PropTypes.bool,
    disableSearch: PropTypes.bool,
    spinnerColor: PropTypes.string,
    usePortalForMenu: PropTypes.bool,
    isSingleOptionRemovable: PropTypes.bool,
  };

  state = {
    open: false,
    searchTerm: '',
    localValues: this.props.values,
    currentHoveredOptionValue: null,
    currentHoveredOptionIndex: 0,
    inputFocused: false,
    disableSearch: false,
    isLastValueChangeTriggeredLocally: false,
  };

  containerRef = createRef();

  filteredOptions = [];

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.localValues === prevState.localValues &&
      this.props.values !== prevProps.values
    ) {
      this.setState({ localValues: this.props.values });
    }

    if (this.state.isLastValueChangeTriggeredLocally) {
      this.setState({ isLastValueChangeTriggeredLocally: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  checkString = (searchTerm, str) =>
    str.toString().toLowerCase().includes(searchTerm.toLowerCase());

  filterOptions() {
    const { options, keepSelected, values, disableSearch } = this.props;

    if (hasGroups(options)) {
      return this.filterGroupedOptions();
    }

    const { searchTerm } = this.state;
    const { searchBy, sortable, sortDirection, sortBy } = this.props;

    let sorted = sortable
      ? orderBy([sortBy], [sortDirection], options)
      : options;

    return sorted.filter((option) => {
      if (
        disableSearch ||
        (keepSelected && find((op) => op.value === option.value, values))
      ) {
        return true;
      }

      return searchBy.some((key) => this.checkString(searchTerm, option[key]));
    });
  }

  filterGroupedOptions = () => {
    const { searchTerm } = this.state;
    const {
      searchBy,
      options,
      sortable,
      sortDirection,
      sortBy,
      keepSelected,
      values,
      disableSearch,
    } = this.props;

    const filtered = map((option) => {
      const filteredInnerOption = option.options.filter((op) => {
        if (
          disableSearch ||
          (keepSelected && find((sel) => sel.value === op.value, values))
        ) {
          return true;
        }

        return searchBy.some((key) => this.checkString(searchTerm, op[key]));
      });

      return set('options', filteredInnerOption, option);
    }, options);

    return sortable
      ? this.sortGroupedOptions(filtered, sortBy, sortDirection)
      : filtered;
  };

  sortGroupedOptions = (options, sortBy, sortDirection) => {
    return map((option) => {
      const ordered = orderBy([sortBy], [sortDirection], option.options);

      return set('options', ordered, option);
    }, options);
  };

  toggleOpen = () => {
    const { keepOpen, inlineSearch, clearOnClose } = this.props;
    const { open } = this.state;

    if (keepOpen && open) {
      return;
    }

    this.setState(
      (prevState) => ({
        open: !prevState.open,
        searchTerm: !prevState.open && clearOnClose ? '' : prevState.searchTerm,
      }),
      () => {
        const { open, currentHoveredOptionValue } = this.state;
        const { onOpen, onClose } = this.props;

        if (open) {
          window.addEventListener('keydown', this.handleKeyDown);

          const allOptions = getAllOptions(this.filteredOptions);

          const currentHoveredOptionIndex = allOptions.findIndex(
            (option) => option.value === currentHoveredOptionValue
          );

          this.setState({ currentHoveredOptionIndex });

          if (onOpen) {
            onOpen();
          }
        }

        if (!open) {
          window.removeEventListener('keydown', this.handleKeyDown);

          if (inlineSearch) {
            setTimeout(() => {
              if (clearOnClose) {
                this.setState({ searchTerm: '' });
              }
            }, 300);
          }

          if (onClose) {
            onClose();
          }
        }
      }
    );
  };

  handleKeyDown = (event) => {
    const { key } = event;
    const { multi, searchable } = this.props;
    const { searchTerm, inputFocused, localValues } = this.state;

    switch (key) {
      case 'Escape':
        return this.toggleOpen();

      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.handleVerticalArrowsClick(key);
        break;

      case 'Enter':
        const option = getOptionByValue(
          this.filteredOptions,
          this.state.currentHoveredOptionValue
        );
        option && this.onSelect(option);
        break;

      case 'Backspace':
        if (
          searchTerm === '' &&
          searchable &&
          multi &&
          inputFocused &&
          localValues.length
        ) {
          const filtered = [...localValues];

          filtered.pop();
          this.applyChanges(filtered);
        }
        break;

      default:
        break;
    }
  };

  handleVerticalArrowsClick = (key) => {
    const { currentHoveredOptionValue } = this.state;

    const allOptions = getAllOptions(this.filteredOptions);

    const currentIndex = allOptions.findIndex(
      (option) => option.value === currentHoveredOptionValue
    );

    if (key === 'ArrowDown') {
      this.setNextOptionValue({
        allOptions,
        currentIndex,
      });
    }
    // ArrowUp
    else {
      this.setPrevOptionValue({
        allOptions,
        currentIndex,
      });
    }
  };

  setNextOptionValue = ({ allOptions, currentIndex }) => {
    if (currentIndex === allOptions.length - 1) {
      this.setState({
        currentHoveredOptionValue: get([0, 'value'], allOptions) || null,
        currentHoveredOptionIndex: 0,
      });
    } else {
      this.setState({
        currentHoveredOptionValue: get(
          [(currentIndex + 1) % allOptions.length, 'value'],
          allOptions
        ),
        currentHoveredOptionIndex: currentIndex + 1,
      });
    }
  };

  setPrevOptionValue = ({ allOptions, currentIndex }) => {
    if (currentIndex > 0) {
      this.setState({
        currentHoveredOptionValue: get([currentIndex - 1, 'value'], allOptions),
        currentHoveredOptionIndex: currentIndex - 1,
      });
    } else {
      this.setState({
        currentHoveredOptionValue: get(
          [allOptions.length - 1, 'value'],
          allOptions
        ),
        currentHoveredOptionIndex: allOptions.length - 1,
      });
    }
  };

  handleClickOut = () => {
    const { open } = this.state;

    if (open) {
      this.toggleOpen();
    }
  };

  onClearSelect = (event) => {
    event.stopPropagation();

    this.applyChanges(
      [],
      {
        currentHoveredOptionValue: null,
        currentHoveredOptionIndex: 0,
      },
      true
    );
  };

  onSelect = (option) => {
    this.setState({ isLastValueChangeTriggeredLocally: true });
    const { multi } = this.props;
    const { localValues } = this.state;

    let result = [];
    if (!multi) {
      result = [option];
    } else {
      if (find((op) => op.value === option.value, localValues)) {
        result = localValues.filter((op) => op.value !== option.value);
      } else {
        result = [...localValues, option];
      }
    }

    const allOptions = getAllOptions(this.filteredOptions);
    const currentHoveredOptionIndex = allOptions.findIndex(
      (op) => op.value === option.value
    );

    this.applyChanges(result, {
      currentHoveredOptionValue: option.value,
      currentHoveredOptionIndex,
    });
  };

  selectAll = (isDeselect) => {
    const { options } = this.props;
    const { localValues } = this.state;
    const optionsSize = getOptionsSize(options);
    const isFilteringUsed = this.filteredOptions.length < optionsSize;

    let result = [];

    if (isDeselect) {
      if (isFilteringUsed) {
        result = localValues.filter((selection) =>
          this.filteredOptions.every(
            (option) => option.value !== selection.value
          )
        );
      } else {
        result = [];
      }
    } else {
      result = getAllOptions(
        unionBy((item) => item.value, this.filteredOptions, localValues)
      );
    }

    this.applyChanges(result);
  };

  onSearch = (e) =>
    this.setState({
      searchTerm: e.target.value,
      currentHoveredOptionValue: null,
      currentHoveredOptionIndex: 0,
    });

  debouncedOnChange = debounce(this.props.debounce, (values) => {
    const { onChange, options } = this.props;
    const allSelected = values.length === getOptionsSize(options);

    onChange(values, allSelected);
  });

  applyChanges(values, extend, avoidToggle) {
    const { closeOnSelect, multi } = this.props;

    this.setState({ localValues: values, ...extend }, () => {
      this.debouncedOnChange(values);
      if (!multi && closeOnSelect && !avoidToggle) {
        this.toggleOpen();
      }
    });
  }

  toggleFocus = () =>
    this.setState((prevState) => ({ inputFocused: !prevState.inputFocused }));

  getOptions = () => {
    this.filteredOptions = this.filterOptions();

    return this.filteredOptions;
  };

  render() {
    const {
      options,
      className,
      disabled,
      searchable,
      placeholder,
      headerRenderer,
      optionRenderer,
      optionLabelRenderer,
      multi,
      placeholderRenderer,
      menuRenderer,
      loading,
      maxItems,
      searchPlaceholder,
      error,
      small,
      large,
      inlineSearch,
      maxTags,
      onKeyDown,
      onKeyUp,
      spinnerColor,
      noResultsRenderer,
      usePortalForMenu,
      isSingleOptionRemovable,
    } = this.props;
    const {
      open,
      searchTerm,
      localValues,
      currentHoveredOptionValue,
      currentHoveredOptionIndex,
      isLastValueChangeTriggeredLocally,
    } = this.state;

    return (
      <ClickOut onClick={this.handleClickOut} className={className}>
        <Container
          ref={this.containerRef}
          disabled={disabled}
          className={className}
        >
          {!inlineSearch && (
            <SelectHeader
              open={open}
              placeholder={placeholder}
              values={localValues}
              options={options}
              headerRenderer={headerRenderer}
              toggleOpen={this.toggleOpen}
              placeholderRenderer={placeholderRenderer}
              loading={loading}
              error={error}
              small={small}
              large={large}
              searchable={searchable}
              inlineSearch={inlineSearch}
              onClearSelect={this.onClearSelect}
              isSingleOptionRemovable={isSingleOptionRemovable}
            />
          )}

          {inlineSearch && (
            <InlineSearch
              values={localValues}
              open={open}
              placeholder={placeholder}
              toggleOpen={this.toggleOpen}
              error={error}
              small={small}
              large={large}
              onSearch={this.onSearch}
              value={searchTerm}
              maxTags={maxTags}
              onSelect={this.onSelect}
              loading={loading}
              toggleFocus={this.toggleFocus}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              isLastValueChangeTriggeredLocally={
                isLastValueChangeTriggeredLocally
              }
            />
          )}

          <StyledFade show={open}>
            <CurrentHoveredIndexContext.Provider
              value={currentHoveredOptionIndex}
            >
              <SelectMenu
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                open={open}
                searchable={searchable}
                onSearch={this.onSearch}
                getOptions={this.getOptions}
                total={getOptionsSize(options)}
                values={localValues}
                multi={multi}
                selectAll={this.selectAll}
                optionRenderer={optionRenderer}
                onSelect={this.onSelect}
                menuRenderer={menuRenderer}
                searchTerm={searchTerm}
                maxItems={maxItems}
                searchPlaceholder={searchPlaceholder}
                optionLabelRenderer={optionLabelRenderer}
                small={small}
                large={large}
                inlineSearch={inlineSearch}
                currentHoveredOptionValue={currentHoveredOptionValue}
                toggleFocus={this.toggleFocus}
                toggleOpen={this.toggleOpen}
                loading={loading}
                spinnerColor={spinnerColor}
                noResultsRenderer={noResultsRenderer}
                usePortalForMenu={usePortalForMenu}
                containerRef={this.containerRef}
              />
            </CurrentHoveredIndexContext.Provider>
          </StyledFade>
        </Container>
      </ClickOut>
    );
  }
}

Select.defaultProps = {
  maxItems: 5,
  sortable: true,
  multi: false,
  searchable: false,
  sortBy: 'label',
  searchBy: ['label'],
  sortDirection: 'asc',
  closeOnSelect: true, // apply only for single select
  debounce: 0,
  maxTags: 999,
  clearOnClose: true,
  usePortalForMenu: false,
  isSingleOptionRemovable: false,
};

const Container = styled.div`
  position: relative;

  * {
    line-height: normal;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`;

const StyledFade = styled(Fade)`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 2;
  width: 100%;
  min-height: 20px;
  max-height: ${({ maxHeight }) => maxHeight};
`;
