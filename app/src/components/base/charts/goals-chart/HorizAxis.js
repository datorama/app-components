import React from 'react';
import styled from 'styled-components';

const HorizAxis = ({ data, height, renderer }) => {
  if (!renderer) {
    return null;
  }

  return (
    <g>
      {data.map((pos, index) => (
        <Label
          key={`axis-label-${index}`}
          x={pos[0]}
          y={height - 5}
          alignmentBaseline="end"
          textAnchor="middle"
        >
          {renderer({ index, point: data[index] })}
        </Label>
      ))}
    </g>
  );
};

export default HorizAxis;

const Label = styled.text`
  font-size: 11px;
  font-weight: 500;
  fill: ${({ theme, color }) => color || theme.p400};
`;
