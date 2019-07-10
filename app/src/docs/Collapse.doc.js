import React, { Component } from 'react';

// components
import Base from './Base';
import Snippet from './Snippet';
import { Row, Col } from '../components/index';
import PropTable from './PropTable';

const snippet = `
() => {
  const contentStyles = {
    fontSize: 12,
    color: theme.p600,
    lineHeight: '24px'
  };
  
  return (
    <div>
      <Collapse label="collapse label">
        <div style={contentStyles}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Aliquam aspernatur consectetur culpa eius enim et,
          facere iure labore magnam necessitatibus
          nisi quibusdam quisquam quo recusandae reprehenderit
          ullam veritatis voluptatem voluptatum.
        </div>
      </Collapse>
    
      <Collapse label="collapse label">
        <div style={contentStyles}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Animi cupiditate dolores exercitationem numquam perferendis.
        </div>
      </Collapse>
    </div>
  );
};
`;

const collapsibleSnippet = `
// utility for collapsible content
() => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(
    () => setOpen(!open),
    [open]
  );
  
  const styles = {
  	width: '100%',
  	height: 200,
  	background: theme.p200
  };
	
  return (
    <div>
      <Button onClick={toggleOpen}>Toggle content</Button>
      <Collapsible open={open} toggleOpen={toggleOpen}>
        <div style={styles} />
      </Collapsible>
    </div>
  );
};
`;

class CollapseDoc extends Component {
  state = {
    open: false
  };

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }));

  render() {
    const title = 'collapse';
    const description = 'Collapse component and a collapsible utility.';

    return (
      <Base title={title} description={description}>
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <PropTable compKey="Collapse" />
          </Col>
        </Row>

        <Row align="stretch">
          <Col>
            <Snippet snippet={collapsibleSnippet} />
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <PropTable compKey="Collapsible" />
          </Col>
        </Row>
      </Base>
    );
  }
}

export default CollapseDoc;
