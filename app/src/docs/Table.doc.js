import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
const StyledTable = styled(Table)\`
  width: 100%;
\`;

const Avatar = styled.img\`
  width: 100%;
  height: auto;
  border-radius: 50%;
\`;

const config = {
  options: {
    /* rowRenderer: (row, rowIndex, columnDefs) => (
      <TableRow key={rowIndex}>
        {columnDefs.map((column, columnIndex) => (
          <Column key={rowIndex + '_' + columnIndex}>
            {column.valueGetter
              ? column.valueGetter(row, column)
              : row[column.field]}
          </Column>
        ))}
      </TableRow>
    ), */
    // headerRowRenderer: (columnDefs) => // replace the header row, 
    stickyHeader: true,
    height: '400px',
    pagination: true,
    paginationPageSize: 5,
    paginationMax: 3,
    searchable: true,
    searchFields: ['name', 'id'],
    onRowClick: row => console.log(row),
    emptyRenderer: () => <Empty>Custom empty message</Empty>
  },
  columnDefs: [
    {
      title: 'ID',
      field: 'id',
      width: '70px',
      justifyContent: 'center',
      valueGetter: (row, column) => '#' + row[column.field],
      // headerCellRenderer: (column, columnIndex) => // replace this specific header cell,
      // headerValueGetter: (column) => // manipulate this specific header cell value,
    },
    {
      title: 'Photo',
      field: 'photo',
      width: '80px',
      cellRenderer: ({ row, rowIndex, column, columnIndex }) => <Column width={column.width} key={rowIndex + '_' + columnIndex}><Avatar src={row[column.field]} /></Column>
    },
    {
      title: 'Name',
      field: 'name'
    },
    {
      title: 'Username',
      field: 'username'
    },
    {
      title: 'Email',
      field: 'email'
    },
    {
      title: 'Phone',
      field: 'phone'
    },
    {
      title: 'Company',
      field: 'company',
      valueGetter: (row, column) => row[column.field].name
    },
    {
      title: 'Address',
      field: 'address',
      valueGetter: (row, column) => row[column.field].street
    }
  ]
};
  
const rowsData = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    photo: "https://randomuser.me/api/portraits/med/women/32.jpg",
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    photo: "https://randomuser.me/api/portraits/med/men/41.jpg",
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618'
      }
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    photo: "https://randomuser.me/api/portraits/med/women/76.jpg",
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: {
        lat: '-68.6102',
        lng: '-47.0653'
      }
    },
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: {
      name: 'Romaguera-Jacobson',
      catchPhrase: 'Face to face bifurcated interface',
      bs: 'e-enable strategic applications'
    }
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    photo: "https://randomuser.me/api/portraits/med/women/0.jpg",
    address: {
      street: 'Hoeger Mall',
      suite: 'Apt. 692',
      city: 'South Elvis',
      zipcode: '53919-4257',
      geo: {
        lat: '29.4572',
        lng: '-164.2990'
      }
    },
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: {
      name: 'Robel-Corkery',
      catchPhrase: 'Multi-tiered zero tolerance productivity',
      bs: 'transition cutting-edge web services'
    }
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    photo: "https://randomuser.me/api/portraits/med/women/62.jpg",
    address: {
      street: 'Skiles Walks',
      suite: 'Suite 351',
      city: 'Roscoeview',
      zipcode: '33263',
      geo: {
        lat: '-31.8129',
        lng: '62.5342'
      }
    },
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: {
      name: 'Keebler LLC',
      catchPhrase: 'User-centric fault-tolerant solution',
      bs: 'revolutionize end-to-end systems'
    }
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    photo: "https://randomuser.me/api/portraits/med/women/63.jpg",
    address: {
      street: 'Norberto Crossing',
      suite: 'Apt. 950',
      city: 'South Christy',
      zipcode: '23505-1337',
      geo: {
        lat: '-71.4197',
        lng: '71.7478'
      }
    },
    phone: '1-477-935-8478 x6430',
    website: 'ola.org',
    company: {
      name: 'Considine-Lockman',
      catchPhrase: 'Synchronised bottom-line interface',
      bs: 'e-enable innovative applications'
    }
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    photo: "https://randomuser.me/api/portraits/med/men/63.jpg",
    address: {
      street: 'Rex Trail',
      suite: 'Suite 280',
      city: 'Howemouth',
      zipcode: '58804-1099',
      geo: {
        lat: '24.8918',
        lng: '21.8984'
      }
    },
    phone: '210.067.6132',
    website: 'elvis.io',
    company: {
      name: 'Johns Group',
      catchPhrase: 'Configurable multimedia task-force',
      bs: 'generate enterprise e-tailers'
    }
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    photo: "https://randomuser.me/api/portraits/med/men/64.jpg",
    address: {
      street: 'Ellsworth Summit',
      suite: 'Suite 729',
      city: 'Aliyaview',
      zipcode: '45169',
      geo: {
        lat: '-14.3990',
        lng: '-120.7677'
      }
    },
    phone: '586.493.6943 x140',
    website: 'jacynthe.com',
    company: {
      name: 'Abernathy Group',
      catchPhrase: 'Implemented secondary concept',
      bs: 'e-enable extensible e-tailers'
    }
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    photo: "https://randomuser.me/api/portraits/med/women/66.jpg",
    address: {
      street: 'Dayna Park',
      suite: 'Suite 449',
      city: 'Bartholomebury',
      zipcode: '76495-3109',
      geo: {
        lat: '24.6463',
        lng: '-168.8889'
      }
    },
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
    company: {
      name: 'Yost and Sons',
      catchPhrase: 'Switchable contextually-based project',
      bs: 'aggregate real-time technologies'
    }
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    photo: "https://randomuser.me/api/portraits/med/women/67.jpg",
    address: {
      street: 'Kattie Turnpike',
      suite: 'Suite 198',
      city: 'Lebsackbury',
      zipcode: '31428-2261',
      geo: {
        lat: '-38.2386',
        lng: '57.2232'
      }
    },
    phone: '024-648-3804',
    website: 'ambrose.net',
    company: {
      name: 'Hoeger LLC',
      catchPhrase: 'Centralized empowering task-force',
      bs: 'target end-to-end models'
    }
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
