import React from 'react';
import { ErrorPage } from '../components/ErrorPage';
import styled from 'styled-components';

export default {
  title: 'core/ErrorPage',
  component: ErrorPage,
  argTypes: {},
};

const Template = (args) => <StyledErrorPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Oops... Something went wrong',
  subtitle: 'A problem was encountered while installing "App Name"',
  buttonLabel: 'Back to Market',
};

const StyledErrorPage = styled(ErrorPage)`
  height: 600px;
  width: 100%;
  position: relative;
`;
