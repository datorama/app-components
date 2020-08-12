import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";

// icons
import Search from "packages/core/Icons/Search";

interface SelectSearch {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  searchPlaceholder?: string;
  isSmall?: boolean;
  isLarge?: boolean;
  toggleFocus?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
}

const SelectSearch = (props: SelectSearch) => (
  <Container className="menu-search-container">
    <Input
      placeholder={props.searchPlaceholder || "Search"}
      onChange={props.onChange}
      value={props.value}
      isSmall={props.isSmall}
      isLarge={props.isLarge}
      onFocus={props.toggleFocus}
      onBlur={props.toggleFocus}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      className="menu-search-input"
    />
    <StyledSearchIcon className="menu-search-icon" />
  </Container>
);

export default SelectSearch;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<SelectSearch>`
  width: calc(100% - 20px);
  margin: 10px 10px 0 10px;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 30px 0 10px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid ${({ theme }) => theme.p200};
  height: ${({ theme }) => theme.size.MEDIUM};
  background: ${({ theme }) => theme.p0};

  ${({ theme, isSmall }) =>
    isSmall &&
    css`
      height: ${theme.size.SMALL};
      ${theme.text.sm};
    `};

  ${({ theme, isLarge }) =>
    isLarge &&
    css`
      height: ${theme.size.LARGE};
    `};

  color: ${({ theme }) => theme.p500};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.a400};
  }

  &::placeholder {
    color: ${({ theme }) => theme.p300};
  }
`;

const StyledSearchIcon = styled(Search)`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 15px;
  top: calc(50% - 4px);
`;
