import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Checkbox, Row, Col, Toggle } from '../components/index';
import PropTable from './PropTable';
import Snippet from './Snippet';

const snippet = `
() => {
  const [checked, setCheck] = useState(true);
  const toggleCheck = useCallback(() => setCheck(!checked), [checked]);

  return (
    <div
      style={{
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}
    >
      <Checkbox
        onClick={toggleCheck}
        checked={checked}
        label="default"
      />
      <Checkbox
        onClick={toggleCheck}
        checked={checked}
        partial
        label="default"
      />
      <Checkbox
        onClick={toggleCheck}
        checked={checked}
        disabled
        label="disabled"
      />
      <Checkbox
        onClick={toggleCheck}
        checked
        disabled
        label="disabled"
      />
      <Checkbox
        onClick={toggleCheck}
        checked={checked}
        round
        label="round"
      />
      <Checkbox
        onClick={toggleCheck}
        checked={checked}
        disabled
        round
        label="round disabled"
      />
    </div>
  );
};
`;

const toggleSnippet = `
() => {
  const [checked, setCheck] = useState(true);
  const toggleCheck = useCallback(() => setCheck(!checked), [checked]);
  
  return (
    <div
      style={{
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}
    >
      <Toggle onClick={toggleCheck} checked={checked} label="default" />
      <Toggle
        onClick={toggleCheck}
        checked={checked}
        label="default"
        disabled
      />
    </div>
  );
};
`;

export default class TogglesDoc extends React.Component {
  render() {
    const title = 'toggles';
    const description =
      'Selection controls allow users to complete tasks that involve making choices such as selecting options, or switching settings on or off. Selection controls are found on screens that ask users to make decisions or declare preferences such as settings or dialogs.';

    return (
      <Base title={title} description={description}>
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
        </Row>

        <StyledRow>
          <Col size={6}>
            <PropTable compKey="Checkbox" />
          </Col>
        </StyledRow>

        <Row align="stretch">
          <Col>
            <Snippet snippet={toggleSnippet} />
          </Col>
        </Row>

        <StyledRow>
          <Col size={6}>
            <PropTable compKey="Toggle" />
          </Col>
        </StyledRow>
      </Base>
    );
  }
}

const StyledRow = styled(Row)`
  margin-bottom: 40px;
`;
