import React from 'react';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import { Row, Col } from '../components/index';

const snippet = `npm i --save git+ssh://git@github.com/datorama/app-components.git;`;

const theme = `
  import { AppTheme, lightTheme } from 'app-components';
  import {ThemeProvider} from 'styled-components';
  
  const App = () => (
    <AppTheme theme={lightTheme} provider={ThemeProvider}>
     ...app main
    </AppTheme>
  );
`;

const GettingStarted = () => {
  const title = 'Getting started';
  const description = '';

  return (
    <Base title={title} description={description}>
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
    </Base>
  );
};

export default GettingStarted;
