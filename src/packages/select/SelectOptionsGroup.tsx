import React, { useContext, useRef, useEffect, MutableRefObject } from "react";
import styled from "styled-components";
import { find, get, isEmpty, forEach } from "lodash/fp";

import Checkbox from "packages/core/Checkbox";
import { GroupLabel, Option, Label } from "packages/select/common";
import { CurrentHoveredIndexContext } from "packages/select/Select";

import { calcScrollTop, getFlatOptions } from "packages/select/utils";

import {
  GroupOptionType,
  OptionType,
  SelectProps,
} from "packages/select/types";

export interface SelectOptionsGroupProps
  extends Omit<SelectProps, "onChange" | "maxTags"> {
  handleClick: (option: OptionType) => void;
  currentHoveredOptionValue?: string | number | null;
  groupLabel: string;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  groups: GroupOptionType[];
  options: OptionType[];
}

const SelectOptionsGroup = (props: SelectOptionsGroupProps) => {
  const {
    options,
    values,
    optionRenderer,
    isMulti,
    handleClick,
    optionLabelRenderer,
    isSmall,
    isLarge,
    groupLabel,
    currentHoveredOptionValue,
    containerRef,
    groups,
  } = props;

  const itemsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const groupLabelsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const currentHoveredIndex = useContext(CurrentHoveredIndexContext);

  useEffect(() => {
    const flatList = getFlatOptions(groups);

    if (flatList[currentHoveredIndex]) {
      const value = flatList[currentHoveredIndex]?.value;

      forEach((option: OptionType) => {
        if (value === option.value && containerRef.current) {
          containerRef.current.scrollTop = calcScrollTop(
            get(["current", option.value], itemsRef),
            containerRef.current,
            get(["current", groupLabel, "clientHeight"], groupLabelsRef)
          );
        }
      }, options as OptionType[]);
    }
  }, [containerRef, currentHoveredIndex, groupLabel, groups, options]);

  if (isEmpty(options)) {
    return null;
  }

  const items = options.map((option: OptionType) => {
    const selected = find({ value: option.value }, values);

    if (optionRenderer) {
      return optionRenderer({ option, selected });
    }

    return (
      <Option
        ref={(el) => (itemsRef.current[option.value] = el)}
        className={!isMulti && selected ? "option option-selected" : "option"}
        key={option.value}
        onClick={() => handleClick(option)}
        isSelected={selected && !isMulti}
        isHovered={currentHoveredOptionValue === option.value}
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
          optionLabelRenderer(option)
        ) : (
          <Label isSmall={isSmall} className="menu-option-label">
            {option.label}
          </Label>
        )}
      </Option>
    );
  });

  return (
    <Container className="menu-options-group">
      <GroupLabel
        className="menu-options-group-label"
        ref={(el) => (groupLabelsRef.current[groupLabel] = el)}
        isSmall={isSmall}
        isLarge={isLarge}
      >
        {groupLabel}
      </GroupLabel>
      {items}
    </Container>
  );
};

const areEqual = (
  prevProps: SelectOptionsGroupProps,
  nextProps: SelectOptionsGroupProps
) => {
  return (
    prevProps.options.length === nextProps.options.length &&
    prevProps.values.length === nextProps.values.length &&
    prevProps.groups.length === nextProps.groups.length &&
    prevProps.currentHoveredOptionValue === nextProps.currentHoveredOptionValue
  );
};

const Container = styled.div``;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

export default React.memo(SelectOptionsGroup, areEqual);
