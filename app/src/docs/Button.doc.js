import React from 'react';
// components
import Snippet from './Snippet';
import Base from './Base';
import { Col, Row } from '../components/index';

const defaultButton = `() => (
  <Button onClick={() => null}>
    Default Button
  </Button>
);`;

const segmentedButton = `() => {
    const [selected, setSelected] = useState(0);

  return (
    <SegmentedButton
      onClick={setSelected}
      selected={selected}
      sections={[
        {id: 0, label: 'Yes'},
        {id: 1, label: 'No'},
        {id: 2, label: 'Maybe'}
      ]}
    />
  );
}`;

const disabled = `() => (
  <Button disabled onClick={() => null}>
    Disabled Button
  </Button>
);`;

const small = `() => (
  <Button small onClick={() => null}>
    Small Button
  </Button>
);`;

const secondary = `() => (
  <Button secondary onClick={() => null}>
    Secondary Button
  </Button>
);`;

const smallSecondary = `() => (
  <Button small secondary onClick={() => null}>
    Small & Secondary
  </Button>
);`;

const round = `() => (
  <Button round onClick={() => null}>
    +
  </Button>
);`;

const secondarySmallRound = `() => (
  <Button secondary small round onClick={() => null}>
    +
  </Button>
);`;

const ButtonDoc = () => {
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
      </Row>

      <Row>
        <Col>
          <Snippet snippet={small} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={secondary} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={smallSecondary} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={round} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={secondarySmallRound} />
        </Col>
      </Row>
    </Base>
  );
};

export default ButtonDoc;
