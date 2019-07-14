import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';
import { Table } from '../components/index';

const snippet = `
const StyledTable = styled(Table)\`
  width: 100%;
  height: 500px;
\`

const config = {
  options: {
    stickyHeader: false
  },
  columnDefs: [
    {
      title: 'ID',
      field: 'id'
    },
    {
      title: 'Name',
      field: 'name',
      width: '200px'
    }
  ]
};
  
const rowsData = [
  {
    id: 1,
    name: 'Facebook'
  },
  {
    id: 2,
    name: 'Amazon'
  },
  {
    id: 3,
    name: 'Google'
  }
];

render (
  <StyledTable config={config} rowsData={rowsData} />
);
`;

const TableDoc = () => {
  const title = 'Table';
  const description = 'Table component';

  return (
    <Base title={title} description={description} name="Sticky">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} direction="column" noInline={true} />
        </Col>
      </Row>
    </Base>
  );
};

export default TableDoc;
