import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Widget, Row, Col, TagGroup, MultiProgress } from '../components/index';
import Snippet from './Snippet';
import { useTheme } from '../hooks/theme.hooks';

const regular = `
import { Widget } from '@datorama/app-components';

const MyComp = () => (
  <Widget>
    ...
  </Widget>
);
`;

const disabled = `
import { Widget } from '@datorama/app-components';

const MyComp = () => (
  <Widget disabled>
    ...
  </Widget>
);
`;

const loading = `
import { Widget } from '@datorama/app-components';

const MyComp = () => (
  <Widget loading>
    ...
  </Widget>
);
`;

const empty = `
import { Widget } from '@datorama/app-components';

const MyComp = () => (
  <Widget empty>
    ...
  </Widget>
);
`;

const error = `
import { Widget } from '@datorama/app-components';

const MyComp = ({ fetchData }) => (
  <Widget error onTryAgain={fetchData}>
    ...
  </Widget>
);
`;

const Chart = ({ theme }) => (
  <ChartInner>
    <StyledTagGroup
      selected={['a', 'c']}
      onChange={() => null}
      tags={[
        { id: 'a', label: 'Account Growth' },
        { id: 'b', label: 'BDR Prospecting' },
        { id: 'c', label: 'CPL Vendor' }
      ]}
    />
    <StyledRow>
      <StyledMultiProgress
        values={[
          { color: theme.o600, percentage: 40 },
          { color: theme.o500, percentage: 60 },
          { color: theme.o400, percentage: 80 },
          { color: theme.o300, percentage: 100 }
        ]}
      />

      <StyledMultiProgress
        values={[
          { color: theme.r600, percentage: 60 },
          { color: theme.r500, percentage: 20 },
          { color: theme.r400, percentage: 90 },
          { color: theme.r300, percentage: 50 }
        ]}
      />

      <StyledMultiProgress
        values={[
          { color: theme.g600, percentage: 40 },
          { color: theme.g500, percentage: 60 },
          { color: theme.g400, percentage: 80 },
          { color: theme.g300, percentage: 100 }
        ]}
      />
    </StyledRow>
  </ChartInner>
);

const WidgetDoc = () => {
  const theme = useTheme();
  const title = 'widget';
  const description = 'Common widget wrapper';

  return (
    <Base title={title} description={description} name="Widget">
      <Row>
        <Col>
          <Title>Default</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={regular} />
        </Col>
        <Col>
          <Box>
            <Widget>
              <Chart theme={theme} />
            </Widget>
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Disabled</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={disabled} />
        </Col>
        <Col>
          <Box>
            <Widget disabled>
              <Chart theme={theme} />
            </Widget>
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Loading</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={loading} />
        </Col>
        <Col>
          <Box>
            <Widget loading={true} />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Empty state</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={empty} />
        </Col>
        <Col>
          <Box>
            <Widget empty={true} />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Error state</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={error} />
        </Col>
        <Col>
          <Box>
            <Widget error={true} />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default WidgetDoc;

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

const Title = styled.div`
  width: 100%;
  ${({ theme }) => theme.text.subHeadline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const ChartInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMultiProgress = styled(MultiProgress)`
  width: 140px;
  height: 140px;
`;

const StyledRow = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;
