import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col, Draggable} from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Draggable } from '../components/index';

const MyComp = () => (
  <div>
    <Draggable>
      <CustomComp />
    </Draggable>
  </div>
);
`;

class DraggableDoc extends React.Component {
  state = {
    translation: {}
  };

  handleDrag = translation => this.setState({ translation });

  handleDragEnd = () =>
    this.setState({
      translation: {
        translateX: 0,
        translateY: 0
      }
    });

  render() {
    const title = 'spinner';
    const description = 'spinner.';
    const { translation } = this.state;

    return (
      <Base title={title} description={description} name="Draggable">
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
          <Col>
            <Box>
              <Draggable
                onDrag={this.handleDrag}
                onDragEnd={this.handleDragEnd}
              >
                <Circle
                  translateX={translation.translateX}
                  translateY={translation.translateY}
                />
              </Draggable>
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

export default DraggableDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;

const Circle = styled.div.attrs({
  style: ({ translateX, translateY }) => ({
    transform: `translate(${translateX}px, ${translateY}px`
  })
})`
  background: ${({ theme }) => theme.p300};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: grab;
`;
