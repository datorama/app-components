import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <Tooltip title="tooltip content">
    <div style={{ color: theme.p600, fontSize: 12 }}>hover me</div>
  </Tooltip>
);
`;

const snippetLeft = `
() => (
  <Tooltip title="tooltip content" position="LEFT">
    <div style={{ color: theme.p600, fontSize: 12 }}>hover me</div>
  </Tooltip>
);
`;

const snippetLong = `
() => (
  <Tooltip
    long
    position="TOP"
    onClickInfo={console.log}
    title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam debitis eos harum."
  />
);
`;

const snippetFixed = `
() => (
  <Tooltip title="Lorem ipsum dolor sit amet" fixed>
    <div style={{ width: 100, height: 100, background: theme.p100 }} />
  </Tooltip>
);
`;

const TooltipDoc = () => {
  const title = 'tooltip';
  const description =
    'Tooltips display informative text when users hover over, focus on, or tap an element.';

  return (
    <Base title={title} description={description} name="Tooltip">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippetLeft} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippetLong} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet stretch snippet={snippetFixed} />
        </Col>
      </Row>
    </Base>
  );
};

export default TooltipDoc;
