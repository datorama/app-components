import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import Tag from './Tag';

const prepSelection = (selected, id) => {
	const result = [...selected];
	
	if (result.includes(id)) {
		return result.filter(val => val !== id);
	}
	
	return [...result, id];
};

const TagGroup = ({color, tags, selected, onChange, className, disabled}) => (
	<Container className={className}>
		{
			tags.map(tag => (
				<StyledTag
					key={`tag-${tag.id}`}
					selected={selected.includes(tag.id)}
					onClick={() => onChange(prepSelection(selected, tag.id))}
					label={tag.label}
					color={color}
					disabled={disabled}
				/>
			))
		}
	</Container>
);

TagGroup.propTypes = {
	color: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		label: PropTypes.string
	})),
	selected: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	className: PropTypes.string,
	disabled: PropTypes.bool
};

export default TagGroup;

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

const StyledTag = styled(Tag)`
	margin: 4px;
`;