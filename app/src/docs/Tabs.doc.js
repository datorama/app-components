import React, { Component } from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Tabs } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const [selected, setSelected] = useState(0);
  
  return (
    <Tabs
        justify="flex-start"
        onSelect={setSelected}
        tabs={[
          { id: 0, label: 'Explore' },
          { id: 1, label: 'Filters' },
          { id: 2, label: 'Summary' }
        ]}
        selectedIndex={selected}
        contentRenderer={tab => (
          <div style={{ color: theme.p600 }}>
            Content for tab {tab.label} - {tab.id}
          </div>
        )}
    />
  );
};
`;

const customSnippet = `
import { Tabs } from '@datorama/app-components';

// custom label using label renderer
const MyComp = ({ selected, handleSelect, contentRenderer, tabs, labelRenderer }) => (
  <Tabs
    onSelect={handleSelect}
    selectedIndex={selected}
    labelRenderer={labelRenderer}
    contentRenderer={contentRenderer}
    tabs={tabs}
  />
);
`;

class TabsDoc extends Component {
  state = {
    selected: 0,
    selectedCustom: 0
  };

  labelRenderer = ({ tab }) => (
    <CustomLabel>
      <Notification />
      {tab.label}
    </CustomLabel>
  );

  render() {
    const title = 'tabs';
    const description =
      'Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.';
    const { selected, selectedCustom } = this.state;

    return (
      <Base title={title} description={description} name="Tabs">
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
        </Row>

        <Row align="stretch">
          <Col>
            <Snippet snippet={customSnippet} />
          </Col>
          <Col>
            <Box>
              <Tabs
                justify="flex-start"
                onSelect={selectedCustom => this.setState({ selectedCustom })}
                tabs={[
                  { id: 0, label: 'Explore' },
                  { id: 1, label: 'Filters' },
                  { id: 2, label: 'Summary' }
                ]}
                selectedIndex={selectedCustom}
                labelRenderer={this.labelRenderer}
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

export default TabsDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

const CustomLabel = styled.div`
  ${({ theme }) => theme.text.smLink};
  position: relative;
`;

const Notification = styled.div`
  position: absolute;
  top: -2px;
  right: -6px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.r400};
`;

const Content = styled.div`
  ${({ theme }) => theme.text.p};
`;
