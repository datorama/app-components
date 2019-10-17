import React, { useMemo } from 'react';
import * as d3 from 'd3-shape';
import styled from 'styled-components';

const GoalsChartPoints = ({
  width,
  height,
  padding,
  data,
  translation,
  invert,
  speed,
  fillColor,
  areaColor,
  lineColor,
  id = 'id'
}) => {
  const areaGenerator = useMemo(
    () =>
      d3
        .area()
        .y0(height - padding)
        .curve(d3.curveCatmullRom),
    [height, padding]
  );

  const lineGenerator = useMemo(() => d3.line().curve(d3.curveCatmullRom), []);

  const areaData = areaGenerator(data);
  const lineData = lineGenerator(data);

  const rectY = useMemo(
    () => (invert ? padding + translation : height - padding + translation),
    [height, invert, padding, translation]
  );

  return (
    <g>
      <defs>
        <mask id={`goals-mask-${id}`}>
          <Overlay d={areaData} fill="#fff" speed={speed} />
        </mask>
      </defs>

      <Path d={areaData} speed={speed} color={areaColor} />
      <Rect
        width={width}
        height={Math.max(0, height - 2 * padding)}
        x={0}
        y={rectY}
        mask={`url(#goals-mask-${id})`}
        color={fillColor}
      />
      <Line d={lineData} speed={speed} color={lineColor} />
    </g>
  );
};

const Path = styled.path`
  stroke: transparent;
  animation: appear ${({ speed }) => speed}ms linear forwards;
  animation-delay: ${({ speed }) => speed}ms;
  fill: transparent;

  @keyframes appear {
    from {
      fill: transparent;
    }
    to {
      fill: ${({ color }) => color || 'rgba(255, 255, 255, 0.1)'};
    }
  }
`;

const Overlay = styled(Path)`
  animation: appear-mask ${({ speed }) => speed}ms linear forwards;
  animation-delay: 1s;

  @keyframes appear-mask {
    from {
      fill: transparent;
    }
    to {
      fill: #fff;
    }
  }
`;

const Line = styled.path`
  stroke-width: 2;
  fill: transparent;
  stroke: ${({ theme, color }) => color || theme.a300};
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: dash ${({ speed }) => speed}ms linear forwards;
  stroke-linecap: round;

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const Rect = styled.rect`
  fill: ${({ theme, color }) => color || theme.a400};
`;

export default GoalsChartPoints;
