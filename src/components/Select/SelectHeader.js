import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash/fp';
import * as PropTypes from 'prop-types';
import { getOptionsSize } from './select.utils';

// components
import { Label } from './Select.common';
import SelectSpinner from './SelectSpinner';
import { optionsType } from './Select.types';

// icons
import ArrowDown from '../../assets/ArrowDown.icon';
import Close from '../../assets/Close.icon';

const SelectHeader = (props) => {
  const {
    open,
    placeholder,
    values,
    options,
    headerRenderer,
    toggleOpen,
    placeholderRenderer,
    loading,
    error,
    small,
    large,
    searchable,
    inlineSearch,
    onClearSelect,
    isSingleOptionRemovable,
  } = props;

  if (headerRenderer) {
    return headerRenderer({ values, placeholder, options, open, toggleOpen });
  }

  let label = placeholder;
  const optionsSize = getOptionsSize(options);
  let isLabelPlaceholder = false;

  if (values.length <= optionsSize) {
    label = `${values.length} selected`;
  }

  if (values.length === 1) {
    const option = values[0];

    label = option.label;
  }

  if (optionsSize === values.length && values.length > 1) {
    label = `Select all (${optionsSize})`;
  }

  if (!values.length) {
    label = placeholder;
    isLabelPlaceholder = true;
  }

  if (placeholderRenderer) {
    const customLabel = placeholderRenderer({
      label,
      allSelected: optionsSize === values.length && values.length > 1,
      selected: values.length,
      total: optionsSize,
    });

    if (!isEmpty(customLabel)) {
      label = customLabel;
      isLabelPlaceholder = true;
    }
  }

  const headerLoading = !searchable && loading;

  const icon = useMemo(() => {
    if (headerLoading) {
      return <StyledSelectSpinner />;
    }

    if (values.length > 0 && isSingleOptionRemovable && !inlineSearch) {
      return <RemoveIcon onClick={onClearSelect} className="remove-icon" />;
    }

    return <Arrow rotation={open ? '180deg' : '0deg'} />;
  }, [
    values.length,
    headerLoading,
    inlineSearch,
    isSingleOptionRemovable,
    open,
    onClearSelect,
  ]);

  return (
    <Container
      onClick={toggleOpen}
      open={open}
      className={`header ${open ? 'open' : 'closed'}`}
      title={label}
      error={error}
      small={small}
      large={large}
      disabled={headerLoading}
    >
      <LabelWrapper>
        <Label
          small={small}
          large={large}
          className={isLabelPlaceholder ? 'placeholder' : ''}
        >
          {label}
        </Label>
      </LabelWrapper>

      {icon}
    </Container>
  );
};

SelectHeader.propTypes = {
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  values: optionsType,
  options: optionsType,
  headerRenderer: PropTypes.func,
  toggleOpen: PropTypes.func,
  placeholderRenderer: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  searchable: PropTypes.bool,
  inlineSearch: PropTypes.bool,
  onClearSelect: PropTypes.func,
  isSingleOptionRemovable: PropTypes.bool,
};

export default SelectHeader;

const LabelWrapper = styled.div`
  width: calc(100% - 15px);
  .placeholder {
    color: ${({ theme }) => theme.p300};
  }
`;

const RemoveIcon = styled(Close)`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0px;
  top: 6px;
`;

const Container = styled.div`
  cursor: pointer;
  width: 170px;
  height: ${({ theme }) => theme.size.MEDIUM};
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid ${({ error, theme }) => (error ? theme.r400 : theme.p200)};
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;
  user-select: none;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `};

  ${({ open, theme, error }) =>
    open &&
    css`
      border-color: ${error ? theme.r400 : theme.a400};
    `};

  ${({ small, theme }) =>
    small &&
    css`
      height: ${theme.size.SMALL};
    `};

  ${({ large, theme }) =>
    large &&
    css`
      height: ${theme.size.LARGE};
    `};
`;

export const Arrow = styled(ArrowDown)`
  width: 10px;
  height: 10px;
  transform: rotate(${({ rotation }) => rotation});
  transition: all 300ms;
  * {
    fill: ${({ theme }) => theme.p600};
  }
`;

const StyledSelectSpinner = styled(SelectSpinner)`
  margin-right: 2px;
`;
