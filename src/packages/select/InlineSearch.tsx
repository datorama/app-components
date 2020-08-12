import React, { ChangeEvent, Component } from "react";
import styled, { css } from "styled-components";
import { map } from "lodash/fp";

import { OptionType, GroupOptionType } from "packages/select/types";
import { Arrow } from "packages/select/SelectHeader";

// @ts-ignore
const mapWithIndex = map.convert({ cap: false });

interface InlineSearchProps {
  values: OptionType[] | GroupOptionType[];
  placeholder?: string;
  toggleOpen: () => void;
  isError?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
  isOpen?: boolean;
  value: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  maxTags: number;
  onSelect: (option: OptionType) => void;
  toggleFocus?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
}

class InlineSearch extends Component<InlineSearchProps, {}> {
  inputElement: HTMLInputElement | undefined;

  componentDidUpdate(prevProps: InlineSearchProps) {
    if (this.props.values !== prevProps.values) {
      this.focus();
    }
  }

  handleRef = (inputElement: HTMLInputElement) => {
    if (inputElement) {
      this.inputElement = inputElement;
    }
  };

  focus() {
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }

  handleClick = () => {
    this.props.toggleOpen();
    this.focus();
  };

  handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { isOpen, toggleOpen } = this.props;

    if (!isOpen) {
      toggleOpen();
    }

    this.props.onSearch(event);
  };

  render() {
    const { isSmall, onKeyDown, onKeyUp } = this.props;
    const tags = [];

    mapWithIndex((option: OptionType, index: number) => {
      if (index < this.props.maxTags) {
        tags.push(
          <SmallTag key={`isSmall-tag-${option.value}`}>
            <SmallTagLabel isSmall={isSmall}>{option.label}</SmallTagLabel>
            <CloseIcon onClick={() => this.props.onSelect(option)} />
          </SmallTag>
        );
      }
    }, this.props.values);

    if (this.props.values.length > this.props.maxTags) {
      tags.push(
        <SmallTag key="extra-tags" tagType="info">
          <SmallTagLabel isSmall={isSmall}>
            +{this.props.values.length - this.props.maxTags}
          </SmallTagLabel>
        </SmallTag>
      );
    }

    return (
      <Container
        onClick={this.handleClick}
        isError={this.props.isError}
        isSmall={this.props.isSmall}
        isLarge={this.props.isLarge}
        className={`inline-container ${
          this.props.isOpen ? "isOpen" : "closed"
        }`}
        isOpen={this.props.isOpen}
      >
        <Inner>
          {tags}
          <SmallInput
            onChange={this.handleInput}
            value={this.props.value}
            placeholder={this.props.placeholder || "Search"}
            ref={this.handleRef}
            isSmall={this.props.isSmall}
            onFocus={this.props.toggleFocus}
            onBlur={this.props.toggleFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
          />
        </Inner>
        <StyledArrow rotation={this.props.isOpen ? "180deg" : "0deg"} />
      </Container>
    );
  }
}

const Container = styled.div<{
  isError?: boolean;
  isOpen?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
  isDisabled?: boolean;
}>`
  cursor: pointer;
  width: 320px;
  min-height: ${({ theme }) => theme.size.MEDIUM};
  box-sizing: border-box;
  padding: 0 4px;
  border: 1px solid
    ${({ isError, theme }) => (isError ? theme.r400 : theme.p200)};
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;
  user-select: none;

  ${({ isOpen, theme, isError }) =>
    isOpen &&
    css`
      border-color: ${isError ? theme.r400 : theme.a400};
    `};

  ${({ isSmall, theme }) =>
    isSmall &&
    css`
      height: ${theme.size.SMALL};
      ${theme.text.sm};
    `};

  ${({ isLarge, theme }) =>
    isLarge &&
    css`
      height: ${theme.size.LARGE};
    `};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `};
`;

const Inner = styled.div`
  width: calc(100% - 15px);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px 0 0;
  flex-wrap: wrap;
`;

const SmallTag = styled.div<{
  tagType?: "info";
  padding?: string;
}>`
  padding: ${({ padding }) => padding || "0 18px 0 4px"};
  background: ${({ theme }) => theme.a400};
  cursor: pointer;
  border-radius: 2px;
  margin: 2px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;

  ${({ tagType }) =>
    tagType === "info" &&
    css`
      padding: 0 4px;
      pointer-events: none;
    `};

  &:hover {
    background: ${({ theme }) => theme.a500};
  }
`;

const SmallTagLabel = styled.div<{ isSmall?: boolean }>`
  ${({ theme }) => theme.text.sm};
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60px;
  padding: 2px;

  ${({ isSmall }) =>
    isSmall &&
    css`
      font-size: 12px;
    `};
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 4px;
  top: 7px;
  width: 8px;
  height: 8px;
  margin-left: 4px;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #fff;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 2px;
  }
`;

const SmallInput = styled.input<{ isSmall?: boolean }>`
  border: none;
  width: 40px;
  height: 24px;
  background: transparent;
  color: ${({ theme }) => theme.p600};
  ${({ theme }) => theme.text.sm};
  font-size: 14px;
  flex: 1;
  box-sizing: border-box;
  padding: 0 4px;

  ${({ isSmall }) =>
    isSmall &&
    css`
      font-size: 12px;
    `};

  &::placeholder {
    color: ${({ theme }) => theme.p300};
  }
`;

const StyledArrow = styled(Arrow)`
  margin-right: 12px;
`;

export default InlineSearch;
