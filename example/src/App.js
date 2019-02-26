import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

// lib
import { AppTheme, lightTheme, Button, Datepicker } from 'app-components'

export default class App extends Component {
  render () {
    return (
      <AppTheme theme={lightTheme} provider={ThemeProvider}>
        <div>
          <Test />
          <Button onClick={() => null}>do something</Button>
          <Datepicker />
        </div>
      </AppTheme>
    )
  }
}

const Test = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.a400};
`;
