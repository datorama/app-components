import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Sticky } from '../components/index';
import Snippet from './Snippet';
import PropTable from './PropTable';

const snippet = `
import { Sticky } from 'app-components';

const MyComp = () => (
  <Sticky>
    ...content
  </Sticky>
);
`;

class StickyDoc extends Component {
  state = {
    fixed: false
  };

  render() {
    const title = 'fixed bar';
    const description = 'relative - fixed bar';
    const { fixed } = this.state;

    return (
      <Base title={title} description={description}>
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
        </Row>

        <Row>
          <Col>
            <PropTable compKey="Sticky" />
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledSticky
              fixed={fixed}
              onChange={({ fixed }) => this.setState({ fixed })}
            >
              Sticky bar
            </StyledSticky>
          </Col>
        </Row>
        <Spacer />
      </Base>
    );
  }
}

export default withTheme(StickyDoc);

const StyledSticky = styled(Sticky)`
  width: 500px;
  height: 50px;
  background: ${({ theme }) => theme.p0};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  ${({ theme }) => theme.text.sm};
`;

const Spacer = styled.div`
  width: 100%;
  height: 200vh;
`;
