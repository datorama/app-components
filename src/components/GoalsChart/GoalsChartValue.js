/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

const GoalsChartValue = ({
  padding,
  dragTranslation,
  height,
  labelsColor,
  valueFormatter,
  percentage,
}) => (
  <>
    <TextBg
      x={2 * padding - 5 - 35}
      y={height - padding + dragTranslation - 11}
      width={40}
      height={20}
      rx={4}
      ry={4}
      selected={true}
    />
    <Percentage
      alignmentBaseline="middle"
      textAnchor="end"
      x={2 * padding - 5}
      y={height - padding + dragTranslation}
      color={labelsColor}
    >
      {valueFormatter(percentage)}
    </Percentage>
  </>
);

const Percentage = styled.text`
  font-size: 14px;
  font-weight: 600;
  fill: ${({ theme, color }) => color || theme.a400};
`;

const TextBg = styled.rect`
  fill: ${({ theme }) => theme.a100};
  opacity: 0;

  ${({ selected }) =>
    selected &&
    `
    opacity: 1;
  `};
`;

export default GoalsChartValue;
