import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

import { lightTheme } from '../constants/themes.constants';
import { Toggle } from './Toggle';
import { Tooltip } from './Tooltip';

export const ThemePreview = ({ className, onChange }) => {
  const [primary, setPrimary] = useState(lightTheme.p400);
  const [secondary, setSecondary] = useState(lightTheme.s400);
  const [accent, setAccent] = useState(lightTheme.a400);
  const [dark, setDark] = useState(false);
  const toggleDark = useCallback(() => setDark(!dark), [dark]);

  const accentRef = useRef(null);
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    if (onChange) {
      onChange({
        primary,
        secondary,
        accent,
        isDark: dark,
      });
    }
  }, [dark, accent, primary, secondary, onChange]);

  return (
    <Container className={className}>
      <Toggle label="Dark Mode" onClick={toggleDark} checked={dark} />

      <Divider />

      <Tooltip title="Accent" position="BOTTOM">
        <Color onClick={() => accentRef.current.click()} background={accent}>
          <input
            ref={accentRef}
            type="color"
            onChange={(e) => setAccent(e.target.value)}
            value={accent}
          />
        </Color>
      </Tooltip>

      <Tooltip title="Primary" position="BOTTOM">
        <Color onClick={() => primaryRef.current.click()} background={primary}>
          <input
            ref={primaryRef}
            type="color"
            onChange={(e) => setPrimary(e.target.value)}
            value={primary}
          />
        </Color>
      </Tooltip>

      <Tooltip title="Secondary" position="BOTTOM">
        <Color
          onClick={() => secondaryRef.current.click()}
          background={secondary}
        >
          <input
            ref={secondaryRef}
            type="color"
            onChange={(e) => setSecondary(e.target.value)}
            value={secondary}
          />
        </Color>
      </Tooltip>
    </Container>
  );
};

ThemePreview.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

const Container = styled.div`
  display: flex;
  height: 32px;
  padding: 0 10px;
  background: ${({ theme }) => theme.p0};
  border: 1px solid ${({ theme }) => theme.p200};
  border-radius: 2px;
  align-items: center;
`;

const Color = styled.div.attrs((props) => ({
  style: {
    background: props.background,
  },
}))`
  width: 22px;
  height: 22px;
  margin: 0 4px;
  cursor: pointer;

  input {
    width: 22px;
    height: 22px;
    opacity: 0;
    visibility: hidden;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => theme.p200};
  margin: 0 10px;
`;
