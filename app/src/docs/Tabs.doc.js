import React, { Component } from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const [selected, setSelected] = useState(0);
  const tabStyles = {
    fontSize: 12,
    color: theme.p600,
    background: theme.p100,
    boxSizing: 'border-box',
    padding: 20
  };
  
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
          <div style={tabStyles}>
            Content for tab {tab.label} - {tab.id}
          </div>
        )}
    />
  );
};
`;

const customSnippet = `
// custom label using a label renderer prop
() => {
  const [selected, setSelected] = useState(0);
  const tabStyles = {
    fontSize: 12,
    color: theme.p600,
    background: theme.p100,
    boxSizing: 'border-box',
    padding: 20
  };
  
  const labelStyles = {
    fontSize: 14,
    fontWeight: 600,
    color: theme.g400
  };
  
  const labelRenderer = ({ selected, tab }) => (
    <div key={tab.id} style={labelStyles}>{tab.label}</div>
  );
  
  return (
    <Tabs
        justify="flex-start"
        labelRenderer={labelRenderer}
        onSelect={setSelected}
        tabs={[
          { id: 0, label: 'Explore' },
          { id: 1, label: 'Filters' },
          { id: 2, label: 'Summary' }
        ]}
        selectedIndex={selected}
        contentRenderer={tab => (
          <div style={tabStyles}>
            Content for tab {tab.label} - {tab.id}
          </div>
        )}
    />
  );
};
`;

class TabsDoc extends Component {
  render() {
    const title = 'tabs';
    const description =
      'Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.';

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
        </Row>
      </Base>
    );
  }
}

export default TabsDoc;
