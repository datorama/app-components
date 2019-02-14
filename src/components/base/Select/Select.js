import React from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import { find, orderBy, debounce } from 'lodash/fp';

// components
import ClickOut from '../ClickOut';
import SelectHeader from './SelectHeader';
import SelectMenu from './SelectMenu';
import { optionsType } from './Select.types';

export default class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    options: optionsType,
    values: optionsType,
    onChange: PropTypes.func,
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
    menuRenderer: PropTypes.func,
    maxItems: PropTypes.number,
    closeOnSelect: PropTypes.bool,
    sortDirection: PropTypes.oneOf(['asc', 'desc']),
    searchPlaceholder: PropTypes.string,
    error: PropTypes.bool
  };

  state = {
    open: false,
    searchTerm: '',
    localValues: this.props.values
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.localValues === prevState.localValues &&
      this.props.values !== prevProps.values
    ) {
      this.setState({ localValues: this.props.values });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  checkString = (searchTerm, str) =>
    str
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  filterOptions() {
    const { searchTerm } = this.state;
    const { searchBy, options, sortable, sortDirection, sortBy } = this.props;

    let sorted = sortable ? orderBy(sortDirection, sortBy, options) : options;

    return sorted.filter(option =>
      searchBy.some(key => this.checkString(searchTerm, option[key]))
    );
  }

  toggleOpen = () => {
    const { keepOpen } = this.props;
    const { open } = this.state;

    if (keepOpen && open) {
      return;
    }

    this.setState(
      prevState => ({
        open: !prevState.open,
        searchTerm: !prevState.open ? '' : prevState.searchTerm
      }),
      () => {
        const { open } = this.state;
        const { onOpen, onClose } = this.props;

        if (open) {
          window.addEventListener('keydown', this.handleKeyDown);

          if (onOpen) {
            onOpen();
          }
        }

        if (!open) {
          window.removeEventListener('keydown', this.handleKeyDown);

          if (onClose) {
            onClose();
          }
        }
      }
    );
  };

  handleKeyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
        this.toggleOpen();
        break;

      default:
        break;
    }
  };

  handleClickOut = () => {
    const { open } = this.state;

    if (open) {
      this.toggleOpen();
    }
  };

  onSelect = option => () => {
    const { multi } = this.props;
    const { localValues } = this.state;

    let result = [];
    if (!multi) {
      result = [option];
    } else {
      if (find(op => op.value === option.value, localValues)) {
        result = localValues.filter(op => op.value !== option.value);
      } else {
        result = [...localValues, option];
      }
    }

    this.applyChanges(result);
  };

  selectAll = () => {
    const { options } = this.props;
    const { localValues } = this.state;

    let result = [];
    if (!localValues.length || localValues.length > options.length) {
      result = [...options];
    }

    this.applyChanges(result);
  };

  onSearch = e => this.setState({ searchTerm: e.target.value });

  debouncedOnChange = debounce(this.props.debounce, values =>
    this.props.onChange(values)
  );

  applyChanges(values) {
    const { closeOnSelect, multi } = this.props;

    this.setState({ localValues: values }, () => {
      this.debouncedOnChange(values);

      if (!multi && closeOnSelect) {
        this.toggleOpen();
      }
    });
  }

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
      error
    } = this.props;
    const { open, searchTerm, localValues } = this.state;
    const filteredOptions = this.filterOptions();

    return (
      <ClickOut onClick={this.handleClickOut} className={className}>
        <Container disabled={disabled} className={className}>
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
          />

          <SelectMenu
            open={open}
            searchable={searchable}
            onSearch={this.onSearch}
            options={filteredOptions}
            total={options.length}
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
          />
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
  debounce: 0
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

export const Option = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  transition: all 300ms;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 10px;
  background: ${({ selected, theme }) =>
    selected ? theme.a100 : 'transparent'};
  margin: ${({ margin }) => margin || 0};

  &:hover {
    background: ${({ theme }) => theme.a200};
  }
`;

export const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  transition: all 300ms;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign || 'left'};
`;
