import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

const SegmentedButton = ({ sections, selected, onClick }) => (
  <Sections>
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
          type={type}
          selected={section.id === selected}
          onClick={() => onClick(section.id)}
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
      id: PropTypes.number,
      label: PropTypes.string
    })
  ),
  selected: PropTypes.number,
  onClick: PropTypes.func
};

export default SegmentedButton;

const Sections = styled.div`
  display: flex;
  align-items: center;
`;

const Section = styled.div`
  height: ${({ theme }) => theme.size.LARGE};
  padding: 0 14px;
  background: ${({ theme }) => hexToRgba(theme.p300, 15)};
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
      selected ? theme.a500 : hexToRgba(theme.p300, 25)};
    color: ${({ theme, selected }) => (selected ? '#fff' : theme.p400)};
  }
`;
