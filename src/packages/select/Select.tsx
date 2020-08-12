import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { find, orderBy, debounce, map, set, get, isString } from "lodash/fp";

import SelectHeader from "packages/select/SelectHeader";
import SelectMenu from "packages/select/SelectMenu";
import InlineSearch from "packages/select/InlineSearch";
import Fade from "packages/core/Utils/Fade";
import ClickOut from "packages/core/Utils/ClickOut";

import {
  getOptionByValue,
  getOptionsSize,
  getAllOptions,
  hasGroups,
} from "packages/select/utils";

import {
  GroupOptionType,
  OptionType,
  SelectProps,
} from "packages/select/types";

export const CurrentHoveredIndexContext = React.createContext<number>(0);

interface SelectState {
  isOpen: boolean;
  searchTerm: string;
  localValues: OptionType[];
  currentHoveredOptionValue: (string | number) | null;
  currentHoveredOptionIndex: number;
  isInputFocused: boolean;
  isDisableSearch: boolean;
}

class Select extends React.Component<SelectProps, SelectState> {
  static defaultProps = {
    maxItems: 5,
    isSortable: true,
    isMulti: false,
    isSearchable: false,
    sortBy: "label",
    searchBy: ["label"],
    sortDirection: "asc",
    closeOnSelect: true,
    debounce: 0,
    maxTags: 999,
    isClearOnClose: true,
  };

  state: SelectState = {
    isOpen: false,
    searchTerm: "",
    localValues: this.props.values,
    currentHoveredOptionValue: null,
    currentHoveredOptionIndex: 0,
    isInputFocused: false,
    isDisableSearch: false,
  };

  filteredOptions: OptionType[] = [];

  componentDidUpdate(prevProps: SelectProps, prevState: SelectState) {
    if (
      this.state.localValues === prevState.localValues &&
      this.props.values !== prevProps.values
    ) {
      this.setState({ localValues: this.props.values });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  checkString = (searchTerm: string, str?: any) =>
    isString(str) &&
    str.toString().toLowerCase().includes(searchTerm.toLowerCase());

  filterOptions() {
    const { options, isKeepSelected, values, isDisableSearch } = this.props;

    if (hasGroups(options)) {
      return this.filterGroupedOptions();
    }

    const { searchTerm } = this.state;
    const {
      searchBy = ["label"],
      isSortable,
      sortDirection = "asc",
      sortBy,
    } = this.props;

    const sorted = isSortable
      ? orderBy([sortBy], [sortDirection], options)
      : options;

    return sorted.filter((option) => {
      if (
        isDisableSearch ||
        (isKeepSelected &&
          find({ value: (option as OptionType).value }, values))
      ) {
        return true;
      }

      return searchBy.some((key: string) =>
        // @ts-ignore
        this.checkString(searchTerm, option[key])
      );
    });
  }

  filterGroupedOptions = () => {
    const { searchTerm } = this.state;
    const {
      searchBy = ["label"],
      options,
      isSortable,
      sortDirection = "asc",
      sortBy = "label",
      isKeepSelected,
      values,
      isDisableSearch,
    } = this.props;

    const filtered = map((option) => {
      const filteredInnerOption = option.options.filter((op) => {
        if (
          isDisableSearch ||
          (isKeepSelected && find((sel) => sel.value === op.value, values))
        ) {
          return true;
        }

        // @ts-ignore
        return searchBy.some((key) => this.checkString(searchTerm, op[key]));
      });

      return set("options", filteredInnerOption, option);
    }, options as GroupOptionType[]);

    return isSortable
      ? this.sortGroupedOptions(filtered, sortBy, sortDirection)
      : filtered;
  };

  sortGroupedOptions = (
    options: GroupOptionType[],
    sortBy: string,
    sortDirection: "asc" | "desc"
  ) => {
    return map((option) => {
      const ordered = orderBy([sortBy], [sortDirection], option.options);

      return set("options", ordered, option);
    }, options);
  };

  toggleOpen = () => {
    const { isKeepOpen, isInlineSearch, isClearOnClose } = this.props;
    const { isOpen } = this.state;

    if (isKeepOpen && isOpen) {
      return;
    }

    this.setState(
      (prevState) => ({
        isOpen: !prevState.isOpen,
        searchTerm:
          !prevState.isOpen && isClearOnClose ? "" : prevState.searchTerm,
      }),
      () => {
        const { isOpen, currentHoveredOptionValue } = this.state;
        const { onOpen, onClose } = this.props;

        if (isOpen) {
          window.addEventListener("keydown", this.handleKeyDown);

          const allOptions = getAllOptions(this.filteredOptions);

          const currentHoveredOptionIndex = allOptions.findIndex(
            (option) => option.value === currentHoveredOptionValue
          );

          this.setState({ currentHoveredOptionIndex });

          if (onOpen) {
            onOpen();
          }
        }

        if (!isOpen) {
          window.removeEventListener("keydown", this.handleKeyDown);

          if (isInlineSearch) {
            setTimeout(() => {
              if (isClearOnClose) {
                this.setState({ searchTerm: "" });
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

  handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    const { isMulti, isSearchable } = this.props;
    const { searchTerm, isInputFocused, localValues } = this.state;

    switch (key) {
      case "Escape":
        return this.toggleOpen();

      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        this.handleVerticalArrowsClick(key);
        break;

      case "Enter":
        const option = getOptionByValue(
          this.filteredOptions,
          this.state.currentHoveredOptionValue
        );
        option && this.onSelect(option);
        break;

      case "Backspace":
        if (
          searchTerm === "" &&
          isSearchable &&
          isMulti &&
          isInputFocused &&
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

  handleVerticalArrowsClick = (key: "ArrowDown" | "ArrowUp") => {
    const { currentHoveredOptionValue } = this.state;

    const allOptions = getAllOptions(this.filteredOptions);

    const currentIndex = allOptions.findIndex(
      (option) => option.value === currentHoveredOptionValue
    );

    if (key === "ArrowDown") {
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

  setNextOptionValue = ({
    allOptions,
    currentIndex,
  }: {
    allOptions: OptionType[];
    currentIndex: number;
  }) => {
    if (currentIndex === allOptions.length - 1) {
      this.setState({
        currentHoveredOptionValue: get([0, "value"], allOptions) || null,
        currentHoveredOptionIndex: 0,
      });
    } else {
      this.setState({
        currentHoveredOptionValue: get(
          [(currentIndex + 1) % allOptions.length, "value"],
          allOptions
        ),
        currentHoveredOptionIndex: currentIndex + 1,
      });
    }
  };

  setPrevOptionValue = ({
    allOptions,
    currentIndex,
  }: {
    allOptions: OptionType[];
    currentIndex: number;
  }) => {
    if (currentIndex > 0) {
      this.setState({
        currentHoveredOptionValue: get([currentIndex - 1, "value"], allOptions),
        currentHoveredOptionIndex: currentIndex - 1,
      });
    } else {
      this.setState({
        currentHoveredOptionValue: get(
          [allOptions.length - 1, "value"],
          allOptions
        ),
        currentHoveredOptionIndex: allOptions.length - 1,
      });
    }
  };

  handleClickOut = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      this.toggleOpen();
    }
  };

  onSelect = (option: OptionType) => {
    const { isMulti } = this.props;
    const { localValues } = this.state;

    let result = [];

    if (!isMulti) {
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

  selectAll = () => {
    const { options } = this.props;
    const { localValues } = this.state;

    let result = [];
    if (!localValues.length || localValues.length > getOptionsSize(options)) {
      result = getAllOptions(options);
    }

    this.applyChanges(result);
  };

  onSearch = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      searchTerm: event.target.value,
      currentHoveredOptionValue: null,
      currentHoveredOptionIndex: 0,
    });

  // @ts-ignore
  debouncedOnChange = debounce(this.props.debounce, (values) => {
    const { onChange, options } = this.props;
    const isAllSelected = values.length === getOptionsSize(options);

    onChange(values, isAllSelected);
  });

  applyChanges(values: OptionType[], extend?: any) {
    const { closeOnSelect, isMulti } = this.props;

    this.setState({ localValues: values, ...extend }, () => {
      // @ts-ignore
      this.debouncedOnChange(values);

      if (!isMulti && closeOnSelect) {
        this.toggleOpen();
      }
    });
  }

  toggleFocus = () =>
    this.setState((prevState: SelectState) => ({
      isInputFocused: !prevState.isInputFocused,
    }));

  getOptions = () => this.filterOptions();

  render() {
    const {
      options,
      className,
      isDisabled,
      isSearchable,
      placeholder,
      headerRenderer,
      optionRenderer,
      optionLabelRenderer,
      isMulti,
      placeholderRenderer,
      menuRenderer,
      isLoading,
      maxItems,
      searchPlaceholder,
      isError,
      isSmall,
      isLarge,
      isInlineSearch,
      maxTags,
      onKeyDown,
      onKeyUp,
      spinnerColor,
      noResultsRenderer,
    } = this.props;
    const {
      isOpen,
      searchTerm,
      localValues,
      currentHoveredOptionValue,
      currentHoveredOptionIndex,
    } = this.state;

    return (
      <ClickOut onClick={this.handleClickOut} className={className}>
        <Container isDisabled={isDisabled} className={className}>
          {!isInlineSearch ? (
            <SelectHeader
              isOpen={isOpen}
              placeholder={placeholder}
              values={localValues}
              options={options}
              headerRenderer={headerRenderer}
              toggleOpen={this.toggleOpen}
              placeholderRenderer={placeholderRenderer}
              isLoading={isLoading}
              isError={isError}
              isSmall={isSmall}
              isLarge={isLarge}
              isSearchable={isSearchable}
            />
          ) : null}

          {isInlineSearch ? (
            <InlineSearch
              values={localValues}
              isOpen={isOpen}
              placeholder={placeholder}
              toggleOpen={this.toggleOpen}
              isError={isError}
              isSmall={isSmall}
              isLarge={isLarge}
              onSearch={this.onSearch}
              value={searchTerm}
              maxTags={maxTags}
              onSelect={this.onSelect}
              toggleFocus={this.toggleFocus}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            />
          ) : null}

          <StyledFade isVisible={isOpen}>
            <CurrentHoveredIndexContext.Provider
              value={currentHoveredOptionIndex}
            >
              <SelectMenu
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                isOpen={isOpen}
                isSearchable={isSearchable}
                onSearch={this.onSearch}
                // @ts-ignore
                getOptions={this.getOptions}
                total={getOptionsSize(options)}
                values={localValues}
                isMulti={isMulti}
                selectAll={this.selectAll}
                optionRenderer={optionRenderer}
                onSelect={this.onSelect}
                menuRenderer={menuRenderer}
                searchTerm={searchTerm}
                maxItems={maxItems}
                searchPlaceholder={searchPlaceholder}
                optionLabelRenderer={optionLabelRenderer}
                isSmall={isSmall}
                isLarge={isLarge}
                isInlineSearch={isInlineSearch}
                currentHoveredOptionValue={currentHoveredOptionValue}
                toggleFocus={this.toggleFocus}
                toggleOpen={this.toggleOpen}
                isLoading={isLoading}
                spinnerColor={spinnerColor}
                noResultsRenderer={noResultsRenderer}
              />
            </CurrentHoveredIndexContext.Provider>
          </StyledFade>
        </Container>
      </ClickOut>
    );
  }
}

const Container = styled.div<{ isDisabled?: boolean }>`
  position: relative;

  * {
    line-height: normal;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`;

const StyledFade = styled(Fade)<{ maxHeight?: string }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 2;
  width: 100%;
  min-height: 20px;
  max-height: ${({ maxHeight }) => maxHeight};
`;

export default Select;
