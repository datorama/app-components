import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Stepper from '../components/base/Stepper';
import { Row, Col } from '../components/index';

const snippet = `
import { Stepper } from 'app-components';

const MyComp = () => (
  <div>
    <Stepper />
  </div>
);
`;

class StepperDoc extends Component {
  state = {
    selected: 0
  };

  render() {
    const title = 'stepper';
    const description = 'stepper.';

    return (
      <Base title={title} description={description} name="Stepper">
        <Row align="stretch">
          <Col>
            <Highlight language="javascript">{snippet}</Highlight>
          </Col>
          <Col>
            <Box>
              <Stepper
                steps={[
                  { id: 0, label: 'My brand', enabled: true },
                  { id: 1, label: 'Competitors', enabled: true },
                  { id: 2, label: 'Summary', enabled: false }
                ]}
                currentStep={this.state.selected}
                selectStep={selected => this.setState({ selected })}
              />
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

export default withTheme(StepperDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;
