import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col, ErrorPage} from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { ErrorPage } from 'app-components';

const MyComp = ({ renderer }) => (
  <div>
    ...
    <ErrorPage
    	title="Some error"
    	subtitle="Some sub-title"
    	buttonLabel="Go to store"
    />
  </div>
);
`;

export default class ErrorPageDoc extends React.Component {
  render() {
    const title = 'error page';
    const description = 'generic error page';

    return (
      <Base title={title} description={description} name="ErrorPage">
        <Row>
          <Col>
            <Snippet snippet={snippet} />
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledErrorPage
                title="Oops…Something went wrong"
                subtitle="A problem was encountered while installing App Name"
                buttonLabel="Back to Market"
                fixed={false}
                onClick={() => undefined}
            />
          </Col>
        </Row>
      </Base>
    );
  }
}

const StyledErrorPage = styled(ErrorPage)`
  min-height: 600px;
`;
