import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import styled from 'styled-components';
import * as d3 from 'd3-shape';
import PropTypes from 'prop-types';
import { maxBy, minBy, isNumber } from 'lodash/fp';

import DragSvg from './DragSvg';
import { hexToRgba } from '../../utils';

const Axis = ({
  min,
  max,
  steps,
  height,
  padding,
  ticksColor,
  labelsColor,
  axisLabelRenderer
}) => {
  const lines = [];
  const step = useMemo(() => (height - 2 * padding) / (steps - 1), [
    height,
    padding,
    steps
  ]);

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

  const bottomValueProps = useMemo(
    () => ({
      key: 'bottom-value',
      x: 2 * padding - 5,
      y: padding,
      value: max
    }),
    [max, padding]
  );

  const topValueProps = useMemo(
    () => ({
      key: 'top-value',
      x: 2 * padding - 5,
      y: padding + (steps - 1) * step,
      value: min
    }),
    [min, padding, step, steps]
  );

  lines.push(
    axisLabelRenderer ? (
      axisLabelRenderer(bottomValueProps)
    ) : (
      <Label
        {...bottomValueProps}
        alignmentBaseline="middle"
        textAnchor="end"
        color={labelsColor}
      >
        {max}%
      </Label>
    ),
    axisLabelRenderer ? (
      axisLabelRenderer(topValueProps)
    ) : (
      <Label
        {...topValueProps}
        alignmentBaseline="middle"
        textAnchor="end"
        color={labelsColor}
      >
        {min}%
      </Label>
    )
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
        mask="url(#goals-mask)"
        color={fillColor}
      />
      <Line d={lineData} speed={speed} color={lineColor} />
    </g>
  );
};

const HoverPoints = ({
  data,
  width,
  padding,
  onMouseEnter,
  hovered,
  originalData,
  lineLabelRenderer
}) => {
  const rectWidth = useMemo(() => (width - 2 * padding - 70) / data.length, [
    data.length,
    padding,
    width
  ]);

  if (rectWidth <= 0) {
    return null;
  }

  return (
    <g>
      {data.map((point, i) => (
        <HoverZone key={`point-${i}`} onMouseEnter={() => onMouseEnter(i)}>
          <HoverRect
            width={rectWidth}
            height="100%"
            x={point[0] - 0.5 * rectWidth}
            y={0}
          />
          <Circle cx={point[0]} cy={point[1]} r={3} selected={hovered === i} />

          {lineLabelRenderer ? (
            lineLabelRenderer({
              x: point[0] + 10,
              y: point[1] - 13,
              value: originalData[i][1]
            })
          ) : (
            <>
              <TextBg
                x={point[0] - 20}
                y={point[1] - 25}
                width={40}
                height={20}
                rx={4}
                ry={4}
                selected={hovered === i}
              />

              <TooltipLabel
                alignmentBaseline="middle"
                textAnchor="end"
                x={point[0] + 10}
                y={point[1] - 13}
                selected={hovered === i}
              >
                {originalData[i][1]}
              </TooltipLabel>
            </>
          )}
        </HoverZone>
      ))}
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
  value,
  onChange,
  axisLabelRenderer,
  valueLabelRenderer,
  lineLabelRenderer,
  id
}) => {
  const [state, setState] = useState({
    width: 0,
    height: 0,
    translation: 0
  });
  const padding = 20;

  const maxY = useMemo(() => maxBy(arr => arr[1], data), [data]);
  const minY = useMemo(() => minBy(arr => arr[1], data), [data]);
  const maxX = useMemo(() => maxBy(arr => arr[0], data), [data]);
  const minX = useMemo(() => minBy(arr => arr[0], data), [data]);

  const adjustedData = useMemo(
    () =>
      data.map(arr => [
        100 +
          ((arr[0] - minX[0]) / (maxX[0] - minX[0])) *
            (state.width - 2 * padding - 50 - 100),
        state.height -
          padding -
          ((arr[1] - minY[1]) / (maxY[1] - minY[1])) *
            (state.height - 2 * padding)
      ]),
    [data, maxX, maxY, minX, minY, state.height, state.width]
  );

  const steps = 10;
  const el = useRef(null);

  // calculates percentage value based on a given DragSvg y translation value
  const getPercentage = useCallback(
    translation =>
      !state.height
        ? value
        : minY[1] +
          Math.round(
            ((-1 * translation) / (state.height - 2 * padding)) *
              (maxY[1] - minY[1])
          ),
    [maxY, minY, state.height, value]
  );

  // calculates y translation value based on a given percentage value (useful for a controlled implementation of the component)
  const getTranslation = useCallback(
    percentage =>
      (-1 * (percentage - minY[1]) * (state.height - 2 * padding)) /
      (maxY[1] - minY[1]),
    [maxY, minY, state.height]
  );

  const handleDrag = useCallback(
    pos => {
      if (onChange) {
        return onChange(getPercentage(pos[1]));
      }
      setState(current => ({
        ...current,
        translation: pos[1]
      }));
    },
    [getPercentage, onChange]
  );

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

  const percentage = useMemo(
    () => (isNumber(value) ? value : getPercentage(state.translation)),
    [getPercentage, state.translation, value]
  );

  const dragTranslation = useMemo(
    () => (isNumber(value) ? getTranslation(percentage) : state.translation),
    [getTranslation, percentage, state.translation, value]
  );

  const [hovered, setHovered] = useState(null);
  const handleMouseEnter = useCallback(index => setHovered(index), []);

  return (
    <Container
      ref={el}
      className={className}
      onMouseLeave={() => handleMouseEnter(null)}
    >
      <Axis
        min={minY[1]}
        max={maxY[1]}
        steps={steps}
        height={state.height}
        padding={padding}
        ticksColor={ticksColor}
        labelsColor={labelsColor}
        axisLabelRenderer={axisLabelRenderer}
      />
      <Points
        id={id}
        height={state.height}
        width={state.width}
        padding={padding}
        data={adjustedData}
        translation={dragTranslation}
        invert={invert}
        speed={animationSpeed}
        fillColor={fillColor}
        areaColor={areaColor}
        lineColor={lineColor}
      />
      <HoverPoints
        data={adjustedData}
        width={state.width}
        padding={padding}
        onMouseEnter={handleMouseEnter}
        hovered={hovered}
        originalData={data}
        lineLabelRenderer={lineLabelRenderer}
      />
      {!!state.height && (
        <DragSvg
          onChange={handleDrag}
          initialTranslation={[0, dragTranslation]}
          minY={-1 * (state.height - 2 * padding)}
          maxY={0}
        >
          <DragLineZone
            x1={2 * padding - 2}
            x2={state.width - 2 * padding + 2}
            y1={state.height - padding + dragTranslation}
            y2={state.height - padding + dragTranslation}
            color={dragColor}
          />
          <DragLine
            x1={2 * padding - 2}
            x2={state.width - 2 * padding + 2}
            y1={state.height - padding + dragTranslation}
            y2={state.height - padding + dragTranslation}
            color={dragColor}
          />
          <Arrow
            color={dragColor}
            d={[
              `M ${2 * padding - 1}, ${state.height -
                padding +
                dragTranslation +
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
                dragTranslation -
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
                dragTranslation +
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
                dragTranslation -
                4}`,
              'l 4, -4',
              'l 4, 4',
              'z'
            ].join(' ')}
          />
        </DragSvg>
      )}

      {valueLabelRenderer ? (
        valueLabelRenderer({
          x: 2 * padding - 5 - 35,
          y: state.height - padding + dragTranslation - 11,
          value: percentage
        })
      ) : (
        <>
          <TextBg
            x={2 * padding - 5 - 35}
            y={state.height - padding + dragTranslation - 11}
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
            y={state.height - padding + dragTranslation}
            color={labelsColor}
          >
            {percentage}%
          </Percentage>
        </>
      )}
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
  value: PropTypes.number,
  onChange: PropTypes.func,
  axisLabelRenderer: PropTypes.func,
  valueLabelRenderer: PropTypes.func,
  lineLabelRenderer: PropTypes.func,
  className: PropTypes.string
};

const Container = styled.svg`
  width: 100%;
  height: 200px;
  min-width: 600px;
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
  font-size: 14px;
  font-weight: 600;
  fill: ${({ theme, color }) => color || theme.a400};
`;

const Circle = styled.circle`
  stroke: none;
  fill: ${({ theme, color }) => color || theme.p600};
  opacity: 0;
  transition: all 300ms;

  ${({ selected }) =>
    selected &&
    `
    opacity: 1;
  `};
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

const HoverRect = styled.rect`
  stroke: none;
  fill: transparent;
`;

const HoverZone = styled.g``;

const TooltipLabel = styled.text`
  font-size: 12px;
  font-weight: 600;
  fill: ${({ theme, color }) => color || theme.a400};

  opacity: 0;
  transition: all 300ms;

  ${({ selected }) =>
    selected &&
    `
    opacity: 1;
  `};
`;
