import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";

type TabType = {
  id: string | number;
  label: string;
  isDisabled?: boolean;
};

type Justify = "flex-start" | "center" | "flex-end";

export interface TabsProps {
  className?: string;
  contentRenderer?: (tab: TabType) => React.ReactNode;
  labelRenderer?: ({
    isSelected,
    tab,
  }: {
    isSelected: boolean;
    tab: TabType;
  }) => React.ReactNode;
  justify?: Justify;
  onSelect: (id: string | number) => void;
  selectedIndex: number;
  gap?: number;
  tabs: TabType[];
}

const Tabs = (props: TabsProps) => {
  const [tabWidths, setTabsWidths] = useState<number[]>([]);
  const [prevWidth, setPrevWidth] = useState<number[]>([]);
  const [localWidths, setLocalWidths] = useState<number[]>([]);
  const {
    contentRenderer,
    labelRenderer,
    selectedIndex,
    tabs,
    gap = 35,
    onSelect,
    justify,
    className,
  } = props;

  const handleTabRef = useCallback((el) => {
    if (el) {
      const { width } = el.getBoundingClientRect();
      setLocalWidths((localWidths) => [...localWidths, width]);
    }
  }, []);

  useEffect(() => {
    if (localWidths.length === tabs.length) {
      let total = 0;
      const prevTemp = [0];
      for (let i = 0; i < tabs.length; i++) {
        total += localWidths[i];
        prevTemp.push(total);
      }

      setPrevWidth([...prevTemp]);
      setTabsWidths([...localWidths]);
    }
  }, [localWidths, tabs.length]);

  return (
    <Container className={className}>
      <Header justify={justify}>
        <InnerHeader>
          {tabs.map((tab) => {
            const key = `tab-${tab.id}`;
            const handleClick = () => onSelect(tab.id);
            const isSelected = tab.id === selectedIndex;

            return (
              <Tab
                gap={gap / 2}
                className={`tab-${tab.id}`}
                ref={handleTabRef}
                key={key}
                onClick={() => !tab.isDisabled && handleClick()}
              >
                {labelRenderer ? (
                  labelRenderer({ isSelected, tab })
                ) : (
                  <Label isDisabled={tab.isDisabled} isSelected={isSelected}>
                    {tab.label}
                  </Label>
                )}
              </Tab>
            );
          })}
          <Line
            left={prevWidth[selectedIndex]}
            width={tabWidths[selectedIndex]}
          />
        </InnerHeader>
      </Header>

      {contentRenderer && (
        <Content>{contentRenderer(tabs[selectedIndex])}</Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div<{ justify?: Justify }>`
  width: 100%;
  display: flex;
  justify-content: ${({ justify }) => justify || "center"};
  border-bottom: 1px solid ${({ theme }) => theme.p100};
`;

const InnerHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

const Content = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
`;

const Tab = styled.div<{ gap: number }>`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 ${({ gap }) => gap}px;
`;

const Label = styled.div<{ isDisabled?: boolean; isSelected: boolean }>`
  transition: all 300ms;
  ${({ theme }) => theme.text.pLink};
  color: ${({ theme }) => theme.p300};

  &:hover {
    color: ${({ theme, isDisabled }) => (isDisabled ? theme.p200 : theme.a400)};
  }

  ${({ isSelected, theme, isDisabled }) =>
    isSelected &&
    css`
      color: ${isDisabled ? theme.p200 : theme.a400};
    `};
`;

const Line = styled.div<{ left: number; width: number }>`
  position: absolute;
  bottom: -2px;
  height: 2px;
  left: 0;
  transform: ${({ left }) => `translateX(${left}px)`};
  width: ${({ width }) => width}px;
  transition: all 300ms;
  background: ${({ theme }) => theme.a400};
`;

export default Tabs;
