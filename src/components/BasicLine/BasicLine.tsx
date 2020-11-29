/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { AutoSizer } from 'react-virtualized';
import { Line } from './Line';
import { Area } from './Area';
import { Interaction } from './Interaction';

export interface Props {
  data: Record<string, any>[];
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  tooltipRenderer?: (point: Record<string, any>) => ReactElement | null;
}

export const BasicLine = (props: Props) => {
  const [rect, setRect] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Svg width={width} height={height} ref={ref}>
          {props.data.length ? (
            <>
              <Area
                width={width}
                height={height}
                data={props.data}
                fillColor={props.fillColor}
              />
              <Line
                width={width}
                height={height}
                data={props.data}
                strokeColor={props.strokeColor}
                strokeWidth={props.strokeWidth}
              />
              <Interaction
                width={width}
                height={height}
                data={props.data}
                strokeColor={props.strokeColor}
                strokeWidth={props.strokeWidth}
                tooltipRenderer={props.tooltipRenderer}
                chartRect={rect}
              />
            </>
          ) : null}
        </Svg>
      )}
    </AutoSizer>
  );
};

BasicLine.defaultProps = {
  data: [],
  strokeWidth: 3,
};

const Svg = styled.svg<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
