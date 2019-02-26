import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';

// components
import Base from './Base';
import {Row, Col, Select} from 'app-components';

const single = `
import { Select } from 'app-components';

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

const sizesSnippet = `
import { Select } from 'app-components';

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
import { Select } from 'app-components';

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
import { Select } from 'app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Select
      searchable
      inlineSearch
      placeholder="Select colors"
      options={[]}
      values={selected}
    />
  </Fragment>
);
`;

const multi = `
import { Select } from 'app-components';

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

export default class SelectDoc extends React.Component {
  state = {
    values1: [],
    values2: [],
    values3: [],
    values4: [],
    values5: [],
    values6: [],
    values7: []
  };

  render() {
    const {
      values1,
      values2,
      values3,
      values4,
      values5,
      values6,
      values7
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
            <Highlight language="javascript">{single}</Highlight>
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
                  { value: '6', label: 'white' }
                ]}
                onChange={values1 => this.setState({ values1 })}
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
            <Highlight language="javascript">{sizesSnippet}</Highlight>
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
            <Highlight language="javascript">{searchable}</Highlight>
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
            <Highlight language="javascript">{inlineSearch}</Highlight>
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
            <Highlight language="javascript">{multi}</Highlight>
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

const InlineSelect = styled(Select)``;
