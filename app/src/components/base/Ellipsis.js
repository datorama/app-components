import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

// ellipsis types
const DEFAULT = 'DEFAULT';
const SINGLE = 'SINGLE-LINE-ELLIPSIS';

const Ellipsis = ({ children, className }) => {
  const [type, setType] = useState();
  const parent = useRef(null);
  const element = useRef(null);

  let width = 0;
  let parentWidth = 0;

  if (element.current) {
    width = element.current.getBoundingClientRect().width;
  }

  if (parent.current) {
    parentWidth = parent.current.getBoundingClientRect().width;
  }

  useEffect(() => {
    if (width >= parentWidth) {
      setType(SINGLE);
    } else {
      if (width && parentWidth) {
        setType(DEFAULT);
      }
    }
  }, [width, parentWidth, children]);

  if (type === SINGLE) {
    return (
      <Tooltip title={children}>
        <Container ref={parent} type={type}>
          <span ref={element} className={className}>
            {children}
          </span>
        </Container>
      </Tooltip>
    );
  }

  return (
    <Container ref={parent} type={type}>
      <span ref={element} className={className}>
        {children}
      </span>
    </Container>
  );
};

Ellipsis.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Ellipsis;

const Container = styled.div`
  position: relative;
  height: auto;
  width: auto;
  white-space: nowrap;
  opacity: 0;
  ${({ theme }) => theme.text.p};

  ${({ type }) =>
    type === DEFAULT &&
    `
    opacity: 1;
  `};

  ${({ type }) =>
    type === SINGLE &&
    `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 1;
  `};
`;
