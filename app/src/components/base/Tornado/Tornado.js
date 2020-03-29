import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { MAIN_COLORS } from './tornado.constants';

import TornadoChart from './TornadoChart';

export default class Tornado extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
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
      topLabelRenderer: PropTypes.func
    })
  };

  state = {
    selectedIndex: 0
  };

  selectIndex = selectedIndex => this.setState({ selectedIndex });

  componentDidMount() {
    const { labels } = this.props.data;
    const middle = Math.floor(labels.length / 2);

    this.selectIndex(middle);
  }

  topStrip() {
    const { data, topLabelRenderer = () => {} } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Row>
        {data.labels.map((label, i) => (
          <Col key={`label-${i}`} onClick={() => this.selectIndex(i)}>
            {topLabelRenderer({
              text: label,
              pathColor: MAIN_COLORS[i % 5],
              isSelected: selectedIndex === i
            })}
          </Col>
        ))}
      </Row>
    );
  }

  bottomStrip() {
    const { data, bottomStatsRenderer = () => {} } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Row>
        {data.stats.map((stat, i) => (
          <BottomCol
            key={`stat-${i}`}
            onClick={() => this.selectIndex(i)}
            selected={selectedIndex === i}
          >
            {bottomStatsRenderer({
              stats: stat,
              pathColor: MAIN_COLORS[i],
              isSelected: selectedIndex === i
            })}
          </BottomCol>
        ))}
      </Row>
    );
  }

  render() {
    const { data } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Container>
        {this.topStrip()}

        <TornadoChart
          labels={data.labels}
          rows={data.rows}
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
  padding: 0 20px;

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
  padding: 20px;
`;
