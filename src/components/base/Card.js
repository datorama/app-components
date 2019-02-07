import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = props => {
	return (
		<Container className={props.className}>
			{props.children}
		</Container>
	);
};

Card.propTypes = {
	children: PropTypes.node
};

export default Card;

const Container = styled.div`
	background: ${({theme}) => theme.p0};
	width: 100%;
	border-radius: 2px;
	box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	padding: 30px 40px;
`;
