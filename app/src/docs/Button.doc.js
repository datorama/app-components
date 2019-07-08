import React, { Component } from 'react';
import styled from 'styled-components';

// components
import Snippet from './Snippet';
import Base from './Base';
import { Row, Col, Button, SegmentedButton } from '../components/index';

const defaultButton = `({ onClick }) => (
  <Button onClick={onClick}>
    Default Button
  </Button>
);`;

const segmentedButton = `({ onClick, selected, sections }) => (
  <SegmentedButton
    onClick={onClick}
    selected={0}
    sections={[
      {id: 0, label: 'Yes'},
      {id: 1, label: 'No'},
      {id: 2, label: 'Maybe'},
    ]}
  />
);`;

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
    +
  </Button>
);
`;

const secondarySmallRound = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button secondary small round onClick={onClick}>
    +
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
            <Snippet snippet={defaultButton} />
          </Col>
        </Row>

        <Row align="stretch">
          <Col>
            <Snippet snippet={segmentedButton} />
          </Col>
        </Row>

        <Row>
          <Col>
            <Snippet snippet={disabled} />
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
            <Snippet snippet={small} />
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
            <Snippet snippet={secondary} />
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
            <Snippet snippet={smallSecondary} />
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
            <Snippet snippet={round} />
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
            <Snippet snippet={secondarySmallRound} />
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
