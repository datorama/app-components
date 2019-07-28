import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const headers = [
    { id: 0, label: 'Index', path: 'index', size: 2, maxWidth: 60 },
    { id: 1, label: 'Avatar', path: 'avatar', size: 1, maxWidth: 100 },
    { id: 2, label: 'Email', path: 'email', size: 2 },
    { id: 3, label: 'Country', path: 'country', size: 2 },
    { id: 4, label: 'City', path: 'city', size: 2 }
  ];
	
  const data = [];
	
  for (let i = 0; i < 100; i++) {
    data.push({
      avatar: '',
      email: 'mail@datorama.com',
      index: i,
      country: 'New York',
      city: 'New York'
    });
  }
  
  const avatarStyles = {
  	width: 40,
  	height: 40,
  	background: theme.p100
  };
  
  // custom col element
  const colRenderer = ({ path, value }) =>
    ( path === 'avatar' ? <div style={avatarStyles} /> : value );
	
  return (
    <Table
      data={data}
      headers={headers}
      maxPage={10}
      colRenderer={colRenderer}
    />
  )
}
`;

const TableDoc = () => {
  const title = 'table';
  const description = '';

  return (
    <Base title={title} description={description} name="Table">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} direction="column" />
        </Col>
      </Row>
    </Base>
  );
};

export default TableDoc;
