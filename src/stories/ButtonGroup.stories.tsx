import React, { useState } from 'react';
import styled from 'styled-components';
import { get } from 'lodash/fp';

import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { getRgbaThemeColor } from '../utils/theme.utils';

export default {
  title: 'core/Button Group',
  component: ButtonGroup,
};

const Template = (args) => {
  const [selectedValue, setSelectedValue] = useState(0);

  return (
    <ButtonGroup {...args} onChange={setSelectedValue} value={selectedValue} />
  );
};

const CustomStyleExample = (args) => {
  const [selectedValue, setSelectedValue] = useState(0);

  return (
    <StyledButtonGroup
      {...args}
      onChange={setSelectedValue}
      value={selectedValue}
    />
  );
};

const StyledButtonGroup = styled(ButtonGroup)`
  box-shadow: 0 2px 16px 4px ${getRgbaThemeColor('p300', 30)};

  .button-group-selected-overlay {
    background: linear-gradient(
      -225deg,
      ${({ theme }) => theme.a400} 0%,
      ${({ theme }) => theme.a350} 100%
    );
    box-shadow: 0 0 8px 0 ${getRgbaThemeColor('a400', 60)};
    height: 87.5%;
    width: calc((100% / ${get('numOfOptions')}) - 6px);
  }

  .button-group-option {
    transform: scale(1) !important;
    color: ${({ theme }) => theme.p700};
    transition: color 0.25s ease-in-out;

    &.selected {
      color: ${({ theme }) => theme.p0};
    }
  }
`;

export const Primary = Template.bind({});

export const DisabledButton = Template.bind({});

export const CustomStyle = CustomStyleExample.bind({});

Primary.args = {
  width: 250,
  height: 35,
  options: [
    {
      value: 0,
      label: 'Most revenue',
    },
    {
      value: 1,
      label: 'Least revenue',
    },
  ],
};

DisabledButton.args = {
  width: 450,
  height: 35,
  options: [
    {
      value: 0,
      label: 'Most revenue',
    },
    {
      value: 1,
      label: 'Least revenue',
      isDisabled: true,
    },
    {
      value: 2,
      label: 'Least revenue',
    },
  ],
};

CustomStyle.args = {
  width: 450,
  height: 35,
  options: [
    {
      value: 0,
      label: 'Most revenue',
    },
    {
      value: 1,
      label: 'Average Revenue',
    },
    {
      value: 2,
      label: 'Least revenue',
    },
  ],
};
