import React from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Tag from '../components/base/Tag';
import TagGroup from '../components/base/TagGroup';
import { Row, Col } from '../components/index';
import PropTable from './PropTable';

const snippet = `
import { Tag } from 'app-components';

const MyComp = ({ toggle }) => (
  <div>
    <Tag label="label" onClick={toggle} />
  </div>
);
`;

const snippetGroup = `
import { TagGroup } from 'app-components';

const MyComp = ({ onChange, selected }) => (
  <div>
    <TagGroup
      tags=[{id: 'aaa', label: 'tag label'}]
      onChange={onChange}
      selected={selected}
    />
  </div>
);
`;

class TagDoc extends React.Component {
  state = {
    selected: ['a']
  };

  render() {
    const { selected } = this.state;
    const title = 'tag';
    const description = 'tag.';

    return (
      <Base title={title} description={description}>
        <Row align="stretch">
          <Col>
            <Highlight language="javascript">{snippet}</Highlight>
          </Col>
          <Col>
            <Box>
              <StyledTag label="Account Growth" />
              <StyledTag label="Account Growth" color={'#7257e8'} />
              <StyledTag label="Account Disabled" color={'#7257e8'} disabled />
            </Box>
          </Col>
        </Row>
        <Row>
          <Col size={6}>
            <PropTable compKey="Tag" />
          </Col>
        </Row>

        <Row align="stretch">
          <Col>
            <Highlight language="javascript">{snippetGroup}</Highlight>
          </Col>
          <Col>
            <Box>
              <StyledTagGroup
                color={'#7257e8'}
                selected={selected}
                onChange={selected => this.setState({ selected })}
                tags={[
                  { id: 'a', label: 'tag 1' },
                  { id: 'b', label: 'tag 2' },
                  { id: 'c', label: 'tag 3' },
                  { id: 'd', label: 'tag 4' }
                ]}
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <PropTable compKey="TagGroup" />
          </Col>
        </Row>
      </Base>
    );
  }
}

export default withTheme(TagDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  flex-direction: column;
`;

const StyledTag = styled(Tag)`
  margin: 4px 0;
`;

const StyledTagGroup = styled(TagGroup)`
  justify-content: center;
`;
