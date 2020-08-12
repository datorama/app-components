import React, { useRef, useMemo, useContext, ReactElement } from "react";
import styled, { withTheme } from "styled-components";
import { find, isEmpty, get, map } from "lodash/fp";

import Checkbox from "packages/core/Checkbox";
import VirtualScroll from "packages/select/VirtualScroll";
import { Option, Label } from "packages/select/common";
import SelectOptionsGroup from "packages/select/SelectOptionsGroup";
import { CurrentHoveredIndexContext } from "packages/select/Select";

import {
  GroupOptionType,
  OptionType,
  SelectProps,
} from "packages/select/types";

import { getOptionHeight } from "packages/select/utils";

interface SelectOptionsProps extends Omit<SelectProps, "onChange" | "maxTags"> {
  handleClick: (option: OptionType) => void;
  toggleOpen: () => void;
  currentHoveredOptionValue?: string | number | null;
  theme: Record<string, any>;
}

const SelectOptions = (props: SelectOptionsProps) => {
  const {
    options,
    values,
    optionRenderer,
    isMulti,
    handleClick,
    toggleOpen,
    maxItems = 5,
    isSearchable,
    optionLabelRenderer,
    isSmall,
    isLarge,
    isInlineSearch,
    currentHoveredOptionValue,
    theme,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Record<string, HTMLDivElement | null>>({});

  const rowHeight = useMemo(
    () => getOptionHeight({ isSmall, isLarge, theme }),
    [isLarge, isSmall, theme]
  );

  const maxHeight = useMemo(() => maxItems * rowHeight, [maxItems, rowHeight]);

  const currentHoveredIndex = useContext(CurrentHoveredIndexContext);

  if (isEmpty(options)) {
    return null;
  }

  if (
    currentHoveredOptionValue === null &&
    containerRef.current &&
    get("current.scrollTop", containerRef)
  ) {
    containerRef.current.scrollTop = 0;
  }

  const items = map((option: GroupOptionType | OptionType) => {
    if ((option as GroupOptionType).options as OptionType[]) {
      return (
        <SelectOptionsGroup
          key={`group-options group-options-${option.label}`}
          options={(option as GroupOptionType).options}
          groups={options as GroupOptionType[]}
          values={values}
          isMulti={isMulti}
          isInlineSearch={isInlineSearch}
          handleClick={handleClick}
          groupLabel={option.label as string}
          isSmall={isSmall}
          isLarge={isLarge}
          optionRenderer={optionRenderer}
          isSearchable={isSearchable}
          optionLabelRenderer={optionLabelRenderer}
          currentHoveredOptionValue={currentHoveredOptionValue}
          containerRef={containerRef}
        />
      );
    }

    const selected = find({ value: (option as OptionType).value }, values);

    if (optionRenderer) {
      return optionRenderer({
        option: option as OptionType,
        selected,
        toggleOpen,
      });
    }

    return (
      <Option
        ref={(el) => (itemsRef.current[(option as OptionType).value] = el)}
        className={!isMulti && !!selected ? "option option-selected" : "option"}
        key={(option as OptionType).value}
        onClick={() => handleClick(option as OptionType)}
        isSelected={!!selected && !isMulti}
        isHovered={currentHoveredOptionValue === (option as OptionType).value}
        isSmall={isSmall}
        isLarge={isLarge}
      >
        {isMulti && (
          <StyledCheckbox
            isChecked={!!selected}
            className="menu-option-checkbox"
          />
        )}
        {optionLabelRenderer ? (
          optionLabelRenderer(option as OptionType)
        ) : (
          <Label isSmall={isSmall} className="menu-option-label">
            {option.label}
          </Label>
        )}
      </Option>
    );
  }, options as OptionType[]);

  const innerListHeight = rowHeight * items.length;

  return (
    <Container
      className="menu-options-container"
      ref={containerRef}
      maxHeight={maxHeight}
      marginTop={isMulti || (isSearchable && !isInlineSearch) ? "5px" : 0}
    >
      {get("[0].options", options) ? (
        <Inner className="menu-options">{items}</Inner>
      ) : (
        <VirtualScroll
          className="menu-options"
          height={innerListHeight < maxHeight ? innerListHeight : maxHeight}
          scrollToIndex={currentHoveredIndex}
          rowCount={items.length}
          rowHeight={rowHeight}
          rowRenderer={({ index, style }) => {
            const currentItem = items[index];

            if (!currentItem) return null;

            return React.cloneElement(currentItem as ReactElement, {
              style,
              transition: "none",
            });
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div<{ marginTop: string | number; maxHeight: number }>`
  position: relative;
  width: 100%;
  margin-top: ${({ marginTop }) => marginTop};
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  overflow: auto;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

export default withTheme(SelectOptions);
