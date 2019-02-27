import React from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight.js';

// components
import Base from './Base';
import {Tooltip, Row, Col} from '../components/index';

const snippet = `
import { Tooltip } from '../components/index';

const MyComp = () => (
  <Tooltip title="tooltip content">
    ...content
  </Tooltip>
);
`;

const snippetLeft = `
import { Tooltip } from '../components/index';

const MyComp = () => (
  <Tooltip title="tooltip content" position="LEFT">
    ...content
  </Tooltip>
);
`;

const snippetLong = `
import { Tooltip } from '../components/index';

const MyComp = ({ navigate }) => (
  <div>
    <Tooltip
      title="tooltip content"
      long
      onClickInfo={navigate}
    />
  </div>
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
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <Tooltip title="tooltip content">
              <Demo>hover me</Demo>
            </Tooltip>
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippetLeft}</Highlight>
        </Col>
        <Col>
          <Box>
            <Tooltip title="tooltip content" position="LEFT">
              <Demo>hover me</Demo>
            </Tooltip>
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippetLong}</Highlight>
        </Col>
        <Col>
          <Box>
            <Tooltip
              title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam debitis eos harum non, odio placeat porro rem reprehenderit voluptatum"
              long
              position="TOP"
              onClickInfo={() => console.log('clicked!')}
            />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withTheme(TooltipDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;

const Demo = styled.div`
  ${({ theme }) => theme.text.p};
`;
