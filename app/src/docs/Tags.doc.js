import React, { useState } from 'react';
import styled from 'styled-components';
// components
import Base from './Base';
import { Col, Row, Tag, TagGroup } from '../components/index';
import PropTable from './PropTable';
import Snippet from './Snippet';

const snippet = `
import { Tag } from '@datorama/app-components';

const MyComp = ({ toggle }) => (
  <div>
    <Tag label="label" onClick={toggle} />
  </div>
);
`;

const snippetGroup = `
import { TagGroup } from '@datorama/app-components';

const MyComp = ({ onChange, selected }) => (
  <div>
    <TagGroup
      tags=[{id: 'tag-a', label: 'Tag label'}]
      onChange={onChange}
      selected={selected}
    />
  </div>
);
`;

const TagDoc = () => {
  const [selected, setSelected] = useState(['a']);
  const title = 'tag';
  const description = 'tag.';

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <StyledTag label="Account Growth" />
            <StyledTag label="Account Growth" />
            <StyledTag label="Account Growth" disabled />
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
          <Snippet snippet={snippetGroup} />
        </Col>
        <Col>
          <Box>
            <StyledTagGroup
              selected={selected}
              onChange={setSelected}
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
};

export default TagDoc;

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
