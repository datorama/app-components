import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, SnailChart, Card } from '../components/index';
import Snippet from './Snippet';
import { useTheme } from '../hooks/theme.hooks';

const snippet = `
// inside a component
import { SnailChart } from '@datorama/app-components';

const data = [
  { label: '', color: theme.a400, percentage: 50 },
  { label: '', color: theme.a500, percentage: 60 },
  { label: '', color: 'red', percentage: 70 }
];

const MyComp = () => (
  <div>
    <SnailChart
    	linecap="none" // round
    	dividers={5}
    	data={data}
    />
  </div>
);
`;

const round = `
// inside a component
import { SnailChart } from '@datorama/app-components';

const data = [
  { label: '', color: theme.g400, percentage: 50, hoverColor: theme.g600 },
  { label: '', color: theme.g500, percentage: 60, hoverColor: theme.g600 },
  { label: '', color: theme.g500, percentage: 70, hoverColor: theme.g600 }
];

const MyComp = () => (
  <div>
    <SnailChart
    	linecap="round"
    	dividers={10}
    	data={data}
    />
  </div>
);
`;

const SnailChartDoc = () => {
  const theme = useTheme();
  const title = 'Snail Chart';
  const description = '';

  return (
    <Base title={title} description={description} name="SnailChart">
      <Row>
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <StyledCard>
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
          </StyledCard>
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={round} />
        </Col>
        <Col>
          <StyledCard>
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
          </StyledCard>
        </Col>
      </Row>
    </Base>
  );
};

export default SnailChartDoc;

const StyledCard = styled(Card)`
  align-items: center;
  justify-content: center;
  display: flex;
`;
