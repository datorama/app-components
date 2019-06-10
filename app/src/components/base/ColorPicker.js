import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';

// components
import TextInput from './TextInput';
import ClickOut from './ClickOut';

// utils
import { rgbToHex, hexToRgb, rgbToHsv, hsvToRgb } from '../utils';
import { debounce } from 'lodash/fp';

class ColorPicker extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        r: PropTypes.string,
        g: PropTypes.string,
        b: PropTypes.string
      })
    ])
  };

  state = {
    open: false,
    hex: '#FF0000',
    r: 255,
    g: 0,
    b: 0,
    a: 100,

    left: 240,
    top: 0,
    dragging: false,
    delta: false,
    init: false
  };

  colors = [
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

  componentDidMount() {
    const { color } = this.props;

    this.populate();

    if (color) {
      if (typeof color === 'string') {
        // hex
        const rgb = hexToRgb(color);

        this.setState({
          hex: color,
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          init: true
        });
        this.fillGradient(color);
        this.setOpacity(rgb);
      } else {
        // r,g,b
        const hex = rgbToHex(color);

        this.setState({
          hex,
          r: color.r,
          g: color.g,
          b: color.b,
          init: true
        });
        this.fillGradient(hex);
        this.setOpacity(color);
      }
    } else {
      this.setState({ init: true });
    }
  }

  componentDidUpdate(_, prevState) {
    const { r, g, b, a, init } = this.state;

    if (
      init &&
      prevState.init &&
      (r !== prevState.r ||
        g !== prevState.g ||
        b !== prevState.b ||
        a !== prevState.a)
    ) {
      if (this.props.onChange) {
        this.updateParent();
      }
    }
  }

  updateParent = debounce(500, () => {
    const { r, g, b, a, hex } = this.state;

    this.props.onChange({ r, g, b, a, hex });
  });

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }));

  handleMouseDown = () => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({ dragging: true });
  };

  handleMouseMove = e => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.setState(
      {
        delta: !!(Math.abs(x) || Math.abs(y))
      },
      () => {
        this.triggerClick(e);
      }
    );
  };

  updateKey = key => e => {
    this.setState({ [key]: e.target.value }, () => {
      const { r, g, b, a } = this.state;
      const hsv = rgbToHsv({ r, g, b });

      this.fillGradient(`rgba(${r}, ${g}, ${b}, ${a / 100})`);
      this.setState({
        top: 180 - (hsv.v / 100) * 180,
        left: (hsv.s / 100) * 240
      });
    });
  };

  triggerClick = e => {
    const rect = this.canvas.getBoundingClientRect();
    let x = Math.max(0, e.clientX - rect.left);
    let y = Math.max(0, e.clientY - rect.top);

    x = Math.min(x, 240);
    y = Math.min(y, 180);

    const imageData = this.blockCtx.getImageData(x, y, 1, 1).data;

    this.setState(
      {
        top: y,
        left: x,
        r: imageData[0],
        g: imageData[1],
        b: imageData[2],
        hex: rgbToHex({ r: imageData[0], g: imageData[1], b: imageData[2] })
      },
      () => {
        const { r, g, b } = this.state;

        this.setOpacity({ r, g, b });
      }
    );
  };

  handleMouseUp = e => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    if (!this.state.delta) {
      this.triggerClick(e);
    }

    this.setState({ dragging: false, delta: false });
  };

  handleClickOut = () => {
    if (this.state.open) {
      this.toggleOpen();
    }
  };

  // populate the canvases colors
  populate() {
    const colorBlock = this.canvas;
    const { r, g, b, a } = this.state;

    this.blockCtx = colorBlock.getContext('2d');
    this.blockWidth = 240;
    this.blockHeight = 180;

    const colorStrip = this.strip;

    this.stripCtx = colorStrip.getContext('2d');
    this.stripWidth = colorStrip.width;
    this.stripHeight = colorStrip.height;

    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a / 100})`;

    this.blockCtx.rect(0, 0, this.blockWidth, this.blockHeight);
    this.fillGradient(rgbaColor);

    this.stripCtx.rect(0, 0, this.stripWidth, this.stripHeight);

    const grd = this.stripCtx.createLinearGradient(0, 0, this.stripWidth, 0);

    grd.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this.stripCtx.fillStyle = grd;
    this.stripCtx.fill();

    this.setOpacity({ r: 255, g: 0, b: 0 });
  }

  setOpacity({ r, g, b }) {
    const { a } = this.state;

    this.opacityCtx = this.opacity.getContext('2d');
    this.opacityCtx.rect(0, 0, this.stripWidth, this.stripHeight);
    const opacityGrd = this.opacityCtx.createLinearGradient(
      0,
      0,
      this.stripWidth,
      0
    );
    opacityGrd.addColorStop(0, `#ffffff`);
    opacityGrd.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${a / 100})`);
    this.opacityCtx.fillStyle = opacityGrd;
    this.opacityCtx.fill();
  }

  handleOpacityClick = e => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = 240;

    this.setState({ a: Math.round((x / width) * 100) });
  };

  handleStripClick = e => {
    const rect = this.strip.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const imageData = this.stripCtx.getImageData(x, y, 1, 1).data;
    const rgbaColor =
      'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';

    this.setState({
      r: imageData[0],
      g: imageData[1],
      b: imageData[2],
      hex: rgbToHex({ r: imageData[0], g: imageData[1], b: imageData[2] })
    });
    this.fillGradient(rgbaColor);
    this.setOpacity({ r: imageData[0], g: imageData[1], b: imageData[2] });
  };

  fillGradient = color => {
    this.blockCtx.fillStyle = color;
    this.blockCtx.fillRect(0, 0, this.blockWidth, this.blockHeight);

    const grdWhite = this.stripCtx.createLinearGradient(
      0,
      0,
      this.blockWidth,
      0
    );
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    this.blockCtx.fillStyle = grdWhite;
    this.blockCtx.fillRect(0, 0, this.blockWidth, this.blockHeight);

    const grdBlack = this.stripCtx.createLinearGradient(
      0,
      0,
      0,
      this.blockHeight
    );
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    this.blockCtx.fillStyle = grdBlack;
    this.blockCtx.fillRect(0, 0, this.blockWidth, this.blockHeight);
  };

  setColor = color => () => {
    const rgb = hexToRgb(color);
    const hsv = rgbToHsv({ r: rgb.r, g: rgb.g, b: rgb.b });

    const parentHsv = { h: hsv.h, s: 100, v: 100 };
    const parentRgb = hsvToRgb({
      h: parentHsv.h,
      s: parentHsv.s,
      v: parentHsv.v
    });

    this.setState(
      {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: 100,
        hex: color,
        top: 180 - (hsv.v / 100) * 180,
        left: (hsv.s / 100) * 240
      },
      () => {
        this.fillGradient(
          `rgba(${parentRgb.r}, ${parentRgb.g}, ${parentRgb.b}, 1)`
        );
      }
    );
  };

  handleHexChange = e => {
    const rgb = hexToRgb(e.target.value);
    const hsv = rgbToHsv({ r: rgb.r, g: rgb.g, b: rgb.b });

    const parentHsv = { h: hsv.h, s: 100, v: 100 };
    const parentRgb = hsvToRgb({
      h: parentHsv.h,
      s: parentHsv.s,
      v: parentHsv.v
    });

    this.setState(
      {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: 100,
        hex: e.target.value,
        top: 180 - (hsv.v / 100) * 180,
        left: (hsv.s / 100) * 240
      },
      () => {
        this.fillGradient(
          `rgba(${parentRgb.r}, ${parentRgb.g}, ${parentRgb.b}, 1)`
        );
      }
    );
  };

  render() {
    const { open, hex, r, g, b, a, top, left } = this.state;
    const { theme } = this.props;

    return (
      <Relative>
        <ClickOut onClick={this.handleClickOut}>
          <PreviewContainer>
            <Label>Background</Label>
            <Preview onClick={this.toggleOpen}>
              <Inner color={`rgba(${r}, ${g}, ${b}, ${a / 100})`} />
            </Preview>
          </PreviewContainer>

          <Menu open={open && 'open'}>
            <Canvases>
              <Relative>
                <Canvas
                  ref={el => (this.canvas = el)}
                  width={240}
                  height={180}
                  onMouseDown={this.handleMouseDown}
                />
                <Circle top={top} left={left} />
              </Relative>

              <Relative>
                <Strip
                  width={240}
                  height={10}
                  ref={el => (this.strip = el)}
                  onClick={this.handleStripClick}
                />
                <Handle left={(rgbToHsv({ r, g, b }).h / 360) * 240} />
              </Relative>

              <Relative>
                <Opacity
                  width={240}
                  height={10}
                  ref={el => (this.opacity = el)}
                  onClick={this.handleOpacityClick}
                />
                <Handle left={(a / 100) * 240 - 3} />
              </Relative>
            </Canvases>

            <Presets>
              {this.colors.map(color => (
                <Preset
                  key={color}
                  color={theme[color]}
                  onClick={this.setColor(theme[color])}
                />
              ))}
            </Presets>

            <Inputs>
              <StyledInput
                value={hex}
                onChange={this.handleHexChange}
                max="calc(100% / 3 - 5px)"
                label="Hex"
              />
              <StyledInput
                value={r.toString()}
                onChange={this.updateKey('r')}
                label="R"
              />
              <StyledInput
                value={g.toString()}
                onChange={this.updateKey('g')}
                label="G"
              />
              <StyledInput
                value={b.toString()}
                onChange={this.updateKey('b')}
                label="B"
              />
              <StyledInput
                value={a.toString()}
                onChange={this.updateKey('a')}
                label="A"
              />
            </Inputs>
          </Menu>
        </ClickOut>
      </Relative>
    );
  }
}

const Relative = styled.div`
  position: relative;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  margin-right: 10px;
`;

const Preview = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background: ${({ theme }) => theme.p0};
  border: 1px solid ${({ theme }) => theme.p200};
  box-sizing: border-box;
  padding: 3px;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    border: 1px solid ${({ theme }) => theme.p300};
  }
`;

const Inner = styled.div.attrs({
  style: ({ color }) => ({
    background: color
  })
})`
  width: 22px;
  height: 22px;
`;

const Menu = styled.div`
  width: 260px;
  min-height: 320px;
  background: ${({ theme }) => theme.p0};
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  transition: all 300ms;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    `};
`;

const Canvases = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Circle = styled.div.attrs({
  style: ({ top, left }) => ({
    top: `${top}px`,
    left: `${left}px`
  })
})`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid #000;
  position: absolute;
  margin-top: -3px;
  margin-left: -3px;
  pointer-events: none;
`;

const Presets = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const Preset = styled.div`
  width: 14px;
  height: 14px;
  background: ${({ color }) => color};
  cursor: crosshair;
`;

const Canvas = styled.canvas`
  width: 240px;
  height: 180px;
  background: #000;
  cursor: crosshair;
`;

const Strip = styled.canvas`
  width: 240px;
  height: 10px;
  background: #000;
  cursor: crosshair;
`;

const Opacity = styled.canvas`
  width: 240px;
  height: 10px;
  background: #000;
  cursor: crosshair;
`;

const Inputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  width: 100%;
  height: 20px;
  max-width: ${({ max }) => max || 'calc(100% / 6 - 5px)'};
  margin-top: 10px;

  input {
    font-size: 12px;
    padding: 0 4px;
  }
`;

const Handle = styled.div`
  left: ${({ left }) => left}px;
  position: absolute;
  top: 2px;
  width: 6px;
  height: 18px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

export default withTheme(ColorPicker);
