import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { fill, size, isNil } from 'lodash/fp';

import { MAIN_COLORS } from './tornado.constants';

import TornadoChart from './TornadoChart';

class Tornado extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string),
      rows: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          data: PropTypes.oneOf([
            PropTypes.arrayOf(PropTypes.number),
            undefined
          ]),
          label: PropTypes.string,
          totalValue: PropTypes.number,
          totalPercentage: PropTypes.string,
          placeholderMessage: PropTypes.string,
          onPlaceholderClick: PropTypes.func
        })
      ),
      stats: PropTypes.array,
      topLabelRenderer: PropTypes.func
    }),
    initialIndex: PropTypes.number
  };

  state = {
    selectedIndex: 0
  };

  selectIndex = selectedIndex => this.setState({ selectedIndex });

  componentDidMount() {
    const {
      data: { labels },
      initialIndex
    } = this.props;

    if (!isNil(initialIndex)) {
      this.selectIndex(initialIndex);
    } else {
      const middle = Math.floor(labels.length / 2);

      this.selectIndex(middle);
    }
  }

  topStrip() {
    const { data, topLabelRenderer = () => {}, theme } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Row className="tornado top-strip top-strip-container">
        {data.labels.map((label, i) => (
          <Col
            key={`label-${i}`}
            onClick={() => this.selectIndex(i)}
            className="tornado top-strip top-strip-column"
          >
            {topLabelRenderer({
              text: label,
              pathColor: MAIN_COLORS(theme)[i % 5],
              isSelected: selectedIndex === i
            })}
          </Col>
        ))}
      </Row>
    );
  }

  bottomStrip() {
    const { data, theme, bottomStatsRenderer = () => {} } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Row className="tornado bottom-strip bottom-strip-container">
        {data.stats.map((stat, i) => (
          <BottomCol
            className="tornado bottom-strip bottom-strip-column"
            key={`stat-${i}`}
            onClick={() => this.selectIndex(i)}
            selected={selectedIndex === i}
          >
            {bottomStatsRenderer({
              stats: stat,
              pathColor: MAIN_COLORS(theme)[i],
              isSelected: selectedIndex === i
            })}
          </BottomCol>
        ))}
      </Row>
    );
  }

  render() {
    const { data, className = '' } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Container className={className}>
        {this.topStrip()}
        <TornadoChart
          labels={data.labels}
          rows={data.rows || fill(null, 0, size(data.labels), [])}
          stats={data.stats}
          selectedIndex={selectedIndex}
          selectIndex={this.selectIndex}
        />

        {this.bottomStrip()}
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  position: relative;

  * {
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  animation: 1s ease-out 0s 1 fadeIn forwards;
  animation-delay: 500ms;

  @keyframes fadeIn {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Col = styled.div`
  flex: 1;
  transition: all 300ms;
  cursor: pointer;
  min-height: 80px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  animation: 1s ease-out 0s 1 fadeIn forwards;
  animation-delay: 500ms;
  width: 100%;

  &:only-child {
    align-items: center;
  }

  @keyframes fadeIn {
    100% {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
`;

const BottomCol = styled(Col)`
  align-items: flex-start;
  justify-content: flex-start;
`;

export default withTheme(Tornado);
