import React from 'react';
import styled, { css } from 'styled-components';

// components
import Base from './Base';
import {Row, Col} from 'app-components';
import Snippet from './Snippet';

const snippet = `
// add a css block snippet inside a styled component

// default fade
({ theme }) => theme.animation.fade;

// fade left
({ theme }) => theme.animation.fadeLeft;
`;

class AnimatedCard extends React.Component {
  state = {
    animate: true
  };

  animate = () => {
    this.setState({ animate: false }, () => {
      setTimeout(() => {
        this.setState({ animate: true });
      }, 500);
    });
  };

  render() {
    const { animate } = this.state;
    const { type } = this.props;

    return (
      <Card onClick={this.animate}>
        <Hint>click to animate ({type})</Hint>
        <Anim type={type} animate={animate}>
          <Element />
        </Anim>
      </Card>
    );
  }
}

const AnimationsDoc = () => {
  const title = 'animations';
  const description =
    'Animations helps make a UI expressive and easy to use. @todo: support exit animations.';

  return (
    <Base title={title} description={description}>
      <Row>
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row>
        <Col>
          <AnimatedCard type="fade" />
        </Col>

        <Col>
          <AnimatedCard type="fadeOut" />
        </Col>

        <Col>
          <AnimatedCard type="fadeLeft" />
        </Col>

        <Col>
          <AnimatedCard type="fadeRight" />
        </Col>
      </Row>

      <Row>
        <Col>
          <AnimatedCard type="fadeUp" />
        </Col>

        <Col>
          <AnimatedCard type="fadeDown" />
        </Col>

        <Col>
          <AnimatedCard type="zoomIn" />
        </Col>

        <Col>
          <AnimatedCard type="zoomOut" />
        </Col>
      </Row>
    </Base>
  );
};

export default AnimationsDoc;

const Card = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.p0};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Anim = styled.div`
  opacity: 1;
  ${({ type }) =>
    type === 'fadeOut' &&
    css`
      opacity: 1;
    `};

  ${({ type, theme, animate }) => animate && theme.animation[type]};
`;

const Hint = styled.div`
  ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.p200};
  margin-bottom: 20px;
`;

const Element = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 2px;
  background: ${({ theme }) => theme.a600};
`;
