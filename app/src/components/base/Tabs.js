import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

class Tabs extends Component {
  state = {
    tabWidths: [],
    prevWidth: []
  };

  localWidths = [];

  handleTabRef = el => {
    if (el) {
      const { width } = el.getBoundingClientRect();

      this.localWidths.push(width);

      if (this.localWidths.length === this.props.tabs.length) {
        const { tabs } = this.props;

        let total = 0;
        const prevWidth = [0];

        for (let i = 0; i < tabs.length; i++) {
          total += this.localWidths[i];

          prevWidth.push(total);
        }

        this.setState({ tabWidths: this.localWidths, prevWidth });
      }
    }
  };

  render() {
    const {
      contentRenderer,
      labelRenderer,
      selectedIndex,
      tabs,
      gap = 35,
      onSelect,
      justify,
      className
    } = this.props;
    const { tabWidths, prevWidth } = this.state;

    return (
      <Container className={className}>
        <Header justify={justify}>
          <InnerHeader>
            {tabs.map(tab => {
              const key = `tab-${tab.id}`;
              const handleClick = () => onSelect(tab.id);
              const selected = tab.id === selectedIndex;

              return (
                <Tab
                  gap={gap / 2}
                  className={`tab-${tab.id}`}
                  ref={this.handleTabRef}
                  key={key}
                  onClick={tab.disabled ? null : handleClick}
                >
                  {labelRenderer ? (
                    labelRenderer({ selected, tab })
                  ) : (
                    <Label disabled={tab.disabled} selected={selected}>
                      {tab.label}
                    </Label>
                  )}
                </Tab>
              );
            })}
            <Line
              left={prevWidth[selectedIndex]}
              gap={gap / 2}
              width={tabWidths[selectedIndex]}
            />
          </InnerHeader>
        </Header>

        {contentRenderer && (
          <Content>{contentRenderer(tabs[selectedIndex])}</Content>
        )}
      </Container>
    );
  }
}

Tabs.propTypes = {
  className: PropTypes.string,
  contentRenderer: PropTypes.func,
  labelRenderer: PropTypes.func,
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number.isRequired,
  gap: PropTypes.number,
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
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 ${({ gap }) => gap}px;
`;

const Label = styled.div`
  transition: all 300ms;
  ${({ theme }) => theme.text.pLink};
  color: ${({ theme }) => theme.p300};
  &:hover {
    color: ${({ theme, disabled }) => (disabled ? theme.p200 : theme.a400)};
  }
  ${({ selected, theme, disabled }) =>
    selected &&
    css`
      color: ${disabled ? theme.p200 : theme.a400};
    `};
`;

const Line = styled.div`
  position: absolute;
  bottom: -2px;
  height: 2px;
  left: 0;
  transform: ${({ left }) => `translateX(${left}px)`};
  width: ${({ width }) => width}px;
  transition: all 300ms;
  background: ${({ theme }) => theme.a400};
`;
