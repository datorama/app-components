import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Fade = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <Container
        animation={`${show ? 'menuFadeIn' : 'menuFadeOut'} 300ms`}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </Container>
    )
  );
};

Fade.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Fade;

const Container = styled.div`
  animation: ${({ animation }) => animation};

  @keyframes menuFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes menuFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
