import React, { useState, useCallback, useEffect, ReactNode } from "react";
import styled from "styled-components";

export interface CollapsibleProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const Collapsible = (props: CollapsibleProps) => {
  const { isOpen, children, className } = props;

  const [height, setHeight] = useState("auto");
  const [localIsOpen, setLocalIsOpen] = useState(true);

  useEffect(() => {
    setLocalIsOpen(isOpen);
  }, [isOpen]);

  const handleRef = useCallback((el) => {
    if (el) {
      const { height } = el.getBoundingClientRect();
      setHeight(`${height}px`);
      setLocalIsOpen(false);
    }
  }, []);

  let calcHeight = localIsOpen ? height : '0px';

  return (
    <Content
      className={className}
      height={calcHeight}
      isOpen={localIsOpen}
      ref={handleRef}
    >
      {children}
    </Content>
  );
};

const Content = styled.div<{ height: string; isOpen: boolean; }>`
  width: 100%;
  height: ${({ height }) => height};
  transition: all 300ms;
  overflow: hidden;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  position: relative;
`;

export default Collapsible;
