import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const slideStyles = {
    background: theme.p100,
    width: '90%',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.p600,
    fontSize: 30
  };
  
  const controlStyles = {
    height: 100,
    width: 40,
    background: theme.p300,
    color: theme.p600,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  
  const renderSlides = () => {
    return [1, 2, 3, 4].map((slide, index) => (
      <div key={index} style={slideStyles}>
        Slide {index}
      </div>
    ));
  };

  return (
    <Carousel
      controls
      bulletSize={10}
      bulletBg="gray"
      bulletActiveBg="darkgray"
      bulletHoverBg="lightblue"
      slides={renderSlides()}
      prevControl={() => <div style={controlStyles}>-</div>}
      nextControl={() => <div style={controlStyles}>+</div>}
      loading={false}
      minHeight={360}
    />
  );
};
`;

const CarouselDoc = () => {
  const title = 'carousel';
  const description = 'carousel';

  return (
    <Base title={title} description={description} name="Carousel">
      <Row>
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default CarouselDoc;
