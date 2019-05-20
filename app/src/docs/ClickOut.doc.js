import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, ClickOut } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { ClickOut } from '@datorama/app-components';

const MyComponent = ({ onClick }) => (
  <ClickOut onClick={onClick}>
    sample component
  </ClickOut>
);
`;

export default class ClickOutDoc extends React.Component {
  state = {
    counter: 0
  };

  handleClick = () =>
    this.setState(prevState => ({ counter: prevState.counter + 1 }));

  render() {
    const { counter } = this.state;
    const title = 'click out';
    const description = 'click outside handler.';

    return (
      <Base title={title} description={description} name="ClickOut">
        <Row>
          <Col>
            <Snippet snippet={snippet} />
          </Col>
        </Row>

        <Row>
          <Col>
            <Container>
              <ClickOut onClick={this.handleClick}>
                <Card>
                  <Title>Clicked {counter} times</Title>
                  <Description>(click outside the element)</Description>
                </Card>
              </ClickOut>
            </Container>
          </Col>
        </Row>
      </Base>
    );
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.p50};
`;

const Card = styled.div`
	width: 400px;
	height: 200px;
	background: ${({ theme }) => theme.p0}
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	font-weight: 300;
	color: #444;
`;

const Title = styled.div`
  ${({ theme }) => theme.text.pBold};
`;

const Description = styled.div`
  ${({ theme }) => theme.text.pNote};
`;
