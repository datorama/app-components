import React, { ReactNode } from "react";
import styled from "styled-components";
import { hexToRgba, noop } from "../../common/utils";

interface SectionType {
  id: number | string;
  label: string | ReactNode;
  className?: string;
  isDisabled?: boolean;
}

export interface SegmentedButtonProps {
  sections: SectionType[];
  selected?: number | string;
  onClick: (id: number | string) => any;
  className?: string;
}

const SegmentedButton = ({
  sections,
  selected,
  onClick,
  className,
}: SegmentedButtonProps) => (
  <Sections className={className}>
    {sections.map((section, index) => {
      let type = "default";
      if (index === 0) {
        type = "start";
      }

      if (index === sections.length - 1) {
        type = "end";
      }

      return (
        <Section
          isDisabled={!!section.isDisabled}
          type={type}
          className={section.className}
          selected={section.id === selected}
          onClick={section.isDisabled ? noop : () => onClick(section.id)}
          key={`section-${section.id}`}
        >
          {section.label}
        </Section>
      );
    })}
  </Sections>
);

export default SegmentedButton;

const Sections = styled.div`
  display: flex;
  align-items: center;
`;

const Section = styled.div<{
  type: string;
  selected: boolean;
  isDisabled: boolean;
}>`
  height: ${({ theme }) => theme.size.LARGE};
  padding: 0 14px;
  background: ${({ theme }) => hexToRgba(theme.p300, 10)};
  color: ${({ theme }) => theme.p400};

  ${({ theme }) => theme.text.pLink};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;

  ${({ theme, selected }) =>
    selected &&
    `
      background: ${theme.a400};
      color: #fff;
    `};

  ${({ type, theme }) =>
    type === "start" &&
    `
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      border-right: 1px solid ${hexToRgba(theme.p500, 10)};
    `};

  ${({ type, theme }) =>
    type === "end" &&
    `
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: 1px solid ${hexToRgba(theme.p500, 10)};
    `};

  ${({ type, theme }) =>
    type === "default" &&
    `
      border-right: ${hexToRgba(theme.p500, 10)};
    `};

  &:hover {
    background: ${({ theme, selected }) =>
      selected ? theme.a500 : hexToRgba(theme.p300, 25 / 100)};
    color: ${({ theme, selected }) => (selected ? "#fff" : theme.p400)};
  }

  ${({ theme, isDisabled }) =>
    isDisabled &&
    `
      background: ${hexToRgba(theme.p300, 10)};
      color: ${hexToRgba(theme.p300, 50)};

      &:hover {
        background: ${hexToRgba(theme.p300, 10)};
        color: ${hexToRgba(theme.p300, 50)};
      }
    `};
`;
