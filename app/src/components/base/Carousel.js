import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import styled, { css } from 'styled-components';

class Carousel extends Component {
  static propTypes = {
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

  static defaultProps = {
    bullets: true,
    infinite: true
  };

  state = {
    current: 0
  };

  componentDidUpdate(prevProps) {
    if (prevProps.slides !== this.props.slides) {
      this.setState({ current: 0 });
    }
  }

  getTotal = () => {
    return this.props.slides.length;
  };

  next = () => {
    const { current } = this.state;
    const total = this.getTotal();

    // Last slide - go to first slide
    if (current === total - 1) {
      this.setSlide(0);
    } else {
      this.setSlide(current + 1);
    }
  };

  prev = () => {
    const { current } = this.state;
    const total = this.getTotal();

    // First slide - go to last slide
    if (current === 0) {
      this.setSlide(total - 1);
    } else {
      this.setSlide(current - 1);
    }
  };

  setSlide = current => this.setState({ current });

  renderSlides = () => {
    const { slides, minHeight, loading } = this.props;
    const total = slides.length;

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
  };

  renderBullets = () => {
    const { current } = this.state;
    const {
      slides,
      bulletSize,
      bulletBg,
      bulletActiveBg,
      bulletHoverBg
    } = this.props;

    return slides.map((slide, index) => {
      return (
        <Bullet
          size={bulletSize}
          background={bulletBg}
          activeBackground={bulletActiveBg}
          hoverBackground={bulletHoverBg}
          key={`bullet-${index}`}
          onClick={() => this.setSlide(index)}
          selected={current === index}
        />
      );
    });
  };

  render() {
    const { current } = this.state;
    const {
      className,
      controls,
      nextControl,
      prevControl,
      bullets,
      infinite,
      slides
    } = this.props;
    const total = this.getTotal();

    return (
      <Container className={className}>
        <SlidesAndControls>
          {controls && (
            <Control onClick={this.prev} disabled={!infinite && current === 0}>
              {prevControl ? prevControl({ current }) : 'Prev'}
            </Control>
          )}
          <SlidesContainer>
            <Slides total={total} translate={-1 * current * (100 / total)}>
              {this.renderSlides()}
            </Slides>
          </SlidesContainer>
          {controls && (
            <Control
              onClick={this.next}
              disabled={!infinite && current === slides.length - 1}
            >
              {nextControl ? nextControl({ current }) : 'Next'}
            </Control>
          )}
        </SlidesAndControls>
        {bullets && <Bullets>{this.renderBullets()}</Bullets>}
      </Container>
    );
  }
}

export default Carousel;

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
