import React from 'react';

const getViewportOffset = element => {
  let node = element,
    left = node.offsetLeft,
    top = node.offsetTop;

  node = node.parentNode;

  do {
    const styles = getComputedStyle(node);

    if (styles) {
      const position = styles.getPropertyValue('position');

      left -= node.scrollLeft;
      top -= node.scrollTop;

      if (/relative|absolute|fixed/.test(position)) {
        left += parseInt(styles.getPropertyValue('border-left-width'), 10);
        top += parseInt(styles.getPropertyValue('border-top-width'), 10);

        left += node.offsetLeft;
        top += node.offsetTop;
      }

      node = position === 'fixed' ? null : node.parentNode;
    } else {
      node = node.parentNode;
    }
  } while (node);

  return { left, top };
};

const Popup = () => {
  return <div />;
};

Popup.propTypes = {};

export default Popup;
