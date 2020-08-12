import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

interface FadeProps {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
}

const Fade = ({ isVisible, children, className }: FadeProps) => {
  const [shouldRender, setRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) setRender(true);
  }, [isVisible]);

  const onAnimationEnd = () => {
    if (!isVisible) setRender(false);
  };

  if (!shouldRender) return null;

  return (
    <Container
      animation={`${isVisible ? "menuFadeIn" : "menuFadeOut"} 300ms`}
      onAnimationEnd={onAnimationEnd}
      className={className}
    >
      {children}
    </Container>
  );
};

const Container = styled.div<{ animation: string }>`
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

export default Fade;
