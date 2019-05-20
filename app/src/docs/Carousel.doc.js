import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Carousel } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import React from 'react';
import { Carousel } from '@datorama/app-components';

class MyComp extends React.Component => {

  renderSlides = () => {
    return [1, 2, 3, 4].map((slide, index) => (
      <Slide key={index} odd={index % 2}>
        Slide {index}
      </Slide>
    ));
  };

  render() {
    return (
      <div>
        ...
        <Carousel
          controls
            bulletSize={10}
            bulletBg="gray"
            bulletActiveBg="darkgray"
            bulletHoverBg="lightblue"
            slides={this.renderSlides()}
            prevControl={Comp}
            nextControl={Comp}
            loading={loading}
            minHeight={360}
        />
      </div>
    );
  }
};
`;

export default class CarouselDoc extends React.Component {
  state = { loading: true };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  renderSlides = () => {
    return [1, 2, 3, 4].map((slide, index) => (
      <Slide key={index} odd={index % 2}>
        Slide {index}
      </Slide>
    ));
  };

  render() {
    const { loading } = this.state;
    const title = 'carousel';
    const description = 'carousel';

    return (
      <Base title={title} description={description} name="Carousel">
        <Row>
          <Col>
            <Snippet snippet={snippet} />
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCarousel
              controls
              bulletSize={10}
              bulletBg="gray"
              bulletActiveBg="darkgray"
              bulletHoverBg="lightblue"
              slides={this.renderSlides()}
              prevControl={() => <Control>-</Control>}
              nextControl={() => <Control>+</Control>}
              loading={loading}
              minHeight={360}
            />
          </Col>
        </Row>
      </Base>
    );
  }
}

const Slide = styled.div`
  background: ${({ theme, odd }) => (odd ? theme.p300 : theme.p200)};
  overflow: hidden;
  width: 100%;
  border-radius: 4px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.p};
`;

const Control = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.p300};
  background: ${({ theme }) => theme.p100};
  height: 360px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  border-radius: 4px;
  margin: 0 5px;

  &:hover {
    opacity: 0.7;
  }
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;
`;
