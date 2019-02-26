import React from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight.js';

// components
import Base from './Base';
import {Row, Col, Collapse} from 'app-components';

const snippet = `
import { Collapse } from 'app-components';

const MyComp = () => (
  <Collapse>
    ...
  </Collapse>
);
`;

const CollapseDoc = props => {
  const title = 'collapse';
  const description = 'collapse.';

  return (
    <Base title={title} description={description} name="Collapse">
      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <StyledCollapse label="collapse label">
              <Demo>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                cupiditate dolores exercitationem numquam perferendis rem.
                Aliquid aut cupiditate eligendi illo minima molestias nihil
                pariatur provident quibusdam reiciendis sequi, similique veniam
                vero. Aliquid aut corporis dignissimos doloremque, eum
                exercitationem expedita, fugit harum id incidunt laboriosam
                magni molestias nam neque obcaecati odio odit officia optio
                perferendis quae quaerat quas repellat rerum sequi suscipit
                temporibus, vero voluptates. Distinctio dolorum eligendi
                molestiae nihil nobis? Aliquam culpa dolor eligendi itaque
                omnis? Accusantium amet aperiam architecto at, beatae,
                blanditiis deleniti
              </Demo>
            </StyledCollapse>

            <StyledCollapse label="collapse label">
              <Demo>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                cupiditate dolores exercitationem numquam perferendis rem.
                Aliquid aut cupiditate eligendi illo minima molestias nihil
              </Demo>
            </StyledCollapse>
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withTheme(CollapseDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  box-sizing: border-box;
  flex-direction: column;
  padding: 40px;
`;

const StyledCollapse = styled(Collapse)`
  margin-bottom: 5px;
`;

const Demo = styled.div`
  ${({ theme }) => theme.text.sm};
  line-height: 20px;
  box-sizing: border-box;
  padding: 10px 0;
`;
