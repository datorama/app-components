import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, hexToRgba, ColorPicker } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { ColorPicker } from '@datorama/app-components';

// color: hex or {r, g, b}
const MyComp = ({ color, onChange }) => (
  <div>
    <ColorPicker
      onChange={onChange}
      color="#09A0FF"
    />
</div>
);
`;

export default class PaginationDoc extends React.Component {
  render() {
    const title = 'color picker';
    const description = '';

    return (
      <Base title={title} description={description} name="ColorPicker">
        <Row align="stretch">
          <Col>
            <Snippet snippet={snippet} />
          </Col>
          <Col>
            <Box>
              <ColorPicker
                color="#09A0FF"
                onChange={color => console.log(color)}
              />
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => hexToRgba(theme.p50, 30)};
`;
