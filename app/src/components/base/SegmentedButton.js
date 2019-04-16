import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

const SegmentedButton = ({ sections, selected, onClick, className }) => (
  <Sections className={className}>
    {sections.map((section, index) => {
      let type = 'default';
      if (index === 0) {
        type = 'start';
      }

      if (index === sections.length - 1) {
        type = 'end';
      }

      return (
        <Section
          disabled={section.disabled}
          type={type}
          className={section.className}
          selected={section.id === selected}
          onClick={section.disabled ? null : () => onClick(section.id)}
          key={`section-${section.id}`}
        >
          {section.label}
        </Section>
      );
    })}
  </Sections>
);

SegmentedButton.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      className: PropTypes.string,
      disabled: PropTypes.boolean
    })
  ),
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default SegmentedButton;

const Sections = styled.div`
  display: flex;
  align-items: center;
`;

const Section = styled.div`
  height: ${({ theme }) => theme.size.LARGE};
  padding: 0 14px;
  background: ${({ theme }) => hexToRgba(theme.p300, 15 / 100)};
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

  ${({ type, theme }) =>
    type === 'start' &&
    css`
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      border-right: 1px solid ${hexToRgba(theme.p500, 10)};
    `};

  ${({ type, theme }) =>
    type === 'end' &&
    css`
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: 1px solid ${hexToRgba(theme.p500, 10)};
    `};

  ${({ type, theme }) =>
    type === 'default' &&
    css`
      border-right: ${hexToRgba(theme.p500, 10)};
    `};

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
