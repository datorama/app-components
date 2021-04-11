import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { SearchInput } from '../components/Search/SearchInput';

export default {
  title: 'core/Search Input',
  component: SearchInput,
  argTypes: {
    placeholder: { control: 'text' },
    onChange: { control: 'none' },
    onClose: { control: 'none' },
    onOpen: { control: 'none' },
  },
};

const Template = (args) => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <SearchInput {...args} value={value} onChange={setValue} />
    </Container>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

const Container = styled.div`
  height: 300px;
  width: 200px;
`;
