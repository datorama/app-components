import React from 'react';
import styled, {css} from 'styled-components';
import {range} from 'lodash/fp';
import PropTypes from 'prop-types';

const Pagination = ({selected, total, onChange}) => {
	if (total > 6) {
	
	}
	const ids = range(1, total + 1);
	const first = ids[0];
	const last = ids[ids.length - 1];
	
	return (
		<Container>
			<Button filled onClick={() => onChange(first)}/>
			<Button filled onClick={() => onChange(Math.max(first, selected - 1))}/>
			
			{
				ids.map(id => (
					<Button
						key={`page-${id}`}
						onClick={() => onChange(id)}
						selected={id === selected}
					>
						{id}
					</Button>
				))
			}
			
			<Button filled onClick={() => onChange(Math.min(last, selected + 1))}/>
			<Button filled onClick={() => onChange(last)}/>
		</Container>
	);
};

Pagination.propTypes = {
	selected: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default Pagination;

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const Button = styled.div`
	width: 24px;
	height: 24px;
	background: ${({theme, filled}) => filled ? theme.p100 : 'transparent'};
	margin: 0 2px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 300ms;
	border-radius: 2px;
	
	${({theme}) => theme.text.smLink};
	color: ${({theme}) => theme.p300};
	
	${({selected, theme}) => selected && css`
		color: ${theme.p700};
	`};
`;