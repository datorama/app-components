import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

const Animate = props => <Container direction={props.direction}>{props.children}</Container>;

Animate.propTypes = {
	type: PropTypes.oneOf(['fade']),
	direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

export default Animate;

const Container = styled.div`
  opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fadeIn forwards;

  @keyframes fadeIn {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate(0, 0);
    }
  }
  
  ${({ direction }) => direction === 'top' && css`
		transform: translate(0, 20px);
	`};
  
  ${({direction}) => direction === 'bottom' && css`
		transform: translate(0, -20px);
	`};

	${({ direction }) => direction === 'left' && css`
		transform: translate(20px, 0);
	`};

	${({ direction }) => direction === 'right' && css`
		transform: translate(-20px, 0);
	`};
`;