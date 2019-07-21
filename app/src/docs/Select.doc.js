import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const single = `
() => {
const [selected, setSelected] = useState([]);
const options = [
  { value: '1', label: 'orange' },
  { value: '2', label: 'purple' },
  { value: '3', label: 'black' },
  { value: '4', label: 'green' },
  { value: '5', label: 'yellow' },
  { value: '6', label: 'white' }
];

return (
  <Select
    placeholder="Select colors"
    options={options}
    onChange={setSelected}
    values={selected}
  />
 );
}
`;

const group = `
() => {
const [selected, setSelected] = useState([]);
const options = [
  {
    label: 'Colors',
    options: [
      { value: '1', label: 'orange' },
      { value: '2', label: 'purple' },
      { value: '3', label: 'black' },
      { value: '4', label: 'green' },
      { value: '5', label: 'yellow' },
      { value: '6', label: 'white' }
    ]
  },
  {
    label: 'Fruits',
    options: [
      { value: '7', label: 'apple' },
      { value: '8', label: 'orange' },
      { value: '9', label: 'pear' },
      { value: '10', label: 'melon' }
    ]
  }
];

return (
  <Select
      placeholder="Select colors / fruits"
      searchable
      inlineSearch
      multi
      maxTags={2}
      options={options}
      values={selected}
      onChange={setSelected}
    />
  );
}
`;

const all = `
() => {
/*
* Helper for server side queries - instead of passing
* all of the options pass [] or * for all values.
*/
const [selected, setSelected] = useState([]);
const options = [
  {
    label: 'Colors',
    options: [
      { value: '1', label: 'orange' },
      { value: '2', label: 'purple' },
      { value: '3', label: 'black' },
      { value: '4', label: 'green' },
      { value: '5', label: 'yellow' },
      { value: '6', label: 'white' }
    ]
  },
  {
    label: 'Fruits',
    options: [
      { value: '7', label: 'apple' },
      { value: '8', label: 'orange' },
      { value: '9', label: 'pear' },
      { value: '10', label: 'melon' }
    ]
  }
];

const handleChange = useCallback((values, isAll) => {
    if (isAll) {
      setSelected([
        ...options[0].options,
        ...options[1].options,
      ]);
    } else {
      setSelected(values);
    }
}, []);

return (
  <Select
      placeholder="Select colors / fruits"
      searchable
      allFlag
      inlineSearch
      multi
      maxTags={2}
      options={options}
      values={selected}
      onChange={handleChange}
    />
  );
}
`;

const sizesSnippet = `
() => {
const [selected, setSelected] = useState([]);
const options = [
  { value: '1', label: 'orange' },
  { value: '2', label: 'purple' },
  { value: '3', label: 'black' },
  { value: '4', label: 'green' },
  { value: '5', label: 'yellow' },
  { value: '6', label: 'white' }
];

return (
  <Select
    placeholder="Select colors"
    options={options}
    onChange={setSelected}
    values={selected}
    large // possible values: small, large (omit for regular)
  />
 );
}
`;

const searchable = `
() => {
const [selected, setSelected] = useState([]);
const options = [
  { value: '1', label: 'orange' },
  { value: '2', label: 'purple' },
  { value: '3', label: 'black' },
  { value: '4', label: 'green' },
  { value: '5', label: 'yellow' },
  { value: '6', label: 'white' }
];

return (
  <Select
    placeholder="Select colors"
    options={options}
    onChange={setSelected}
    values={selected}
    searchable
  />
 );
}
`;

const inlineSearch = `
() => {
const [selected, setSelected] = useState([]);
const options = [
  { value: '1', label: 'orange' },
  { value: '2', label: 'purple' },
  { value: '3', label: 'black' },
  { value: '4', label: 'green' },
  { value: '5', label: 'yellow' },
  { value: '6', label: 'white' }
];

return (
  <Select
    placeholder="select members"
    searchable
    inlineSearch
    multi
    maxTags={2}
    values={selected}
    options={options}
    onChange={setSelected}
  />
);
};
`;

const multi = `
() => {
const [selected, setSelected] = useState([]);
const options = [
  { value: '1', label: 'orange' },
  { value: '2', label: 'purple' },
  { value: '3', label: 'black' },
  { value: '4', label: 'green' },
  { value: '5', label: 'yellow' },
  { value: '6', label: 'white' }
];

return (
  <Select
      placeholder="select colors"
      multi
      searchable
      values={selected}
      options={options}
      onChange={setSelected}
  />
);
};
`;

const loading = `
() => {
const [selected, setSelected] = useState([]);
const options = [
  { value: '1', label: 'orange' },
  { value: '2', label: 'purple' },
  { value: '3', label: 'black' },
  { value: '4', label: 'green' },
  { value: '5', label: 'yellow' },
  { value: '6', label: 'white' }
];

return (
  <Select
      placeholder="select members"
      searchable
      inlineSearch
      multi
      loading
      maxTags={2}
      values={selected}
      options={options}
      onChange={setSelected}
  />
);
};
`;

export default class SelectDoc extends React.Component {
  render() {
    const title = 'select';
    const description =
      'Selects allow users make a selection from multiple options. They are less prominent and take up less space than selection controls, such as a set of radio buttons.';

    return (
      <Base title={title} description={description} name="Select">
        <Row>
          <Col>
            <SectionTitle>Single Select</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={single} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>Group Select</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={group} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>Select Sizes</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={sizesSnippet} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SectionTitle>Searchable</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={searchable} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>Inline Search</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={inlineSearch} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>Multi Select</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={multi} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>Loading</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={loading} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>All Selected Flag</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={all} />
          </Col>
        </Row>
      </Base>
    );
  }
}

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;
