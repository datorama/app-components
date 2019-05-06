import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTable from './PropTable';
import Snippet from './Snippet';

// components
import Base from './Base';
import {
  Row,
  Col,
  Draggable,
  DragDropProvider,
  Droppable
} from '../components/index';

const snippet = `
import { DragDropProvider, Draggable, Droppable } from 'app-components';

const MyComp = ({ handleDrop }) => (
  <DragDropProvider onDrop={handleDrop}>
  
    <Draggable id="element-1">
      <CustomComp />
    </Draggable>
    
    <Droppable id="zone-1">
      <Zone />
    </Droppable>
    
  </DragDropProvider>
);
`;

class DragDropDoc extends React.Component {
  state = {
    message: '',
    counts: {
      a: 0,
      b: 0,
      c: 0
    }
  };

  handleDrop = e => {
    if (e.dragId && e.dropId === 'drop-zone') {
      this.setState({
        message: JSON.stringify(e),
        counts: {
          ...this.state.counts,
          [e.dragId]: this.state.counts[e.dragId] + 1
        }
      });
    }
  };

  render() {
    const title = 'Drag and Drop';
    const description = 'Drag and drop components.';
    const { message } = this.state;
    const { theme } = this.props;

    return (
      <Base title={title} description={description}>
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
          <Col>
            <DragDropProvider onDrop={this.handleDrop}>
              <Box>
                <Elements>
                  <Draggable id="a">
                    <Element color={theme.r400} />
                  </Draggable>
                  <Draggable id="b">
                    <Element color={theme.g400} />
                  </Draggable>
                  <Draggable id="c">
                    <Element color={theme.o400} />
                  </Draggable>
                </Elements>
                <Droppable id="drop-zone">
                  <Zone>
                    {this.state.counts.a}
                    <SmallIndicator color={theme.r400} />
                    {this.state.counts.b}
                    <SmallIndicator color={theme.g400} />
                    {this.state.counts.c}
                    <SmallIndicator color={theme.o400} />
                  </Zone>
                </Droppable>
                {message || 'Drag and Drop info'}
              </Box>
            </DragDropProvider>
          </Col>
        </Row>
        <Row>
          <Col>
            <Subheadline>drag drop provider</Subheadline>
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
  }
}

export default withTheme(DragDropDoc);

const Box = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  font-size: 12px;
  ${({ theme }) => theme.text.sm};
`;

const Elements = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Element = styled.div`
  background: ${({ color }) => color};
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: grab;
  margin: 0 10px;
`;

const Zone = styled.div`
  width: 200px;
  height: 60px;
  background: ${({ theme }) => theme.p0};
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border: 1px dashed transparent;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  &:hover {
    border-color: ${({ theme }) => theme.a400};
  }
`;

const SmallIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: ${({ color }) => color};
`;

const Subheadline = styled.div`
  width: 100%;
  ${({ theme }) => theme.text.subHeadline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;
