import React, { useState } from 'react';
import { Range } from '../components/Range';

export default {
  title: 'core/Range',
  component: Range,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState(100);

  return (
    <div style={{ paddingTop: 20 }}>
      <Range {...args} onChange={setValue} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  min: 0,
  max: 200,
  initialValue: 20,
};
