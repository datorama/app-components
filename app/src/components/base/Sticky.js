import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Sticky = props => {
  const [position, setPosition] = useState('relative');
  const skeletonEl = useRef();
  const { className, children, onChange } = props;

  const handleScroll = useCallback(() => {
    if (skeletonEl) {
      const { top } = skeletonEl.current.getBoundingClientRect();

      if (top <= 0 && position !== 'fixed') {
        setPosition('fixed');
        if (onChange) {
          onChange && onChange({ fixed: true });
        }
      }

      if (top > 0 && position !== 'relative') {
        setPosition('relative');
        if (onChange) {
          onChange && onChange({ fixed: false });
        }
      }
    }
  }, [position, onChange]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Skeleton ref={skeletonEl}>
      <Strip position={position} className={className}>
        {children}
      </Strip>
    </Skeleton>
  );
};

Sticky.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Sticky;

const Skeleton = styled.div`
  width: 100%;
  height: 50px;
`;

const Strip = styled(Skeleton)`
  position: ${({ position }) => position};
  top: ${({ position }) => (position === 'fixed' ? 0 : 'auto')};
`;
