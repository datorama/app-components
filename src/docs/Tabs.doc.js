import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Tabs from '../components/base/Tabs';
import { Row, Col } from '../components/index';

const snippet = `
import { Tabs } from 'app-components';

const MyComp = ({ selected, handleSelect, contentRenderer, tabs }) => (
  <Tabs
    onSelect={handleSelect}
    selectedIndex={selected}
    contentRenderer={contentRenderer}
    tabs={tabs}
  />
);
`;

class TabsDoc extends Component {
  state = {
    selected: 0
  };

  render() {
    const title = 'tabs';
    const description = 'tabs.';
    const { selected } = this.state;

    return (
      <Base title={title} description={description} name="Tabs">
        <Row align="stretch">
          <Col>
            <Highlight language="javascript">{snippet}</Highlight>
          </Col>
          <Col>
            <Box>
              <Tabs
                justify="flex-start"
                onSelect={selected => this.setState({ selected })}
                tabs={[
                  { id: 0, label: 'Explore' },
                  { id: 1, label: 'Filters' },
                  { id: 2, label: 'Summary' }
                ]}
                selectedIndex={selected}
                contentRenderer={tab => (
                  <Content>
                    Content for tab {tab.label} - {tab.id}
                  </Content>
                )}
              />
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

export default withTheme(TabsDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

const Content = styled.div`
  ${({ theme }) => theme.text.p};
`;
