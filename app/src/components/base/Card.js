import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Card = props => {
  return (
    <Container
      className={props.className}
      clickable={props.clickable}
      onClick={props.clickable && props.onClick}
    >
      {props.children}
    </Container>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;

const Container = styled.div`
  background: ${({ theme }) => theme.p0};
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 30px 40px;
  transition: all 300ms;
  border: 1px solid transparent;

  ${({ clickable, theme }) =>
    clickable &&
    css`
      cursor: pointer;

      &:hover {
        box-shadow: 0 2px 14px 0 ${theme.a200};
        border-color: ${theme.a400};
      }
    `}
`;
