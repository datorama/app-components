import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { each, range } from 'lodash/fp';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

class Carousel extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    total: PropTypes.number.isRequired,
    slideRenderer: PropTypes.func.isRequired,
    className: PropTypes.string,
    minHeight: PropTypes.number,
    prevControl: PropTypes.node,
    nextControl: PropTypes.node,
    controls: PropTypes.bool,
    bulletSize: PropTypes.string,
    bulletBg: PropTypes.string,
    bulletActiveBg: PropTypes.string,
    bulletHoverBg: PropTypes.string
  };

  state = {
    current: 0
  };

  next = () => {
    const { current } = this.state;
    const { total } = this.props;

    // Last slide - go to first slide
    if (current === total - 1) {
      this.setSlide(0);
    } else {
      this.setSlide(current + 1);
    }
  };

  prev = () => {
    console.log('gpg test');
    const { current } = this.state;
    const { total } = this.props;

    // First slide - go to last slide
    if (current === 0) {
      this.setSlide(total - 1);
    } else {
      this.setSlide(current - 1);
    }
  };

  setSlide = current => this.setState({ current });

  render() {
    const { current } = this.state;
    const {
      total,
      slideRenderer,
      className,
      loading,
      minHeight,
      controls,
      nextControl,
      prevControl,
      bulletSize,
      bulletBg,
      bulletActiveBg,
      bulletHoverBg
    } = this.props;
    const ids = range(0, total);
    const slides = [];
    const bullets = [];

    each(id => {
      slides.push(
        <Slide key={`slide-${id}`} total={total} active={current === id}>
          <SlideInner>
            {loading ? (
              <SpinnerContainer minHeight={minHeight}>
                <Spinner />
              </SpinnerContainer>
            ) : (
              slideRenderer(id)
            )}
          </SlideInner>
        </Slide>
      );

      bullets.push(
        <Bullet
          size={bulletSize}
          background={bulletBg}
          activeBackground={bulletActiveBg}
          hoverBackground={bulletHoverBg}
          key={`bullet-${id}`}
          onClick={() => this.setSlide(id)}
          selected={current === id}
        />
      );
    }, ids);

    return (
      <Container className={className}>
        <SlidesAndControls>
          {controls && (
            <Control onClick={this.prev}>
              {prevControl ? prevControl : 'Prev'}
            </Control>
          )}
          <SlidesContainer>
            <Slides total={total} translate={-1 * current * (100 / total)}>
              {slides}
            </Slides>
          </SlidesContainer>
          {controls && (
            <Control onClick={this.next}>
              {nextControl ? nextControl : 'Next'}
            </Control>
          )}
        </SlidesAndControls>
        <Bullets>{bullets}</Bullets>
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
  width: ${({ size }) => size || '8px'};
  height: ${({ size }) => size || '8px'};
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
