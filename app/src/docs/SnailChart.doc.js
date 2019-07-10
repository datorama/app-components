import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <SnailChart
    dividers={5}
    data={[
      {
        percentage: 75,
        color: theme.a200
      },
      {
        percentage: 63,
        color: theme.a300
      },
      {
        percentage: 50,
        color: theme.a400
      },
      {
        percentage: 38,
        color: theme.a500
      },
      {
        percentage: 80,
        color: theme.a600
      },
      {
        percentage: 90,
        color: theme.a700
      },
      {
        percentage: 100,
        color: theme.a800
      }
    ]}
  />
);
`;

const round = `
() => (
  <SnailChart
    dividers={10}
    linecap="round"
    data={[
      {
        label: 'first label',
        percentage: 75,
        color: theme.g300,
        hoverColor: theme.g600
      },
      {
        label: 'second label',
        percentage: 63,
        color: theme.g400,
        hoverColor: theme.g600
      },
      {
        label: 'third label',
        percentage: 50,
        color: theme.g500,
        hoverColor: theme.g600
      }
    ]}
  />
);
`;

const SnailChartDoc = () => {
  const title = 'Snail Chart';
  const description = 'A multi progress chart.';

  return (
    <Base title={title} description={description} name="SnailChart">
      <Row>
        <Col>
          <Snippet snippet={snippet} stretch />
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={round} stretch />
        </Col>
      </Row>
    </Base>
  );
};

export default SnailChartDoc;
