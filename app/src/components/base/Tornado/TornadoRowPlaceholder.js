import React, { useRef, useMemo } from 'react';
import styled from 'styled-components';

import * as CONSTANTS from './tornado.constants';
import pencilIcon from '../../icons/pencil.svg';
import { Rect } from './TornadoChart';

const TornadoRowPlaceholder = ({
  index,
  width,
  placeholderMessage,
  onClick
}) => {
  const placeholderTextRef = useRef();

  const { placeholderTextWidth = 0, placeholderTextHeight = 0 } = useMemo(
    () =>
      !!placeholderTextRef.current
        ? {
            placeholderTextWidth: placeholderTextRef.current.getBoundingClientRect()
              .width,
            placeholderTextHeight: placeholderTextRef.current.getBoundingClientRect()
              .height
          }
        : {},
    [placeholderTextRef.current] // eslint-disable-line
  );

  return (
    <g key={`base-${index}`} onClick={onClick}>
      <Rect
        width={width}
        height={CONSTANTS.ROW_HEIGHT}
        x={CONSTANTS.MARGINS[index]}
        y={index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN)}
      />

      <defs>
        <PlaceholderFilter>
          <filter id="placeholder-shadow">
            <feDropShadow
              dx="-0.8"
              dy="-0.8"
              stdDeviation="5"
              floodColor="#000"
              floodOpacity="0.2"
            />
          </filter>
        </PlaceholderFilter>
      </defs>

      <rect
        fill="#fff"
        width={width}
        height={CONSTANTS.ROW_HEIGHT}
        x={CONSTANTS.MARGINS[index]}
        y={index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN)}
        filter="url(#placeholder-shadow)"
      />
      <PlaceholderContent>
        <text
          ref={placeholderTextRef}
          height={CONSTANTS.ROW_HEIGHT}
          x={CONSTANTS.MARGINS[index] + width / 2}
          y={
            index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
            +CONSTANTS.ROW_HEIGHT
          }
          fontSize={13}
          fontWeight={600}
          color="#67696f"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {placeholderMessage}
        </text>
        <image
          href={pencilIcon}
          x={
            CONSTANTS.MARGINS[index] + width / 2 + placeholderTextWidth / 2 + 5
          }
          y={
            index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
            +CONSTANTS.ROW_HEIGHT -
            placeholderTextHeight / 2
          }
        />
      </PlaceholderContent>
    </g>
  );
};

const PlaceholderContent = styled.g`
  transform-origin: 50% 50%;
  opacity: 0;
  animation: appear 0.5s ease-out 1.7s forwards;
`;

const PlaceholderFilter = styled.g`
  feDropShadow {
    flood-opacity: 0.05;
    animation: addShadow 0.5s ease-out 1s forwards;
  }

  @keyframes addShadow {
    from {
      flood-opacity: 0.05;
    }
    to {
      flood-opacity: 0.2;
    }
  }
`;

export default TornadoRowPlaceholder;
