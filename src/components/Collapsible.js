import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

export const Collapsible = (props) => {
  const [height, setHeight] = useState('auto');
  const [isOpen, setIsOpen] = useState(true);

  const { open, children, className } = props;

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleRef = useCallback((el) => {
    if (el) {
      const { height } = el.getBoundingClientRect();
      setHeight(`${height}px`);
      setIsOpen(false);
    }
  }, []);

  let calcHeight = isOpen ? height : 0;
  return (
    <Content
      className={className}
      height={calcHeight}
      open={isOpen}
      ref={handleRef}
    >
      {children}
    </Content>
  );
};

Collapsible.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

const Content = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  transition: all 300ms;
  overflow: hidden;
  opacity: ${({ open }) => (open ? 1 : 0)};
  position: relative;
`;
