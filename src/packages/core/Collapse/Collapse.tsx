import React, { useState, useCallback, ReactNode } from "react";
import styled from "styled-components";

import Collapsible from "packages/core/Collapse/Collapsible";
import ArrowDown from "packages/core/Icons/ArrowDown";

export interface CollapseProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

const Collapse = (props: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children, className, label } = props;

  const toggleIsOpen = useCallback(() => setIsOpen((open) => !open), []);

  return (
    <Container className={className}>
      <Header onClick={toggleIsOpen}>
        <StyledArrow isOpen={isOpen} />

        {label}
      </Header>

      <Collapsible isOpen={isOpen} toggleIsOpen={toggleIsOpen}>
        {children}
      </Collapsible>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 34px;
  background: ${({ theme }) => theme.p0};
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.text.smBold};
  line-height: 12px;
  cursor: pointer;
`;

const StyledArrow = styled(ArrowDown)<{ isOpen: boolean }>`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  transition: all 300ms;
  transform: rotate(${({ isOpen }) => (isOpen ? "0deg" : "-90deg")});

  * {
    fill: ${({ theme }) => theme.p300};
  }
`;

export default Collapse;
