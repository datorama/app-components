import React from 'react';
import styled, { withTheme } from 'styled-components';

// components
import Base from './Base';
import { Tooltip, Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Tooltip } from '@datorama/app-components';

const MyComp = () => (
  <Tooltip title="tooltip content">
    ...content
  </Tooltip>
);
`;

const snippetLeft = `
import { Tooltip } from '@datorama/app-components';

const MyComp = () => (
  <Tooltip title="tooltip content" position="LEFT">
    ...content
  </Tooltip>
);
`;

const snippetLong = `
import { Tooltip } from '@datorama/app-components';

const MyComp = ({ navigate }) => (
  <div>
    <Tooltip
      title="tooltip content"
      long
      onClickInfo={navigate}
    >
      ...content
    </Tooltip>
  </div>
);
`;

const snippetFixed = `
import { Tooltip } from '@datorama/app-components';

const MyComp = () => (
  <div>
    <Tooltip
      title="tooltip content"
      fixed
    >
      ...content
    </Tooltip>
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
          <Snippet snippet={snippet} />
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
          <Snippet snippet={snippetLeft} />
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
          <Snippet snippet={snippetLong} />
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

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippetFixed} />
        </Col>
        <Col>
          <Box>
            <Tooltip title="Lorem ipsum dolor sit amet" fixed>
              <Rect />
            </Tooltip>
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

const Rect = styled.div`
  width: 100px;
  height: 100px;
  background: ${({ theme }) => theme.p200};
`;
