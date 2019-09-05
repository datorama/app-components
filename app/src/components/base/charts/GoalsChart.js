import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { maxBy } from 'lodash/fp';

import DragSvg from './DragSvg';
import { hexToRgba } from '../../utils';

const Axis = ({
  min,
  max,
  steps,
  height,
  padding,
  ticksColor,
  labelsColor
}) => {
  const lines = [];
  const step = (height - 2 * padding) / (steps - 1);

  for (let i = 0; i < steps; i++) {
    const y = padding + i * step;

    lines.push(
      <Tick
        key={`line-${i}`}
        x1={2 * padding}
        x2={2 * padding + 5}
        y1={y}
        y2={y}
        color={ticksColor}
      />
    );
  }

  lines.push(
    <Label
      key="bottom-value"
      x={2 * padding - 5}
      y={padding}
      alignmentBaseline="middle"
      textAnchor="end"
      color={labelsColor}
    >
      {max}
    </Label>,
    <Label
      key="top-value"
      x={2 * padding - 5}
      y={padding + (steps - 1) * step}
      alignmentBaseline="middle"
      textAnchor="end"
      color={labelsColor}
    >
      {min}
    </Label>
  );

  return <g>{lines}</g>;
};

const Points = ({
  width,
  height,
  padding,
  data,
  translation,
  invert,
  speed,
  fillColor,
  areaColor,
  lineColor
}) => {
  const areaGenerator = d3
    .area()
    .y0(height - padding)
    .curve(d3.curveCardinal);
  const lineGenerator = d3.line().curve(d3.curveCardinal);
  const areaData = areaGenerator(data);
  const lineData = lineGenerator(data);

  const rectY = invert ? padding + translation : height - padding + translation;

  return (
    <g>
      <defs>
        <mask id="goals-mask">
          <Overlay d={areaData} fill="#fff" speed={speed} />
        </mask>
      </defs>

      <Path d={areaData} speed={speed} color={areaColor} />
      <Rect
        width={width}
        height={Math.max(0, height - 2 * padding)}
        x={0}
        y={rectY}
        mask="url(#goals-mask)"
        color={fillColor}
      />
      <Line d={lineData} speed={speed} color={lineColor} />
    </g>
  );
};

const GoalsChart = ({
  data = [],
  invert = false,
  animationSpeed = 2000,
  className,
  fillColor,
  ticksColor,
  lineColor,
  labelsColor,
  areaColor,
  dragColor,
  min,
  max
}) => {
  const [state, setState] = useState({
    width: 0,
    height: 0,
    translation: 0
  });

  const steps = 10;
  const padding = 20;
  const el = useRef(null);

  const maxItem = maxBy(arr => arr[0], data);

  let dataMax = 0;
  if (maxItem) {
    dataMax = maxItem[0];
  }

  const modifiedData = data.map(arr => [
    (arr[0] / dataMax) * (state.width - padding - 80) + 50,
    state.height - padding - 20 //- arr[1]
  ]);

  const handleDrag = useCallback(pos => {
    setState(current => ({
      ...current,
      translation: pos[1]
    }));
  }, []);

  useEffect(() => {
    if (el !== null) {
      const { width, height } = el.current.getBoundingClientRect();

      setState(current => ({
        ...current,
        width,
        height
      }));
    }
  }, [el]);

  const percentage =
    ((-1 * state.translation) / (state.height - 2 * padding)) * (max - min);

  return (
    <Container ref={el} className={className}>
      <Axis
        min={min}
        max={max}
        steps={steps}
        height={state.height}
        padding={padding}
        ticksColor={ticksColor}
        labelsColor={labelsColor}
      />
      <Points
        height={state.height}
        width={state.width}
        padding={padding}
        data={modifiedData}
        translation={state.translation}
        invert={invert}
        speed={animationSpeed}
        fillColor={fillColor}
        areaColor={areaColor}
        lineColor={lineColor}
      />
      <DragSvg
        onChange={handleDrag}
        minY={-1 * (state.height - 2 * padding)}
        maxY={0}
      >
        <DragLineZone
          x1={2 * padding - 2}
          x2={state.width - 2 * padding + 2}
          y1={state.height - padding + state.translation}
          y2={state.height - padding + state.translation}
          color={dragColor}
        />
        <DragLine
          x1={2 * padding - 2}
          x2={state.width - 2 * padding + 2}
          y1={state.height - padding + state.translation}
          y2={state.height - padding + state.translation}
          color={dragColor}
        />
        <Arrow
          color={dragColor}
          d={[
            `M ${2 * padding - 1}, ${state.height -
              padding +
              state.translation +
              4}`,
            'l 4, 4',
            'l 4, -4',
            'z'
          ].join(' ')}
        />
        <Arrow
          color={dragColor}
          d={[
            `M ${2 * padding - 1}, ${state.height -
              padding +
              state.translation -
              4}`,
            'l 4, -4',
            'l 4, 4',
            'z'
          ].join(' ')}
        />
        <Arrow
          color={dragColor}
          d={[
            `M ${state.width - 2 * padding - 7}, ${state.height -
              padding +
              state.translation +
              4}`,
            'l 4, 4',
            'l 4, -4',
            'z'
          ].join(' ')}
        />
        <Arrow
          color={dragColor}
          d={[
            `M ${state.width - 2 * padding - 7}, ${state.height -
              padding +
              state.translation -
              4}`,
            'l 4, -4',
            'l 4, 4',
            'z'
          ].join(' ')}
        />
      </DragSvg>

      <Percentage
        alignmentBaseline="middle"
        x={2 * padding - 5}
        y={state.height - padding + state.translation}
        textAnchor="end"
        color={labelsColor}
      >
        {percentage.toFixed(1)}
      </Percentage>
    </Container>
  );
};

export default GoalsChart;

GoalsChart.propTypes = {
  invert: PropTypes.bool,
  data: PropTypes.array.isRequired,
  animationSpeed: PropTypes.number,
  dragColor: PropTypes.string,
  lineColor: PropTypes.string,
  ticksColor: PropTypes.string,
  labelsColor: PropTypes.string,
  fillColor: PropTypes.string,
  areaColor: PropTypes.string,
  className: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number
};

const Container = styled.svg`
  width: 100%;
  height: 200px;
  min-width: 500px;
  user-select: none;
`;

const Tick = styled.line`
  stroke: ${({ theme, color }) => color || theme.p400};
  stroke-width: 1;
  stroke-linecap: round;
`;

const Label = styled.text`
  font-size: 11px;
  font-weight: 500;
  fill: ${({ theme, color }) => color || theme.p400};
`;

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
      fill: ${({ theme, color }) => color || theme.p100};
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
  stroke-width: 1;
  fill: transparent;
  stroke: ${({ theme, color }) => color || theme.p600};
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
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

const DragLine = styled.line`
  stroke: ${({ theme, color }) => color || theme.a500};
  stroke-linecap: round;
  stroke-width: 2;
  pointer-events: none;
`;

const DragLineZone = styled.line`
  stroke-width: 20;
  stroke: transparent;

  &:hover {
    stroke: ${({ theme, color }) => hexToRgba(color || theme.a100, 20)};
  }
`;

const Arrow = styled.path`
  fill: ${({ theme, color }) => color || theme.a500};
`;

const Percentage = styled.text`
  font-size: 11px;
  font-weight: 500;
  fill: ${({ theme, color }) => color || theme.p400};
`;
