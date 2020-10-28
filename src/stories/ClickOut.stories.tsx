import React, { useState, useCallback } from 'react';
import { ClickOut } from '../components/ClickOut';
import styled from 'styled-components';

export default {
  title: 'core/ClickOut',
  component: ClickOut,
  argTypes: {
    children: { control: 'none' },
  },
};

const Template = (args) => {
  const [clicks, setClicks] = useState(0);
  const handleClick = useCallback(() => setClicks(clicks + 1), [clicks]);

  return (
    <ClickOut {...args} onClick={handleClick}>
      <Rect>{clicks} Clicks outside this box</Rect>
    </ClickOut>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

const Rect = styled.div`
  width: 100%;
  height: 100px;
  background: ${({ theme }) => theme.p100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.p300};
`;
