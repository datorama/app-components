import React from 'react';
import { Asset } from '../components/Asset';
import styled from 'styled-components';

export default {
  title: 'core/Asset',
  component: Asset,
  argTypes: {},
};

const Template = (args) => (
  <Card>
    <StyledAsset {...args} />
  </Card>
);

export const Primary = Template.bind({});

Primary.args = {
  name: 'error-state',
};

const Card = styled.div`
  width: 400px;
  height: 120px;
`;

const StyledAsset = styled(Asset)`
  width: 300px;
  height: 130px;
`;
