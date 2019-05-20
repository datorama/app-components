import React, { Fragment } from 'react';
import styled, { withTheme } from 'styled-components';

// components
import Base from './Base';
import { Widget, Row, Col, TagGroup } from '../components/index';
import Snippet from './Snippet';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

const snippet = `
import { Widget } from '@datorama/app-components';

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

const Chart = ({ theme }) => (
  <Fragment>
    <StyledTagGroup
      selected={['a', 'c']}
      onChange={() => null}
      tags={[
        { id: 'a', label: 'Account Growth' },
        { id: 'b', label: 'BDR Prospecting' },
        { id: 'c', label: 'CPL Vendor' }
      ]}
    />
    <ResponsiveContainer width="100%" aspect={8}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="pv"
          stroke={theme.a400}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </Fragment>
);

const WidgetDoc = ({ theme }) => {
  const title = 'widget';
  const description = 'description.';

  return (
    <Base title={title} description={description} name="Widget">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <Widget>
              <Chart theme={theme} />
            </Widget>
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <Widget disabled>
              <Chart theme={theme} />
            </Widget>
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <Widget loading={true} />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <Widget />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
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

const StyledTagGroup = styled(TagGroup)`
  margin-bottom: 20px;
`;
