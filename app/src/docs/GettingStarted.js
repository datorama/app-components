import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
// NPM
npm i --save @datorama/app-components

// Yarn
yarn add @datorama/app-components
`;

const theme = `
import { AppTheme, lightTheme } from '@datorama/app-components';
import { ThemeProvider } from 'styled-components';

const App = () => (
  <AppTheme theme={lightTheme} provider={ThemeProvider}>
   { /* your app goes here*/ }
  </AppTheme>
);
`;

const components = `
import { Button } from '@datorama/app-components';

const MyComp = ({ handleClick }) => (
  <div>
   ...
   <Button onClick={handleClick}>click here</Button>
  <div>
);
`;

const cssStyle = `
// add to the main css file
@import '~@datorama/app-components/dist/index.css';
`;

const styling = `
// styled component example
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
          <Snippet snippet={snippet} plain language="bash" />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={theme} plain />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={cssStyle} plain language="css" />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Title>Components example</Title>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={components} plain />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Title>Styling</Title>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={styling} plain language="javascript" />
        </Col>
      </Row>
    </Base>
  );
};

export default GettingStarted;

const Title = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;
