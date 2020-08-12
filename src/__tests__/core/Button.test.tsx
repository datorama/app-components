import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { AppTheme, lightTheme, Button } from 'packages/core';
import { ThemeProvider } from 'styled-components';

describe('Button', () => {
  const buttonLabel = 'Test Message';

  it('renders correctly', () => {
    render(
      <AppTheme theme={lightTheme} provider={ThemeProvider}>
        <Button onClick={() => null}>{buttonLabel}</Button>
      </AppTheme>
    );
    expect(screen.getByText(buttonLabel)).toBeInTheDocument();
  });

  it('captures clicks', done => {
    const handleClick = () => done();
    const { getByText } = render(
      <AppTheme theme={lightTheme} provider={ThemeProvider}>
        <Button onClick={handleClick}>{buttonLabel}</Button>
      </AppTheme>
    );
    const node = getByText(buttonLabel);

    fireEvent.click(node);
  });

  afterEach(cleanup);
});
