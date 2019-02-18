import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Bullet = ({ selected, disabled, className }) => (
  <Container selected={selected} disabled={disabled} className={className} />
);

export default Bullet;

Bullet.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

const Container = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid ${({ theme }) => theme.p200};
  transition: all 300ms;

  ${({ theme, selected, disabled }) => {
    if (selected) {
      return css`
        border: 6px solid ${theme.a400};
        background-color: transparent;
      `;
    } else if (disabled) {
      return css`
        background-color: ${({ theme }) => theme.p200};
        border: none;
        width: 10px;
        height: 10px;
      `;
    }
    // !selected && !disabled
    else {
      return css`
        background-color: ${theme.a400};
        border: 4px solid ${({ theme }) => theme.p0};

        &:hover {
        }
      `;
    }
  }};
`;
