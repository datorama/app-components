import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { maxBy, minBy, isNumber, identity, get, max, min } from 'lodash/fp';

import GoalsChartAxis from './GoalsChartAxis';
import GoalsChartHoverPoints from './GoalsChartHoverPoints';
import GoalsChartPoints from './GoalsChartPoints';
import GoalsChartDrag from './GoalsChartDrag';
import GoalsChartValue from './GoalsChartValue';
import HorizAxis from './HorizAxis';

export const GoalsChart = ({
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
  valueFormatter = identity,
  padding = 20,
  steps = 10,
  id,
  maxY: passedMaxY,
  minY: passedMinY,
  horizontalAxisLabelRenderer,
}) => {
  const [state, setState] = useState({
    width: 0,
    height: 0,
    translation: 0,
  });

  const [dragging, setDragging] = useState(false);

  const maxY = useMemo(
    () =>
      max([
        value,
        isNumber(passedMaxY) ? passedMaxY : get('1', maxBy('1', data)),
      ]),
    [data, passedMaxY, value]
  );
  const minY = useMemo(
    () =>
      min([
        value,
        isNumber(passedMinY) ? passedMinY : get('1', minBy('1', data)),
      ]),
    [data, passedMinY, value]
  );
  const maxX = useMemo(() => get('0', maxBy('0', data)), [data]);
  const minX = useMemo(() => get('0', minBy('0', data)), [data]);

  // state.height - padding -> initial position from top, with a padding
  // arr[1] - minY
  const adjustedData = useMemo(
    () =>
      data.map((arr) => [
        70 +
          ((arr[0] - minX) / (maxX - minX)) *
            (state.width - 2 * padding - 65 - 20),
        state.height -
          padding -
          ((arr[1] - minY) / (maxY - minY)) * (state.height - 2 * padding),
      ]),
    [data, maxX, maxY, minX, minY, padding, state.height, state.width]
  );

  // calculates percentage value based on a given DragSvg y translation value
  const getPercentage = useCallback(
    (translation) =>
      !state.height
        ? value
        : minY +
          ((-1 * translation) / (state.height - 2 * padding)) * (maxY - minY),
    [maxY, minY, padding, state.height, value]
  );

  // calculates y translation value based on a given percentage value (useful for a controlled implementation of the component)
  const getTranslation = useCallback(
    (percentage) =>
      (-1 * (percentage - minY) * (state.height - 2 * padding)) / (maxY - minY),
    [maxY, minY, padding, state.height]
  );

  const handleDrag = useCallback(
    (pos, isDragging) => {
      if (onChange) {
        return onChange(getPercentage(pos[1]), isDragging);
      }
      setState((current) => ({
        ...current,
        translation: pos[1],
      }));
    },
    [getPercentage, onChange]
  );

  const onRef = useCallback((node) => {
    if (!node) return;

    const { width, height } = node.getBoundingClientRect();

    setState((current) => ({
      ...current,
      width,
      height,
    }));
  }, []);

  const percentage = useMemo(
    () => (isNumber(value) ? value : getPercentage(state.translation)),
    [getPercentage, state.translation, value]
  );

  const dragTranslation = useMemo(
    () => (isNumber(value) ? getTranslation(percentage) : state.translation),
    [getTranslation, percentage, state.translation, value]
  );

  const [hovered, setHovered] = useState(null);
  const handleMouseEnter = useCallback((index) => setHovered(index), []);

  return (
    <Container
      ref={onRef}
      className={className}
      onMouseLeave={() => handleMouseEnter(null)}
    >
      <GoalsChartAxis
        min={minY}
        max={maxY}
        steps={steps}
        height={state.height}
        padding={padding}
        valueFormatter={valueFormatter}
        ticksColor={ticksColor}
        labelsColor={labelsColor}
        axisLabelRenderer={axisLabelRenderer}
      />

      <GoalsChartPoints
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

      <GoalsChartHoverPoints
        valueFormatter={valueFormatter}
        data={adjustedData}
        width={state.width}
        padding={padding}
        onMouseEnter={handleMouseEnter}
        hovered={hovered}
        originalData={data}
        lineLabelRenderer={lineLabelRenderer}
      />

      {!!state.height && (
        <GoalsChartDrag
          handleDrag={handleDrag}
          dragColor={dragColor}
          padding={padding}
          width={state.width}
          height={state.height}
          dragTranslation={dragTranslation}
          dragging={dragging}
          setDragging={setDragging}
        />
      )}

      {valueLabelRenderer ? (
        valueLabelRenderer({
          x: 2 * padding - 5 - 35,
          y: state.height - padding + dragTranslation - 11,
          value: percentage,
          isDragging: dragging,
        })
      ) : (
        <GoalsChartValue
          padding={padding}
          dragTranslation={dragTranslation}
          height={state.height}
          labelsColor={labelsColor}
          valueFormatter={valueFormatter}
          percentage={percentage}
        />
      )}

      <HorizAxis
        data={adjustedData}
        height={state.height}
        renderer={horizontalAxisLabelRenderer}
      />
    </Container>
  );
};

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
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  axisLabelRenderer: PropTypes.func,
  valueLabelRenderer: PropTypes.func,
  lineLabelRenderer: PropTypes.func,
  className: PropTypes.string,
  valueFormatter: PropTypes.func.isRequired,
  steps: PropTypes.number,
  padding: PropTypes.number,
  id: PropTypes.string,
  maxY: PropTypes.number,
  minY: PropTypes.number,
  horizontalAxisLabelRenderer: PropTypes.func,
};

const Container = styled.svg`
  width: 100%;
  height: 200px;
  min-width: 600px;
  user-select: none;
  overflow: visible;
`;
