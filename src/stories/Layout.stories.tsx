import React from 'react';
import styled from 'styled-components';

import { GridLayout } from '../components/GridLayout/GridLayout';
import { GridItem } from '../components/GridLayout/GridItem';

export default {
  title: 'core/Grid Layout',
  component: GridLayout,
  subcomponents: {
    GridItem,
  },
  argTypes: {},
};

export const Primary = (args) => (
  <StyledLayout {...args}>
    <StyledLayoutItem>1</StyledLayoutItem>
    <StyledLayoutItem>2</StyledLayoutItem>
    <StyledLayoutItem>3</StyledLayoutItem>
    <StyledLayoutItem>4</StyledLayoutItem>
    <StyledLayoutItem>5</StyledLayoutItem>
    <StyledLayoutItem>6</StyledLayoutItem>
    <StyledLayoutItem>7</StyledLayoutItem>
    <StyledLayoutItem>8</StyledLayoutItem>
    <StyledLayoutItem>9</StyledLayoutItem>
    <StyledLayoutItem>10</StyledLayoutItem>
    <StyledLayoutItem>11</StyledLayoutItem>
    <StyledLayoutItem>12</StyledLayoutItem>
  </StyledLayout>
);

export const Advanced = (args) => (
  <StyledLayout {...args}>
    <StyledLayoutItem column="span 1">Logo</StyledLayoutItem>
    <StyledLayoutItem column="span 11">Navigation</StyledLayoutItem>

    <StyledLayoutItem column="span 12">Hero</StyledLayoutItem>

    <StyledLayoutItem column="span 12">Third</StyledLayoutItem>
    <StyledLayoutItem column="span 12">Third</StyledLayoutItem>
    <StyledLayoutItem column="span 12">Third</StyledLayoutItem>

    <StyledLayoutItem column="span 6">Sidebar</StyledLayoutItem>
    <StyledLayoutItem column="7 / 13">Half</StyledLayoutItem>
    <StyledLayoutItem column="7 / 13">Half</StyledLayoutItem>
  </StyledLayout>
);

const StyledLayout = styled(GridLayout)`
  background: ${({ theme }) => theme.g100};
`;

const StyledLayoutItem = styled(GridItem)`
  background: ${({ theme }) => theme.a300};
  ${({ theme }) => theme.text.smBold};
  color: ${({ theme }) => theme.p0};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
`;
