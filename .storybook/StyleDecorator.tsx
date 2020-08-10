import React from 'react';
import '../src/index.css';
import styled, {ThemeProvider} from 'styled-components';
import {lightTheme} from '../src/packages/core';

const StyleDecorator = (Story: any) => (
  <ThemeProvider theme={lightTheme}>
    <Container>
      <Story />
    </Container>
  </ThemeProvider>
);

export default StyleDecorator;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
