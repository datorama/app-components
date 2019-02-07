import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {hexToRgba} from '../utils';

const Button = props => (
	<Container
		onClick={props.onClick}
		small={props.small}
		secondary={props.secondary}
		round={props.round}
		disabled={props.disabled}
		className={props.className}
	>
		{props.children}
	</Container>
);

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	small: PropTypes.bool,
	secondary: PropTypes.bool,
	round: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string
};

Button.defaultProps = {
	small: false,
	secondary: false,
	round: false,
	disabled: false
};

export default Button;

const Container = styled.div`
  padding: 0 8px;
  height: 34px;
  background: ${({theme}) => theme.a400};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  ${({theme}) => theme.text.pLink};
  color: #fff;
  transition: all 300ms;
  
  ${({small, theme}) => small && css`
		height: 24px;
		${theme.smLink};
		color: ${theme.p0};
	`};
  
  ${({secondary, theme}) => secondary && css`
		background: ${hexToRgba(theme.p300, 15)};
		color: ${theme.p400};
	`};
  
  ${({round, small}) => round && css`
		padding: 0;
		border-radius: 50%;
		width: ${small ? '24px' : '34px'};
	`};
  
  &:hover {
  	background: ${({theme}) => theme.a500};
  	
  	${({theme, secondary}) => secondary && css`
			background: ${hexToRgba(theme.p300, 25)};
		`};
  }
  
  &:active {
  	background: ${({theme}) => theme.a600};
  	
  	${({theme, secondary}) => secondary && css`
			background: ${hexToRgba(theme.p300, 35)};
		`};
  }
  
  ${({disabled}) => disabled && css`
		pointer-events: none;
		opacity: 0.7;
	`};
`;