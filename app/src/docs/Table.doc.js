import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';
import { Table } from '../components/index';

const snippet = `
const StyledTable = styled(Table)\`
  width: 100%;
\`

const config = {
  options: {
    searchable: true,
    searchByFields: ['name', 'id'],
    rowClick: row => console.log(row)
  },
  columnDefs: [
    {
      title: 'ID',
      field: 'id',
      valueGetter: (row, column) => '#' + row[column.field]
    },
    {
      title: 'Name',
      field: 'name'
    },
    {
      title: 'Number of Employees',
      field: 'employees',
      valueGetter: (row, column) => Number(row[column.field]).toLocaleString()
    }
  ]
};
  
const rowsData = [
  {
    id: 1,
    name: 'Facebook',
    employees: 200000
  },
  {
    id: 2,
    name: 'Amazon',
    employees: 500000
  },
  {
    id: 3,
    name: 'Google',
    employees: 1000000
  },
  {
    id: 4,
    name: 'Microsoft',
    employees: 50000
  },
  {
    id: 5,
    name: 'Datorama',
    employees: 400
  },
  {
    id: 6,
    name: '500tech',
    employees: 30
  },
];

render (
  <StyledTable config={config} rowsData={rowsData} />
);
`;

const TableDoc = () => {
  const title = 'Table';
  const description = 'Table component';

  return (
    <Base title={title} description={description} name="Table">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} direction="column" noInline={true} />
        </Col>
      </Row>
    </Base>
  );
};

export default TableDoc;
