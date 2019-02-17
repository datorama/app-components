import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Popup from '../components/base/Popup';
import { Row, Col } from '../components/index';

const snippet = `
import { Popup } from 'app-components';

const MyComp = () => (
  <div>
    <Popup />
  </div>
);
`;

class PopupDoc extends Component {
  state = {
    open: false
  };

  render() {
    const title = 'popup';
    const description = 'popup.';

    return (
      <Base title={title} description={description} name="Popup">
        <Row align="stretch">
          <Col>
            <Highlight language="javascript">{snippet}</Highlight>
          </Col>
          <Col>
            <Box>
              <Popup open={this.state.open}>
                <Inner
                  onMouseEnter={() => this.setState({ open: true })}
                  onMouseLeave={() => this.setState({ open: false })}
                />
              </Popup>
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

export default withTheme(PopupDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;

const Inner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: ${({ theme }) => theme.a500};
`;
