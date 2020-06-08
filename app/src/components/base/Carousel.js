import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import styled, { css } from 'styled-components';

const Carousel = props => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    className,
    controls,
    nextControl,
    prevControl,
    bullets,
    infinite,
    slides,
    minHeight,
    loading,
    bulletSize,
    bulletBg,
    bulletActiveBg,
    bulletHoverBg
  } = props;

  const total = slides.length;

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides]);

  const next = useCallback(() => {
    // Last slide - go to first slide
    if (currentSlide === total - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(current => current + 1);
    }
  }, [currentSlide, total]);

  const prev = useCallback(() => {
    // First slide - go to last slide
    if (currentSlide === 0) {
      setCurrentSlide(total - 1);
    } else {
      setCurrentSlide(current => current - 1);
    }
  }, [currentSlide, total]);

  const renderSlides = useMemo(() => {
    return slides.map((slide, index) => {
      return (
        <Slide key={`slide-${index}`} total={total}>
          <SlideInner>
            {loading ? (
              <SpinnerContainer minHeight={minHeight}>
                <Spinner />
              </SpinnerContainer>
            ) : (
              <Fragment>{slide}</Fragment>
            )}
          </SlideInner>
        </Slide>
      );
    });
  }, [slides, loading, minHeight, total]);

  const renderBullets = useMemo(() => {
    return slides.map((slide, index) => {
      return (
        <Bullet
          size={bulletSize}
          background={bulletBg}
          activeBackground={bulletActiveBg}
          hoverBackground={bulletHoverBg}
          key={`bullet-${index}`}
          onClick={() => setCurrentSlide(index)}
          selected={currentSlide === index}
        />
      );
    });
  }, [
    slides,
    bulletSize,
    bulletBg,
    bulletActiveBg,
    bulletHoverBg,
    currentSlide
  ]);

  return (
    <Container className={className}>
      <SlidesAndControls>
        {controls && (
          <Control onClick={prev} disabled={!infinite && currentSlide === 0}>
            {prevControl ? prevControl({ current: currentSlide }) : 'Prev'}
          </Control>
        )}
        <SlidesContainer>
          <Slides total={total} translate={-1 * currentSlide * (100 / total)}>
            {renderSlides()}
          </Slides>
        </SlidesContainer>
        {controls && (
          <Control
            onClick={next}
            disabled={!infinite && currentSlide === slides.length - 1}
          >
            {nextControl ? nextControl({ current: currentSlide }) : 'Next'}
          </Control>
        )}
      </SlidesAndControls>
      {bullets && <Bullets>{renderBullets()}</Bullets>}
    </Container>
  );
};

export default Carousel;

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
  minHeight: PropTypes.number,
  prevControl: PropTypes.func,
  nextControl: PropTypes.func,
  controls: PropTypes.bool,
  bulletSize: PropTypes.number,
  bulletBg: PropTypes.string,
  bulletActiveBg: PropTypes.string,
  bulletHoverBg: PropTypes.string,
  bullets: PropTypes.bool,
  infinite: PropTypes.bool
};

Carousel.defaultProps = {
  bullets: true,
  infinite: true
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${({ theme }) => theme.animation.fade};
`;

const SlidesAndControls = styled.div`
  display: flex;
  height: 100%;
`;

const SlidesContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Slides = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ total }) => `${total * 100}%`};
  transition: all 500ms ease-out;
  transform: ${({ translate }) => `translateX(${translate}%)`};
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
  `};
`;

const Slide = styled.div`
  width: ${({ total }) => `${100 / total}%`};
  min-height: 100px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
`;

const Bullets = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Bullet = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ theme, background }) => background || theme.p200};
  border-radius: 50%;
  margin: 0 4px;
  cursor: pointer;
  transition: all 300ms;

  ${({ selected, activeBackground, theme }) =>
    selected &&
    css`
      background: ${activeBackground || theme.p400};
    `};

  &:hover {
    background: ${({ theme, hoverBackground }) =>
      hoverBackground || theme.p300};
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
