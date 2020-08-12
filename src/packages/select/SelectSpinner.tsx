import React from "react";
import styled from "styled-components";

interface SelectSpinner {
  className?: string;
}

const SelectSpinner = (props: SelectSpinner) => (
  <Container className={props.className}>
    <Dot delay="0" />
    <Dot delay="500ms" />
    <Dot delay="1000ms" />
  </Container>
);

export default SelectSpinner;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.div<{ delay: string }>`
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.p200};
  border-radius: 50%;
  margin: 0 1px;
  animation: scaleAlpha 1500ms infinite linear;
  animation-delay: ${({ delay }) => delay};

  @keyframes scaleAlpha {
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
`;
