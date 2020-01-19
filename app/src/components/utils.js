export const hexToRgba = (hex, opacity) => {
  if (typeof hex !== 'string') {
    return hex;
  }

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

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};
