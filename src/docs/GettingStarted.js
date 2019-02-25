import React from 'react';
import Highlight from 'react-highlight-js';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col } from '../components/index';

const snippet = `npm i --save git+ssh://git@github.com/datorama/app-components.git`;

const theme = `
  import { AppTheme, lightTheme } from 'app-components';
  import {ThemeProvider} from 'styled-components';
  
  const App = () => (
    <AppTheme theme={lightTheme} provider={ThemeProvider}>
     ...app main
    </AppTheme>
  );
`;

const components = `
  import { Button } from 'app-components';
  
  const MyComp = ({ handleClick }) => (
    <div>
     ...your comp
     <Button onClick={handleClick}>click here</Button>
    <div>
  );
`;

const styling = `
  const MyComp = styled.div'
    // typography
    $\{({ theme }) => theme.text.smLink};
    
    // animations
    $\{({ theme }) => theme.animation.fadeLeft};
    
    // colors
    color: $\{({ theme }) => theme.p400};
  ';
`;

const GettingStarted = () => {
  const title = 'Getting started';
  const description = '';

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Title>Setup</Title>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{theme}</Highlight>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Title>Components example</Title>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{components}</Highlight>
        </Col>
      </Row>
  
      <Row align="stretch">
        <Col>
          <Title>Styling example</Title>
        </Col>
      </Row>
  
      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{styling}</Highlight>
        </Col>
      </Row>
    </Base>
  );
};

export default GettingStarted;

const Title = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;
