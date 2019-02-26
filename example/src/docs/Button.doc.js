import React, { Component } from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';

// components
import Base from './Base';
import {Row, Col, Button, SegmentedButton} from 'app-components';

const defaultButton = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button onClick={onClick}>
    Click Me
  </Button>
);
`;

const segmentedButton = `
import { SegmentedButton } from 'app-components';

// section = {id: 0, label: 'section label'}
const MyComponent = ({ onClick, selected, sections }) => (
  <SegmentedButton
    onClick={onClick}
    selected={selected}
    sections={sections}
  />
);
`;

const disabled = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button disabled onClick={onClick}>
    Click Me
  </Button>
);
`;

const small = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button small onClick={onClick}>
    Click Me
  </Button>
);
`;

const secondary = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button secondary onClick={onClick}>
    Click Me
  </Button>
);
`;

const smallSecondary = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button small secondary onClick={onClick}>
    Click Me
  </Button>
);
`;

const round = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button round onClick={onClick}>
    Click Me
  </Button>
);
`;

const secondarySmallRound = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button secondary small round onClick={onClick}>
    Click Me
  </Button>
);
`;

class ButtonDoc extends Component {
  state = {
    selected: 0
  };

  render() {
    const title = 'button';
    const description =
      'Buttons allow users to take actions, and make choices, with a single tap. They are typically placed throughout your UI, in places like Dialogs, Forms or Cards.';

    return (
      <Base title={title} description={description} name="Button">
        <Row>
          <Col>
            <Highlight language="javascript">{defaultButton}</Highlight>
          </Col>
          <Col>
            <Box>
              <Button onClick={() => null}>Default</Button>
            </Box>
          </Col>
        </Row>

        <Row align="stretch">
          <Col>
            <Highlight language="javascript">{segmentedButton}</Highlight>
          </Col>
          <Col>
            <Box>
              <SegmentedButton
                sections={[
                  { id: 0, label: 'Small' },
                  { id: 1, label: 'Medium' },
                  { id: 2, label: 'Large' }
                ]}
                selected={this.state.selected}
                onClick={selected => this.setState({ selected })}
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <Highlight language="javascript">{disabled}</Highlight>
          </Col>
          <Col>
            <Box>
              <Button disabled onClick={() => null}>
                Disabled
              </Button>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <Highlight language="javascript">{small}</Highlight>
          </Col>
          <Col>
            <Box>
              <Button small onClick={() => null}>
                Small
              </Button>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <Highlight language="javascript">{secondary}</Highlight>
          </Col>
          <Col>
            <Box>
              <Button secondary onClick={() => null}>
                Secondary
              </Button>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <Highlight language="javascript">{smallSecondary}</Highlight>
          </Col>
          <Col>
            <Box>
              <Button secondary small onClick={() => null}>
                Small secondary
              </Button>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <Highlight language="javascript">{round}</Highlight>
          </Col>
          <Col>
            <Box>
              <Button round onClick={() => null}>
                +
              </Button>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <Highlight language="javascript">{secondarySmallRound}</Highlight>
          </Col>
          <Col>
            <Box>
              <Button secondary small round onClick={() => null}>
                +
              </Button>
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

export default ButtonDoc;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 160px;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;
