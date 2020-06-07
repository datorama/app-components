import React, { Component } from 'react';
import styled from 'styled-components';
import Warp from 'warpjs';
import { get, sum, isNumber, size } from 'lodash/fp';
import PropTypes from 'prop-types';

import { abbreviateNumber, normalize, getCentroid } from './tornado.utils';
import * as CONSTANTS from './tornado.constants';

// components
import TornadoEllipses from './TornadoEllipses';
import TornadoLines from './TornadoLines';
import TornadoArrows from './TornadoArrows';
import Tooltip from './Tooltip';
import TornadoRowPlaceholder from './TornadoRowPlaceholder';
import { TORNADO_OFFSET } from './tornado.constants';

class TornadoChart extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
        label: PropTypes.string,
        totalValue: PropTypes.number,
        totalPercentage: PropTypes.string
      })
    ),
    stats: PropTypes.array,
    selectedIndex: PropTypes.number,
    selectIndex: PropTypes.func
  };

  state = {
    hoveredIndex: null,
    hoveringConnector: false,
    hoveringLines: false,
    totalValue: null,
    hoveredRow: null,
    loading: true,
    animating: false,
    init: false
  };

  interploationOffset = 0;

  componentDidMount() {
    this.setState({ loading: false }, this.animateInterpolation);
  }

  animateInterpolation() {
    setTimeout(() => {
      this.setState({ animating: true }, () => {
        this.warp = new Warp(this.el);

        this.interval = setInterval(() => {
          if (this.interploationOffset >= 6) {
            window.clearInterval(this.interval);
            this.setState({ animating: false, init: true });
          }
          this.interpolate();
          this.interploationOffset += 1;
        }, 8);
      });
    }, 1000);
  }

  interpolation = ([x, y]) => [
    x,
    y + this.interploationOffset * Math.sin(x / CONSTANTS.INTER_SIN)
  ];

  interpolate() {
    this.warp.interpolate(6);
    this.warp.transform(this.interpolation);
  }

  toggleConnectorhover = hoveringConnector => () =>
    this.setState({ hoveringConnector });

  row(width, index) {
    const { rows, selectedIndex } = this.props;

    if (rows[index].placeholderMessage) {
      return (
        <TornadoRowPlaceholder
          key={index}
          index={index}
          width={width}
          placeholderMessage={rows[index].placeholderMessage}
          onClick={rows[index].onPlaceholderClick}
        />
      );
    }

    const { loading, animating, hoveredIndex, init } = this.state;
    const rowData = normalize(rows[index].data, width);
    const rawData = rows[index].data;

    const total = sum(rowData);
    const cells = [];

    let offset = 0;
    let nextOffset = 0;

    const numRows = size(rows);
    const BASE = CONSTANTS.BASE(numRows);

    rowData.forEach((val, cellIndex) => {
      const cellWidth = (val / total) * width;
      const rectXpos = offset + CONSTANTS.MARGINS[index];
      const rectLoadingXpos =
        CONSTANTS.MARGINS[index] + width / 2 - cellWidth / 2;
      const rectYpos = index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN);
      const rectLoadingYpos = 3 * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN);
      const column = [];
      const fill = loading ? '#444' : CONSTANTS.MAIN_COLORS[cellIndex % 6];

      // horizontal row cells
      column.push(
        <Rect
          key={`cell-${rows[index].key}-${cellIndex}`}
          width={cellWidth}
          height={CONSTANTS.ROW_HEIGHT}
          x={loading ? rectLoadingXpos : rectXpos}
          y={loading ? rectLoadingYpos : rectYpos}
          fill={fill}
          opacity={loading ? 0 : 1}
          withTransition={!animating}
        />
      );

      // cell label
      const labelX = offset + CONSTANTS.MARGINS[index] + cellWidth / 2;
      const labelY =
        index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
        CONSTANTS.ROW_HEIGHT / 2;
      const labelInter =
        labelY + 20 * Math.sin(labelX / CONSTANTS.INTER_SIN) + 5;

      if ((hoveredIndex === cellIndex || selectedIndex === cellIndex) && init) {
        column.push(
          <Label
            key={`label-${rows[index].key}-${cellIndex}`}
            x={labelX}
            y={labelInter}
          >
            {rawData[cellIndex] ? abbreviateNumber(rawData[cellIndex]) : '--'}
          </Label>
        );
      }

      // build connectors
      if (
        rows.length - 1 > index &&
        !rows.some(row => !!row.placeholderMessage)
      ) {
        const nextRowData = normalize(rows[index + 1].data, BASE[index + 1]);
        const nextRowTotal = sum(nextRowData);
        const nextWidth =
          (nextRowData[cellIndex] / nextRowTotal) * BASE[index + 1];

        const path = [
          'M',
          `${offset + CONSTANTS.MARGINS[index]},${index *
            (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
            CONSTANTS.ROW_HEIGHT}`,
          'l',
          `${cellWidth},0`,
          'l',
          `${nextWidth +
            nextOffset -
            offset -
            cellWidth +
            CONSTANTS.MARGINS[index + 1] -
            CONSTANTS.MARGINS[index]},${CONSTANTS.MARGIN}`,
          'l',
          `${-nextWidth},0`,
          'z'
        ].join(' ');

        // connector shape
        column.push(
          <g
            key={`path-${rows[index].key}-${cellIndex}`}
            onMouseEnter={this.toggleConnectorhover(true)}
            onMouseLeave={this.toggleConnectorhover(false)}
          >
            <Path
              d={path}
              fill={CONSTANTS.CONNECTOR_COLORS[cellIndex % 6]}
              visible={
                (hoveredIndex === cellIndex || selectedIndex === cellIndex) &&
                init
              }
            />
          </g>
        );

        // connector label
        const centroid = getCentroid([
          {
            x: offset + CONSTANTS.MARGINS[index],
            y:
              index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
              CONSTANTS.ROW_HEIGHT
          },
          {
            x: offset + CONSTANTS.MARGINS[index] + cellWidth,
            y:
              index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
              CONSTANTS.ROW_HEIGHT
          },
          {
            x: nextWidth + nextOffset + CONSTANTS.MARGINS[index + 1],
            y: (index + 1) * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN)
          },
          {
            x: nextOffset + CONSTANTS.MARGINS[index + 1],
            y: (index + 1) * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN)
          },
          {
            x: offset + CONSTANTS.MARGINS[index],
            y:
              index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
              CONSTANTS.ROW_HEIGHT
          }
        ]);

        if (index + 1 < rows.length) {
          const conLabelY =
            centroid.y + 20 * Math.sin(centroid.x / CONSTANTS.INTER_SIN) + 5;

          const columnHeadValue = get([0, 'data', cellIndex], rows);
          const nextValue = get([index + 1, 'data', cellIndex], rows);
          const connectorLabel = columnHeadValue
            ? (nextValue / columnHeadValue) * 100
            : 0;

          if (
            (hoveredIndex === cellIndex || selectedIndex === cellIndex) &&
            init
          ) {
            column.push(
              <Label
                key={`path-label-${rows[index].key}-${cellIndex}`}
                x={centroid.x}
                y={conLabelY}
                fill={`rgba(55, 56, 58)`}
                opacity={0.75}
              >
                {connectorLabel ? `${Math.round(connectorLabel)}%` : '--'}
              </Label>
            );
          }
        }

        nextOffset += nextWidth;
      }

      cells.push(
        <g
          key={`${rows[index].key}-${cellIndex}`}
          onMouseEnter={this.hoverIndex(cellIndex, index)}
          onMouseLeave={this.hoverIndex(null, null)}
          onClick={this.selectIndex(cellIndex)}
        >
          {column}
        </g>
      );

      offset += cellWidth;
    });

    return (
      <g key={`base-${index}`}>
        <Rect
          width={width}
          height={CONSTANTS.ROW_HEIGHT}
          x={CONSTANTS.MARGINS[index]}
          y={index * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN)}
        />
        {cells}
      </g>
    );
  }

  selectIndex = index => () => {
    const { selectedIndex, selectIndex } = this.props;

    if (index !== selectedIndex) {
      selectIndex(index);
    }
  };

  hoverIndex = (index, rowIndex) => () =>
    this.setState({ hoveredIndex: index, hoveredRow: rowIndex });

  tooltipContent() {
    let tooltipLabel = null;
    const { rows } = this.props;
    const {
      hoveredIndex,
      hoveredRow,
      hoveringConnector,
      hoveringLines,
      totalValue
    } = this.state;

    const value = get(`[${hoveredRow}].data[${hoveredIndex}]`, rows);

    const columnHeadValue = get(`[0].data[${hoveredIndex}]`, rows);
    const nextValue = get([hoveredRow + 1, 'data', hoveredIndex], rows);
    const connectorLabel = value ? (nextValue / columnHeadValue) * 100 : 0;
    const label = get(`[${hoveredRow}].data[${hoveredIndex}]`, rows);

    if (hoveringLines && totalValue !== null) {
      tooltipLabel = totalValue;
    } else if (hoveringConnector) {
      tooltipLabel = `${connectorLabel.toFixed(2)}`;
    } else {
      tooltipLabel = label;
    }

    const abbNum = `${abbreviateNumber(parseFloat(tooltipLabel))}`;
    const abbreviated =
      abbNum.includes('M') || abbNum.includes('T') || abbNum.includes('B');
    return {
      abbreviated,
      value: hoveringConnector
        ? `${tooltipLabel}%`
        : Number(tooltipLabel).toLocaleString()
    };
  }

  handleLinesMouseEnter = line => {
    this.setState({ hoveringLines: true, totalValue: line.totalValue });
  };

  handleLinesMouseLeave = () => {
    this.setState({ hoveringLines: false, totalValue: null });
  };

  render() {
    const {
      init,
      loading,
      hoveredIndex,
      hoveringLines,
      hoveringConnector
    } = this.state;
    const { rows, selectedIndex, labels } = this.props;
    const { value: tooltipText, abbreviated } = this.tooltipContent();

    let containerWidth = 0;
    if (this.el) {
      containerWidth = this.el.getBoundingClientRect().width;
    }
    const tooltipVisible =
      hoveringConnector ||
      (abbreviated && (isNumber(hoveredIndex) || hoveringLines));

    const numRows = size(rows);
    const OFFSET = TORNADO_OFFSET(numRows);

    return (
      <Container
        height={CONSTANTS.CONTAINER_HEIGHT}
        disabled={!init}
        className="tornado tornado-chart tornado-chart-container"
      >
        <Tooltip
          fixed
          title={tooltipText}
          visible={tooltipVisible}
          className="tornado tornado-chart tornado-chart-tooltip tornado-chart-tooltip-container"
        >
          <Svg height={CONSTANTS.CONTAINER_HEIGHT}>
            <Base offsetX={OFFSET[0]} offsetY={OFFSET[1]}>
              <TornadoLines
                rows={rows}
                onMouseEnter={this.handleLinesMouseEnter}
                onMouseLeave={this.handleLinesMouseLeave}
              />
              <TornadoEllipses loading={loading} numRows={numRows} />
            </Base>
          </Svg>

          <Svg
            ref={el => (this.el = el)}
            height={CONSTANTS.CONTAINER_HEIGHT}
            width="100%"
            style={{ pointerEvents: 'none' }}
          >
            <Base
              clickable
              offsetX={OFFSET[0]}
              offsetY={OFFSET[1]}
              style={{ pointerEvents: 'all' }}
            >
              {CONSTANTS.BASE(numRows).map((width, i) => this.row(width, i))}
            </Base>
          </Svg>
        </Tooltip>

        <TornadoArrows
          rows={rows}
          selectedIndex={selectedIndex}
          amount={labels.length}
          containerWidth={containerWidth}
        />
      </Container>
    );
  }
}

export default TornadoChart;

const Container = styled.div`
  background: #fff;
  position: relative;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
  box-sizing: border-box;
`;

const Svg = styled.svg`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => `${height}px`};
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
`;

const Base = styled.g`
  transform: ${({ offsetX, offsetY }) =>
    `translate(${offsetX}px, ${offsetY}px)`};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};
`;

export const Rect = styled.rect`
  fill: ${({ fill }) => fill || 'transparent'};
  stroke: ${({ fill }) => fill || 'transparent'};
  stroke-width: 1px;
  transition: ${({ withTransition }) =>
    withTransition ? 'all 500ms' : 'all 0ms'};
  opacity: ${({ opacity = 1 }) => opacity};
`;

const Path = styled.path`
  fill: ${({ fill }) => fill || 'transparent'};
  stroke: ${({ fill }) => fill || 'transparent'};
  stroke-width: 1px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 300ms;
`;

const Label = styled.text`
  font-size: 12px;
  fill: rgb(55, 56, 58);
  text-anchor: middle;
  transition: all 300ms;
  pointer-events: none;
  opacity: ${({ opacity }) => opacity || 1};
`;
