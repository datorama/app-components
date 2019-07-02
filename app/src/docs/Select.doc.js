import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Select } from '../components/index';
import Snippet from './Snippet';

const single = `
import { Select } from '@datorama/app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      placeholder="Select colors"
      options={[]}
      values={selected}
    />
  </Fragment>
);
`;

const group = `
import { Select } from '@datorama/app-components';

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
]

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      placeholder="Select colors / fruits"
      searchable
      inlineSearch
      multi
      maxTags={2}
      options={options}
    />
  </Fragment>
);
`;

const sizesSnippet = `
import { Select } from '@datorama/app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      placeholder="Select colors"
      options={[]}
      values={selected}
      small={false}
      large
    />
  </Fragment>
);
`;

const searchable = `
import { Select } from '@datorama/app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      searchable
      placeholder="Select colors"
      options={[]}
      values={selected}
    />
  </Fragment>
);
`;

const inlineSearch = `
import { Select } from '@datorama/app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      searchable
      inlineSearch
      multi
      maxTags={3}
      placeholder="Select colors"
      options={[]}
      values={selected}
    />
  </Fragment>
);
`;

const multi = `
import { Select } from '@datorama/app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      multi
      searchable
      placeholder="Select colors"
      options={[]}
      values={selected}
    />
  </Fragment>
);
`;

const loading = `
import { Select } from '@datorama/app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      multi
      searchable
      placeholder="Select colors"
      options={[]}
      values={selected}
      loading
    />
  </Fragment>
);
`;

export default class SelectDoc extends React.Component {
  state = {
    values0: [],
    values1: [],
    values2: [],
    values3: [],
    values4: [],
    values5: [],
    values6: [],
    values7: [],
    values8: [],
    values9: []
  };

  render() {
    const {
      values0,
      values1,
      values2,
      values3,
      values4,
      values5,
      values6,
      values7,
      values8,
      values9
    } = this.state;
    const title = 'select';
    const description =
      'Selects allow users make a selection from multiple options. They are less prominent and take up less space than selection controls, such as a set of radio buttons.';

    return (
      <Base title={title} description={description} name="Select">
        <Row>
          <Col>
            <SectionTitle>single select</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={single} />
          </Col>
          <Col>
            <Box>
              <Select
                placeholder="select colors"
                values={values1}
                options={[
                  { value: '1', label: 'orange' },
                  { value: '2', label: 'purple' },
                  { value: '3', label: 'black' },
                  { value: '4', label: 'green' },
                  { value: '5', label: 'yellow' },
                  { value: '6', label: 'white' },
                  { value: '7', label: 'blue' },
                  { value: '8', label: 'pink' },
                  { value: '9', label: 'gray' }
                ]}
                onChange={values1 => this.setState({ values1 })}
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>Group select</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={group} />
          </Col>
          <Col>
            <Box>
              <Select
                placeholder="select colors / fruits"
                searchable
                inlineSearch
                multi
                maxTags={2}
                values={values0}
                options={[
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
                ]}
                onChange={values0 => this.setState({ values0 })}
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>select sizes</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={sizesSnippet} />
          </Col>
          <Col>
            <Box>
              <StyledSelect
                placeholder="select colors"
                values={values5}
                searchable
                options={[
                  { value: '1', label: 'orange' },
                  { value: '2', label: 'purple' },
                  { value: '3', label: 'black' },
                  { value: '4', label: 'green' },
                  { value: '5', label: 'yellow' },
                  { value: '6', label: 'white' }
                ]}
                onChange={values5 => this.setState({ values5 })}
                small
              />

              <StyledSelect
                placeholder="select colors"
                values={values6}
                searchable
                options={[
                  { value: '1', label: 'orange' },
                  { value: '2', label: 'purple' },
                  { value: '3', label: 'black' },
                  { value: '4', label: 'green' },
                  { value: '5', label: 'yellow' },
                  { value: '6', label: 'white' }
                ]}
                onChange={values6 => this.setState({ values6 })}
              />

              <StyledSelect
                placeholder="select colors"
                values={values7}
                searchable
                options={[
                  { value: '1', label: 'orange' },
                  { value: '2', label: 'purple' },
                  { value: '3', label: 'black' },
                  { value: '4', label: 'green' },
                  { value: '5', label: 'yellow' },
                  { value: '6', label: 'white' }
                ]}
                onChange={values7 => this.setState({ values7 })}
                large
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>searchable</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={searchable} />
          </Col>
          <Col>
            <Box>
              <Select
                placeholder="select colors"
                searchable
                values={values2}
                options={[
                  { value: '1', label: 'orange' },
                  { value: '2', label: 'purple' },
                  { value: '3', label: 'black' },
                  { value: '4', label: 'green' },
                  { value: '5', label: 'yellow' },
                  { value: '6', label: 'white' }
                ]}
                onChange={values2 => this.setState({ values2 })}
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>inline search</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={inlineSearch} />
          </Col>
          <Col>
            <Box>
              <InlineSelect
                placeholder="select members"
                searchable
                inlineSearch
                multi
                maxTags={2}
                values={values4}
                options={[
                  { value: '1', label: 'Robert Baratheon' },
                  { value: '2', label: 'Jaime Lannister' },
                  { value: '3', label: 'Catelyn Stark' },
                  { value: '4', label: 'Daenerys Targaryen' },
                  { value: '5', label: 'Tyrion Lannister' },
                  { value: '6', label: 'Khal Drogo' }
                ]}
                onChange={values4 => this.setState({ values4 })}
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>multi select</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={multi} />
          </Col>
          <Col>
            <Box>
              <Select
                placeholder="select colors"
                multi
                searchable
                values={values3}
                options={[
                  { value: '1', label: 'orange' },
                  { value: '2', label: 'purple' },
                  { value: '3', label: 'black' },
                  { value: '4', label: 'green' },
                  { value: '5', label: 'yellow' },
                  { value: '6', label: 'white' }
                ]}
                onChange={values3 => this.setState({ values3 })}
              />
            </Box>
          </Col>
        </Row>

        <Row>
          <Col>
            <SectionTitle>loading</SectionTitle>
          </Col>
        </Row>
        <Row align="stretch">
          <Col>
            <Snippet snippet={loading} />
          </Col>
          <Col>
            <Box>
              <InlineSelect
                placeholder="select members"
                searchable
                inlineSearch
                multi
                loading
                maxTags={2}
                values={values8}
                options={[
                  { value: '1', label: 'Robert Baratheon' },
                  { value: '2', label: 'Jaime Lannister' },
                  { value: '3', label: 'Catelyn Stark' },
                  { value: '4', label: 'Daenerys Targaryen' },
                  { value: '5', label: 'Tyrion Lannister' },
                  { value: '6', label: 'Khal Drogo' }
                ]}
                onChange={values8 => this.setState({ values8 })}
              />

              <Select
                placeholder="select colors"
                values={values9}
                loading
                options={[
                  { value: '1', label: 'orange' },
                  { value: '2', label: 'purple' },
                  { value: '3', label: 'black' },
                  { value: '4', label: 'green' },
                  { value: '5', label: 'yellow' },
                  { value: '6', label: 'white' }
                ]}
                onChange={values9 => this.setState({ values9 })}
              />
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  margin: 4px 0;
`;

const InlineSelect = styled(Select)`
  margin: 10px 0;
`;
