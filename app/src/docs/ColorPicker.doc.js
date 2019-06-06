import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, hexToRgba, ColorPicker } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { ColorPicker } from '@datorama/app-components';

const MyComp = ({ color, onChange }) => (
  <div>
    <ColorPicker
    	value={color}
    	onChange={onChange}
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
              <ColorPicker />
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
