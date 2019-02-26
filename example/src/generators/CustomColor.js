import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { SketchPicker } from 'react-color';

// components and utils
import {ClickOut, lightTheme, shadeColor} from 'app-components';

const Color = ({ label, color, onClick, small }) => (
  <ColorCard onClick={onClick} small={small}>
    <ColorPreview color={color}>{!small && <PaintIcon />}</ColorPreview>

    <ColorCardInfo>
      <Info>{label}</Info>
      <Info>{color}</Info>
    </ColorCardInfo>
  </ColorCard>
);

class CustomColor extends Component {
  state = {
    active: null
  };

  handleChangeComplete = color => {
    const { updateTheme } = this.props;

    updateTheme({
      a100: shadeColor(color.hex, 100),
      a200: shadeColor(color.hex, 200),
      a300: shadeColor(color.hex, 300),
      a350: shadeColor(color.hex, 350),
      a400: color.hex,
      a500: shadeColor(color.hex, 500),
      a600: shadeColor(color.hex, 600),
      a700: shadeColor(color.hex, 700),
      a800: shadeColor(color.hex, 800)
    });
  };

  handleClick = () => {
    if (this.state.active) {
      this.setState({ active: null });
    }
  };

  render() {
    const { open, theme, light } = this.props;
    const { active } = this.state;
    const colors = [
      'a100',
      'a200',
      'a300',
      'a350',
      'a400',
      'a500',
      'a600',
      'a700',
      'a800'
    ];
    const preset = colors.map(color => lightTheme[color]);

    return (
      <ClickOut onClick={this.handleClick}>
        <Strip active={open} light={light}>
          {colors.map(color => (
            <ColorContainer key={color}>
              <Color
                small={color !== 'a400'}
                label={color}
                color={theme[color]}
                onClick={() => this.setState({ active: color })}
              />
              {color === 'a400' && (
                <ColorPop>
                  {color === active && (
                    <SketchPicker
                      disableAlpha={true}
                      presetColors={preset}
                      color={theme[color]}
                      onChangeComplete={this.handleChangeComplete}
                    />
                  )}
                </ColorPop>
              )}
            </ColorContainer>
          ))}
        </Strip>
      </ClickOut>
    );
  }
}

export default CustomColor;

const Strip = styled.div`
  width: 100vw;
  height: 200px;
  background: ${({ light }) => (light ? '#fff' : '#272727')};
  transition: margin 500ms;
  margin-top: ${({ active }) => (active ? 0 : -240)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 3;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const ColorContainer = styled.div`
  width: calc(100vw / 9 - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ColorPop = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
`;

const ColorCard = styled.div`
  width: 100%;
  max-width: 120px;
  cursor: pointer;
  height: 140px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 300ms;
  border: 4px solid rgba(0, 0, 0, 0.1);

  ${({ small }) =>
    small &&
    css`
      pointer-events: none;
      width: 100%;
      max-width: 100px;
      height: 120px;
      border: none;
    `};

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ColorPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    opacity: 0;
  }

  &:hover {
    div {
      opacity: 0.6;
    }
  }
`;

const ColorCardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.p0};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
`;

const Info = styled.div`
  font-size: 12px;
  margin: 2px 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.p600};
`;

const PaintIcon = styled.div`
  width: 50px;
  height: 50px;
  background: url(${require('../docs/assets/drop.svg')}) no-repeat;
  background-size: contain;
  transition: all 300ms;
`;
