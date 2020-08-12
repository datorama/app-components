import React, { ReactNode, ReactText } from "react";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash/fp";

import { Label } from "packages/select/common";
import SelectSpinner from "packages/select/SelectSpinner";
import ArrowDown from "packages/core/Icons/ArrowDown";

import { getOptionsSize } from "packages/select/utils";

import { SelectProps } from "packages/select/types";

interface SelectHeader extends Omit<SelectProps, "onChange" | "maxTags"> {
  isOpen: boolean;
  toggleOpen: () => void;
}

const SelectHeader = (props: SelectHeader) => {
  const {
    isOpen,
    placeholder = "",
    values,
    options,
    headerRenderer,
    toggleOpen,
    placeholderRenderer,
    isLoading,
    isError,
    isSmall,
    isLarge,
    isSearchable,
  } = props;

  if (headerRenderer) {
    return headerRenderer({ values, placeholder, options, isOpen, toggleOpen });
  }

  let label: ReactText | ReactNode = placeholder;
  const optionsSize = getOptionsSize(options);

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
  }

  if (placeholderRenderer) {
    const customLabel = placeholderRenderer({
      label: label as string,
      isAllSelected: optionsSize === values.length && values.length > 1,
      numOFSelected: values.length,
      total: optionsSize,
    });

    if (!isEmpty(customLabel)) {
      label = customLabel;
    }
  }

  const headerLoading = !isSearchable && isLoading;

  return (
    <Container
      onClick={toggleOpen}
      isOpen={isOpen}
      className={`header ${isOpen ? "isOpen" : "closed"}`}
      isError={isError}
      isSmall={isSmall}
      isLarge={isLarge}
      isDisabled={headerLoading}
    >
      <LabelWrapper>
        <Label isSmall={isSmall}>{label}</Label>
      </LabelWrapper>

      {!headerLoading && <Arrow rotation={isOpen ? "180deg" : "0deg"} />}
      {headerLoading && <StyledSelectSpinner />}
    </Container>
  );
};

const LabelWrapper = styled.div`
  width: calc(100% - 15px);
`;

const Container = styled.div<{
  isError?: boolean;
  isDisabled?: boolean;
  isOpen?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
}>`
  cursor: pointer;
  width: 170px;
  height: ${({ theme }) => theme.size.MEDIUM};
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid
    ${({ isError, theme }) => (isError ? theme.r400 : theme.p200)};
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;
  user-select: none;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `};

  ${({ isOpen, theme, isError }) =>
    isOpen &&
    css`
      border-color: ${isError ? theme.r400 : theme.a400};
    `};

  ${({ isSmall, theme }) =>
    isSmall &&
    css`
      height: ${theme.size.SMALL};
    `};

  ${({ isLarge, theme }) =>
    isLarge &&
    css`
      height: ${theme.size.LARGE};
    `};
`;

export const Arrow = styled(ArrowDown)<{ rotation: string }>`
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

export default SelectHeader;
