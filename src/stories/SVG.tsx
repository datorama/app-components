import React, { useState } from 'react';
import { lightTheme } from '../constants/themes.constants';
import { AppThemeProvider } from '../components/AppThemeProvider/AppThemeProvider';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

export const SVG = () => {
  const [a400, setA400] = useState(lightTheme.a400);
  const [s400, setS400] = useState(lightTheme.s400);
  const [p400, setP400] = useState(lightTheme.p400);

  return (
    <AppThemeProvider
      theme={{ ...lightTheme, a400, s400, p400 }}
      provider={ThemeProvider}
    >
      <Title>Example:</Title>
      <ColorPickerContainer>
        <label htmlFor="a400">Rebrand a400 (first hue): </label>
        <input
          id="a400"
          type="color"
          onChange={(e) => setA400(e.target.value)}
          value={a400}
          style={{ width: '50px' }}
        />
      </ColorPickerContainer>
      <ColorPickerContainer>
        <label htmlFor="s400">Rebrand s400 (second hue): </label>
        <input
          id="s400"
          type="color"
          onChange={(e) => setS400(e.target.value)}
          value={s400}
          style={{ width: '50px' }}
        />
      </ColorPickerContainer>
      <ColorPickerContainer>
        <label htmlFor="p400">Rebrand p400 (neutral hue): </label>
        <input
          id="p400"
          type="color"
          onChange={(e) => setP400(e.target.value)}
          value={p400}
          style={{ width: '50px' }}
        />
      </ColorPickerContainer>
      <div style={{ height: '500px', width: '400px' }}>
        <svg width="500px" height="400px" xmlns="http://www.w3.org/2000/svg">
          <g fillOpacity="0.6">
            <circle
              className="a-400-fill"
              cx="6.5cm"
              cy="2cm"
              r="100"
              transform="translate(0,50)"
            />
            <circle
              className="s-400-fill"
              cx="6.5cm"
              cy="2cm"
              r="100"
              transform="translate(70,150)"
            />
            <circle
              className="p-400-fill"
              cx="6.5cm"
              cy="2cm"
              r="100"
              transform="translate(-70,150)"
            />
          </g>
        </svg>
      </div>
    </AppThemeProvider>
  );
};

const ColorPickerContainer = styled.div`
  align-items: flex-start;
  color: ${({ theme }) => theme.p600};
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  width: 250px;
`;

const Title = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.p600};
  font-weight: 300;
  text-transform: capitalize;
  margin: 40px 0 20px 0;
`;
