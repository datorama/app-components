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
    minHeight: PropTypes.number
  };

  state = {
    current: 0
  };

  setSlide = current => () => this.setState({ current });

  render() {
    const { current } = this.state;
    const { total, slideRenderer, className, loading, minHeight } = this.props;
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
          key={`bullet-${id}`}
          onClick={this.setSlide(id)}
          selected={current === id}
        />
      );
    }, ids);

    return (
      <Container className={className}>
        <Inner total={total} translate={-1 * current * (100 / total)}>
          {slides}
        </Inner>
        <Bullets>{bullets}</Bullets>
      </Container>
    );
  }
}

export default Carousel;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.animation.fade};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  width: ${({ total }) => `${total * 100}%`};
  transition: all 500ms ease-out;
  transform: ${({ translate }) => `translateX(${translate}%)`};
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
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.p200};
  border-radius: 50%;
  margin: 0 4px;
  cursor: pointer;
  transition: all 300ms;

  ${({ selected, theme }) =>
    selected &&
    css`
      background: ${theme.p300};
    `};

  &:hover {
    background: ${({ theme }) => theme.p400};
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
