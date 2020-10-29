import React, { useState, useCallback } from 'react';
import { GoalsChart } from '../components/GoalsChart/GoalsChart';

export default {
  title: 'core/GoalsChart',
  component: GoalsChart,
  argTypes: {
    ticksColor: { control: 'color' },
    dragColor: { control: 'color' },
    labelsColor: { control: 'color' },
    areaColor: { control: 'color' },
    lineColor: { control: 'color' },
    fillColor: { control: 'color' },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(50);
  const onControlledChange = useCallback((nextValue) => {
    setValue(nextValue);
  }, []);

  return (
    <GoalsChart
      {...args}
      onChange={onControlledChange}
      value={value}
      valueFormatter={(v) => v + '%'}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  data: [
    [0, 40],
    [100, 80],
    [200, 30],
    [300, 50],
    [400, 40],
    [500, 80],
  ],
};
