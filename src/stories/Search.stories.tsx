import React, { useCallback, useState } from 'react';
import { filter } from 'lodash/fp';
import styled from 'styled-components';

import { Search } from '../components/Search/Search';
import { Option } from '../types/common.types';

export default {
  title: 'core/Search',
  component: Search,
  argTypes: {},
};

const Template = ({
  withOptionSelection,
}: {
  withOptionSelection: boolean;
}) => {
  const dummyList: Array<Option> = [
    { value: 1, label: 'item 1' },
    { value: 2, label: 'item 2' },
    { value: 3, label: 'item 3' },
    { value: 4, label: 'item 4' },
    { value: 5, label: 'item 5' },
    { value: 6, label: 'item 6' },
    { value: 7, label: 'item 7' },
    { value: 8, label: 'item 8' },
    { value: 9, label: 'item 9' },
    { value: 10, label: 'item 10' },
  ];

  const [selected, setSelected] = useState<string>();
  const [filtered, setFiltered] = useState<Array<Option>>();

  const setFilteredOptions = useCallback(
    ({ searchTerm }: { searchTerm: string }) => {
      return setFiltered(
        filter(({ label }) => label.indexOf(searchTerm) >= 0, dummyList)
      );
    },
    [setFiltered]
  );

  return (
    <Container>
      <Search
        isPending={false}
        fetchFilteredOptions={setFilteredOptions}
        filteredOptions={filtered}
        selectOption={setSelected}
        selectedOption={selected}
        placeholder={'Search'}
        withOptionSelection={withOptionSelection}
      />
    </Container>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

export const WithComboBox = Template.bind({});
WithComboBox.args = { withOptionSelection: true };

const Container = styled.div`
  height: 300px;
  width: 200px;
`;
