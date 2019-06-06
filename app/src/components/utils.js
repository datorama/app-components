export const hexToRgba = (hex, opacity) => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

const getShadePercent = varNum => {
  const accent = varNum.toString();
  switch (accent) {
    case '0':
      return 1;
    case '50':
      return 0.9;
    case '100':
      return 0.75;
    case '200':
      return 0.6;
    case '300':
      return 0.3;
    case '350':
      return 0.3;
    case '400':
      return 0;
    case '500':
      return -0.25;
    case '600':
      return -0.45;
    case '700':
      return -0.55;
    case '800':
      return -0.75;
    default:
      return 1;
  }
};

export const shadeColor = (argColor, varNum) => {
  let color = argColor;
  if (color.toUpperCase() === '#FFF') {
    color = '#ffffff';
  }

  const percent = getShadePercent(varNum);
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;

  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`;
};

export const rgbToHex = ({ r, g, b }) => {
  let rs = r.toString(16);
  let gs = g.toString(16);
  let bs = b.toString(16);

  if (rs.length === 1) rs = '0' + r;
  if (gs.length === 1) gs = '0' + g;
  if (bs.length === 1) bs = '0' + b;

  return '#' + rs + gs + bs;
};

export const hexToRgb = hex => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];

    // 6 digits
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }

  return {
    r: +r,
    g: +g,
    b: +b
  };
};

export const rgbToHsv = ({ r, g, b }) => {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;

  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs);
  diff = v - Math.min(rabs, gabs, babs);
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;

  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100)
  };
};

export const hsvToRgb = ({ h, s, v }) => {
  let r, g, b;
  let i;
  let f, p, q, t;

  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));

  // We accept saturation and value arguments from 0 to 100
  s /= 100;
  v /= 100;

  if (s === 0) {
    // Achromatic (grey)
    r = g = b = v;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;

    case 1:
      r = q;
      g = v;
      b = p;
      break;

    case 2:
      r = p;
      g = v;
      b = t;
      break;

    case 3:
      r = p;
      g = q;
      b = v;
      break;

    case 4:
      r = t;
      g = p;
      b = v;
      break;

    default:
      // case 5:
      r = v;
      g = p;
      b = q;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};
