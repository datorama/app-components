import React, { ReactNode, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactDom from 'react-dom';

interface Props {
  top: number;
  left: number;
  children: ReactNode;
  chartRect: DOMRect;
}

export const ChartTooltip = (props: Props) => {
  const ref = useRef(null);
  const [reverse, setReverse] = useState(false);
  const { top, left, children, chartRect } = props;

  useEffect(() => {
    if (ref && ref.current) {
      const rect = ref.current.getBoundingClientRect();

      setReverse(left - 15 - rect.width <= 0);
    }
  }, [ref, chartRect, left]);

  return ReactDom.createPortal(
    <Container
      top={top}
      left={left}
      className="chart-tooltip"
      ref={ref}
      reverse={reverse}
    >
      {children}
      {reverse ? <LeftArrow /> : <RightArrow />}
    </Container>,
    document.body
  );
};

type ContainerProps = { top: number; left: number; reverse: boolean };

const Container = styled.div.attrs((props: ContainerProps) => ({
  style: {
    top: `${props.top}px`,
    left: `${props.left}px`,
  },
}))<ContainerProps>`
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  position: fixed;
  z-index: 2;
  box-shadow: 0 0.6px 2.2px rgba(0, 0, 0, 0.02),
    0 1.5px 5.3px rgba(0, 0, 0, 0.028), 0 2.9px 10px rgba(0, 0, 0, 0.035),
    0 5.1px 17.9px rgba(0, 0, 0, 0.042), 0 9.6px 33.4px rgba(0, 0, 0, 0.05),
    0 23px 80px rgba(0, 0, 0, 0.07);
  padding: 5px;
  ${({ theme }) => theme.text.sm};
  pointer-events: none;
  transform: translate(calc(-100% - 15px), -50%);

  ${({ reverse }) =>
    reverse &&
    `
    transform: translate(15px, -50%);
  `};
`;

const RightArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  position: absolute;
  top: 50%;
  left: 100%;
  border-left: 4px solid ${({ theme }) => theme.p0};
  transform: translateY(-50%);
`;

const LeftArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  position: absolute;
  top: 50%;
  left: -4px;
  border-right: 4px solid ${({ theme }) => theme.p0};
  transform: translateY(-50%);
`;
