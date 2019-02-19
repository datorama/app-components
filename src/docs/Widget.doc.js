import React from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Widget from '../components/base/Widget';
import { Row, Col } from '../components/index';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

const snippet = `
import { Widget } from 'app-components';

const MyComp = () => (
  <Widget>
    ...
  </Widget>
);
`;

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const WidgetDoc = ({ theme }) => {
  const title = 'widget';
  const description = 'description.';

  return (
    <Base title={title} description={description} name="Widget">
      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <Widget>
              <ResponsiveContainer width="100%" aspect={8}>
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke={theme.a500}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Widget>
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <Widget disabled>
              <ResponsiveContainer width="100%" aspect={8}>
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke={theme.a500}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Widget>
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <Widget loading={true} />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <Widget />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <Widget />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withTheme(WidgetDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  box-sizing: border-box;
  padding: 20px;
`;
