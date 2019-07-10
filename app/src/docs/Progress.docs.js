import React from 'react';

// components
import Base from './Base';
import { Col, Row } from '../components/index';
import PropTable from './PropTable';
import Snippet from './Snippet';

const snippet = `
() => (
  <div style={{ width: '100%' }}>
    <Progress label="20%" percentage={20} color={theme.a300} />
    <Progress label="40%" percentage={30} color={theme.a400} />
    <Progress label="60%" percentage={60} color={theme.a500} />
    <Progress label="80%" percentage={80} color={theme.a600} />
    <Progress label="100%" percentage={100} color={theme.a700} />
  </div>
);
`;

const multiSnippet = `
() => (
  <div>
    <MultiProgress
      values={[
        { color: theme.a600, percentage: 40 },
        { color: theme.a500, percentage: 60 },
        { color: theme.a400, percentage: 80 },
        { color: theme.a300, percentage: 100 }
      ]}
    />
  </div>
);
`;

const radialSnippet = `
() => (
  <Row justify="space-evenly">
    <RadialProgress
      percentage={20}
      radius={26}
      color={theme.r300}
    />
    <RadialProgress
      percentage={40}
      radius={26}
      color={theme.o400}
    />
    <RadialProgress percentage={60} radius={26} />
    <RadialProgress
      percentage={100}
      radius={26}
      color={theme.g300}
    />
  </Row>
);
`;

function ProgressDoc() {
  const title = 'progress';
  const description = '';

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
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
      </Row>

      <Row>
        <Col>
          <PropTable compKey="RadialProgress" />
        </Col>
      </Row>
    </Base>
  );
}

export default ProgressDoc;
