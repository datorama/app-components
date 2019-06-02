import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Stepper } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Stepper } from '@datorama/app-components';

// step: { id: 0, label: '', touched: false, enabled: true }
const MyComp = ({ steps, selected, selectStep }) => (
  <div>
    <Stepper
      steps={steps}
      currentStep={selected}
      selectStep={selectStep}
    />
  </div>
);
`;

class StepperDoc extends Component {
  state = {
    selected: 1
  };

  render() {
    const title = 'stepper';
    const description = 'stepper.';

    return (
      <Base title={title} description={description} name="Stepper">
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
          <Col>
            <Box>
              <Stepper
                steps={[
                  { id: 0, label: 'My brand', enabled: true, touched: true },
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
