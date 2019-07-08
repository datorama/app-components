import React from 'react';
import styled from 'styled-components';
// components
import Base from './Base';
import {
  Col,
  MultiProgress,
  Progress,
  RadialProgress,
  Row
} from '../components/index';
import PropTable from './PropTable';
import Snippet from './Snippet';
import * as PropTypes from 'prop-types';
import { useTheme } from '../hooks/theme.hooks';

const snippet = `
import { Progress } from '@datorama/app-components';

const MyComp = () => (
  <div>
    <Progress percentage={50} label="50%"/>
  </div>
);
`;

const multiSnippet = `
import { MultiProgress } from '@datorama/app-components';

const MyComp = () => (
  <div>
    <MultiProgress
      values={[
        {color: theme.g600, percentage: 40, label: 'custom label'},
        {color: theme.g500, percentage: 60},
        {color: theme.g400, percentage: 80},
        {color: theme.g300, percentage: 100}
      ]}
    />
  </div>
);
`;

const radialSnippet = `
import { RadialProgress } from '@datorama/app-components';

const MyComp = () => (
  <div>
    <RadialProgress
      percentage={50}
      label="success"
      color="red"
    />
  </div>
);
`;

function ProgressDoc() {
  const theme = useTheme();
  const title = 'progress';
  const description = '';

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>

        <Col>
          <Box>
            <Progress label="20%" percentage={20} color={theme.a300} />
            <Progress label="40%" percentage={30} color={theme.a400} />
            <Progress label="60%" percentage={60} color={theme.a500} />
            <Progress label="80%" percentage={80} color={theme.a600} />
            <Progress label="100%" percentage={100} color={theme.a700} />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <PropTable compKey="Progress" />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={multiSnippet} />
        </Col>

        <Col>
          <Box style={{ flexDirection: 'row' }}>
            <MultiProgress
              values={[
                { color: theme.a600, percentage: 40 },
                { color: theme.a500, percentage: 60 },
                { color: theme.a400, percentage: 80 },
                { color: theme.a300, percentage: 100 }
              ]}
            />

            <MultiProgress
              strokeWidth={6}
              innerRadius={40}
              gap={18}
              meterColor="transparent"
              values={[
                { color: theme.g600, percentage: 30, label: 'custom label' },
                { color: theme.g500, percentage: 70 },
                { color: theme.g400, percentage: 90, label: 'custom label' }
              ]}
            />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <PropTable compKey="MultiProgress" />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={radialSnippet} />
        </Col>

        <Col>
          <Box>
            <Row>
              <Col>
                <RadialProgress
                  percentage={20}
                  radius={26}
                  color={theme.r300}
                />
              </Col>
              <Col>
                <RadialProgress
                  percentage={40}
                  radius={26}
                  color={theme.o400}
                />
              </Col>
              <Col>
                <RadialProgress percentage={60} radius={26} />
              </Col>
              <Col>
                <RadialProgress
                  percentage={100}
                  radius={26}
                  color={theme.g300}
                />
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <PropTable compKey="RadialProgress" />
        </Col>
      </Row>
    </Base>
  );
}

ProgressDoc.propTypes = { theme: PropTypes.any };

export default ProgressDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 40px;
  justify-content: space-evenly;
  background: ${({ theme }) => theme.p50};
`;
