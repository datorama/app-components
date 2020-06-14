import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import { ClickOut } from '../../components';

const ColorPicker = ({ color, onChange }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(!open), [open]);
  const handleClickOut = useCallback(() => {
    if (open) {
      toggleOpen();
    }
  }, [open, toggleOpen]);

  return (
    <Container>
      <ClickOut onClick={handleClickOut}>
        <Outer onClick={toggleOpen}>
          <Inner hex={color} />
        </Outer>

        {open && (
          <ColorContainer>
            <SketchPicker
              disableAlpha={true}
              // presetColors={preset}
              color={color}
              onChange={onChange}
            />
          </ColorContainer>
        )}
      </ClickOut>
    </Container>
  );
};

export default ColorPicker;

const Container = styled.div`
  position: relative;
`;

const Outer = styled.div`
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  padding: 2px;
  border: 1px solid ${({ theme }) => theme.p300};
  border-radius: 2px;
  cursor: pointer;
`;

const Inner = styled.div`
  width: 34px;
  height: 34px;
  background: ${({ hex }) => hex};
`;

const ColorContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 10px;
  z-index: 10;
`;
