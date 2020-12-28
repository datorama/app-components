import React from 'react';
import styled, { css } from 'styled-components';
import { hexToRgba, Tooltip } from '../..';

export interface SegmentedButtonSectionProps {
  id: number | string;
  className?: string;
  disabled?: boolean;
  label?: string | HTMLElement;
  tooltip?: string;
}

export interface SegmentedButtonProps {
  onClick: (selectedId: number | string) => void;
  sections: SegmentedButtonSectionProps[];
  borderRadius?: string;
  className?: string;
  selected?: number | string;
}

type SegmentedButtonSectionType = 'start' | 'end' | 'default';

export const SegmentedButton = ({
  sections,
  borderRadius,
  className,
  onClick,
  selected,
}: SegmentedButtonProps) => (
  <Sections className={className}>
    {sections.map((section, index) => {
      let type: SegmentedButtonSectionType = 'default';
      if (index === 0) {
        type = 'start';
      }

      if (index === sections.length - 1) {
        type = 'end';
      }

      const buttonArgs = {
        borderRadius: borderRadius || '4px',
        onClick,
        section,
        selected,
        type,
      };

      if (section.tooltip) {
        return (
          <Tooltip title={section.tooltip} key={`section-${section.id}`}>
            <SegmentedButtonSection {...buttonArgs}></SegmentedButtonSection>
          </Tooltip>
        );
      }

      return (
        <SegmentedButtonSection
          {...buttonArgs}
          key={`section-${section.id}`}
        ></SegmentedButtonSection>
      );
    })}
  </Sections>
);

const Sections = styled.div`
  display: flex;
  align-items: center;
`;

const SegmentedButtonSection = ({
  borderRadius,
  section,
  type,
  selected,
  onClick,
}: {
  borderRadius: string;
  section: SegmentedButtonSectionProps;
  type: SegmentedButtonSectionType;
  selected?: number | string;
  onClick?: (selectedId: number | string) => void;
}) => (
  <Section
    borderRadius={borderRadius}
    disabled={!!section.disabled}
    type={type}
    className={section.className}
    selected={section.id === selected}
    onClick={section.disabled ? null : () => onClick(section.id)}
  >
    {section.label}
  </Section>
);

const handleSectionBorders = (
  borderColor: string,
  borderRadius: string,
  type: SegmentedButtonSectionType
) => {
  switch (type) {
    case 'start':
      return `border-bottom-left-radius: ${borderRadius};
            border-top-left-radius: ${borderRadius};
            border-right: 1px solid ${borderColor};`;
    case 'end':
      return `border-top-right-radius: ${borderRadius};
            border-bottom-right-radius: ${borderRadius};
            border-left: 1px solid ${borderColor};`;
    default:
      return `border-right: ${borderColor};`;
  }
};

const Section = styled.div<{
  borderRadius: string;
  disabled: boolean;
  selected: boolean;
  type: SegmentedButtonSectionType;
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
    css`
      background: ${theme.a400};
      color: #fff;
    `};

  ${({ borderRadius, theme, type }) =>
    handleSectionBorders(hexToRgba(theme.p500, 10), borderRadius, type)}

  &:hover {
    background: ${({ theme, selected }) =>
      selected ? theme.a500 : hexToRgba(theme.p300, 25 / 100)};
    color: ${({ theme, selected }) => (selected ? '#fff' : theme.p400)};
  }

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background: ${hexToRgba(theme.p300, 10)};
      color: ${hexToRgba(theme.p300, 50)};

      &:hover {
        background: ${hexToRgba(theme.p300, 10)};
        color: ${hexToRgba(theme.p300, 50)};
      }
    `};
`;
