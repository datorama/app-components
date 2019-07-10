import React, { useState } from 'react';

// components
import Base from './Base';
import { Col, Row } from '../components/index';
import PropTable from './PropTable';
import Snippet from './Snippet';

const snippet = `
() => {
  const [selected, setSelected] = useState(false);
  const toggleSelected = useCallback(() => setSelected(!selected), [selected]);
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 100,
        justifyContent: 'space-around'
      }}
    >
      <Tag
        label="first tag"
        onClick={toggleSelected}
        selected={selected}
      />
      <Tag label="second tag" onClick={toggleSelected} disabled />
      <Tag label="third tag" color={theme.g400} />
    </div>
  );
};
`;

const snippetGroup = `
() => {
  const [selected, setSelected] = useState(['tag-a']);
  
  return (
    <div>
      <TagGroup
        tags={[
          { id: 'tag-a', label: 'Tag label' },
          { id: 'tag-b', label: 'Tag label' }
        ]}
        onChange={setSelected}
        selected={selected}
      />
    </div>
  );
};
`;

const TagDoc = () => {
  const title = 'tag';
  const description = 'tag.';

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
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
