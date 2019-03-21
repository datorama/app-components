import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

// components
import Base from './Base';
import Snippet from './Snippet';
import { Row, Col, Collapse, Collapsible, Button } from '../components/index';
import PropTable from './PropTable';

const snippet = `
import { Collapse } from 'app-components';

const MyComp = () => (
  <Collapse label="My label">
    ...content
  </Collapse>
);
`;

const collapsibleSnippet = `
import { Collapsible } from 'app-components';

const MyComp = ({ open, toggleOpen ) => (
  <Collapsible open={open} toggleOpen={toggleOpen}>
    ...content
  </Collapsible>
);
`;

class CollapseDoc extends Component {
  state = {
    open: false
  };

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }));

  render() {
    const title = 'collapse';
    const description = 'collapse.';

    return (
      <Base title={title} description={description}>
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
          <Col>
            <Box>
              <StyledCollapse label="collapse label">
                <Demo>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Animi cupiditate dolores exercitationem numquam perferendis
                  rem. Aliquid aut cupiditate eligendi illo minima molestias
                  nihil pariatur provident quibusdam reiciendis sequi, similique
                  veniam vero. Aliquid aut corporis dignissimos doloremque, eum
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Animi cupiditate dolores exercitationem numquam perferendis
                  rem. Aliquid aut cupiditate eligendi illo minima molestias
                  nihil
                </Demo>
              </StyledCollapse>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <PropTable compKey="Collapse" />
          </Col>
        </Row>

        <Row align="stretch">
          <Col>
            <Snippet snippet={collapsibleSnippet} />
          </Col>
          <Col>
            <Box>
              <Button onClick={this.toggleOpen}>Toggle content</Button>
              <Collapsible open={this.state.open} toggleOpen={this.toggleOpen}>
                <Row>
                  <Col>
                    <SmallBox />
                  </Col>
                  <Col>
                    <SmallBox />
                  </Col>
                  <Col>
                    <SmallBox />
                  </Col>
                  <Col>
                    <SmallBox />
                  </Col>
                </Row>
              </Collapsible>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <PropTable compKey="Collapsible" />
          </Col>
        </Row>
      </Base>
    );
  }
}

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
  line-height: 24px;
`;

const SmallBox = styled.div`
  width: 100%;
  height: 20px;
  background: ${({ theme }) => theme.p200};
`;
