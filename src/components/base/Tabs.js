import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Tabs = ({ contentRenderer, selectedIndex, tabs, onSelect, justify }) => {
  return (
    <Container>
      <Header justify={justify}>
        <InnerHeader>
          {tabs.map(tab => (
            <Tab key={`tab-${tab.id}`} onClick={() => onSelect(tab.id)}>
              <Label selected={tab.id === selectedIndex}>{tab.label}</Label>
            </Tab>
          ))}
          <Line left={selectedIndex * 100} />
        </InnerHeader>
      </Header>

      <Content>{contentRenderer(tabs[selectedIndex])}</Content>
    </Container>
  );
};

Tabs.propTypes = {
  contentRenderer: PropTypes.func.isRequired,
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string
    })
  ).isRequired
};

export default Tabs;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ justify }) => justify || 'center'};
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

const Tab = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Label = styled.div`
  transition: all 300ms;
  ${({ theme }) => theme.text.pLink};
  color: ${({ theme }) => theme.p300};

  &:hover {
    color: ${({ theme }) => theme.a400};
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.a400};
    `};
`;

const Line = styled.div`
  position: absolute;
  bottom: -2px;
  height: 2px;
  left: ${({ left }) => `${left}px`};
  width: 100px;
  transition: all 300ms;
  background: ${({ theme }) => theme.a400};
`;
