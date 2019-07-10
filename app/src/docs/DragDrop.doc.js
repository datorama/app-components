import React from 'react';
import styled from 'styled-components';
import PropTable from './PropTable';
import Snippet from './Snippet';

// components
import Base from './Base';
import { Col, Row } from '../components/index';

const snippet = `
() => {
  const [message, setMessage] = useState('');
  const [counts, setCounts] = useState({
    a: 0,
    b: 0,
    c: 0
  });

  const handleDrop = useCallback(e => {
    if (e.dragId && e.dropId === 'drop-zone') {
      setMessage(JSON.stringify(e));
      setCounts({
        ...counts,
        [e.dragId]: counts[e.dragId] + 1
      });
    }
  }, [counts]);
  
  const boxStyle = (color, size = 30) => ({
    width: size,
    height: size,
    background: color,
    borderRadius: 2
  });
  
  const rowStyles = {
    display: 'flex',
    width: 200,
    justifyContent: 'space-evenly'
  };
  
  const dropStyles = {
    width: '100%',
    maxWidth: 300,
    height: 80,
    borderRadius: 2,
    margin: '10px 0',
    border: '1px dashed ' + theme.p200,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: theme.p600,
    fontSize: 12
  };
  
  const infoStyles = {
    color: theme.p600,
    fontSize: 12,
    textAlign: 'center'
  };
  
  return (
    <DragDropProvider onDrop={handleDrop}>
      <div>
        <div style={rowStyles}>
          <Draggable id="a">
            <div style={boxStyle(theme.r400)} />
          </Draggable>
          <Draggable id="b">
            <div style={boxStyle(theme.g400)} />
          </Draggable>
          <Draggable id="c">
            <div style={boxStyle(theme.o400)} />
          </Draggable>
        </div>
        
        <Droppable id="drop-zone">
          <div style={dropStyles}>
            {counts.a}
            <div style={boxStyle(theme.r400, 10)} />
            {counts.b}
            <div style={boxStyle(theme.g400, 10)} />
            {counts.c}
            <div style={boxStyle(theme.o400, 10)} />
          </div>
        </Droppable>
        <div style={infoStyles}>{message || 'Drag and Drop info'}</div>
      </div>
    </DragDropProvider>
  );
};
`;

const DragDropDoc = () => {
  const title = 'Drag and Drop';
  const description = 'Components for dragging and dropping elements.';

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Subheadline>drag & drop provider</Subheadline>
          <PropTable compKey="DragDropProvider" />
        </Col>
      </Row>

      <Row>
        <Col>
          <Subheadline>draggable</Subheadline>
          <PropTable compKey="Draggable" />
        </Col>
      </Row>

      <Row>
        <Col>
          <Subheadline>droppable</Subheadline>
          <PropTable compKey="Droppable" />
        </Col>
      </Row>
    </Base>
  );
};

export default DragDropDoc;

const Subheadline = styled.div`
  width: 100%;
  ${({ theme }) => theme.text.subHeadline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;
