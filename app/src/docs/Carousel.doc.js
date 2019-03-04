import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col, Carousel} from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Modal } from 'app-components';

const MyComp = ({ renderer }) => (
  <div>
    ...
    <Carousel
    	total={12}
    	slideRenderer={renderer}
    />
  </div>
);
`;

export default class CarouselDoc extends React.Component {
  state = { loading: true };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  slideRenderer = id => <Slide odd={id % 2}>Slide {id}</Slide>;

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
              total={5}
              slideRenderer={this.slideRenderer}
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

const StyledCarousel = styled(Carousel)`
  width: 100%;
`;
