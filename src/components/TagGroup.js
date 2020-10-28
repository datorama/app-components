import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

// components
import { Tag } from './Tag';

const prepSelection = (selected, id) => {
  const result = [...selected];

  if (result.includes(id)) {
    return result.filter((val) => val !== id);
  }

  return [...result, id];
};

export const TagGroup = ({
  color,
  tags,
  selected,
  onChange,
  className,
  disabled,
}) => (
  <Container className={className}>
    {tags.map((tag) => (
      <StyledTag
        className={
          selected.includes(tag.id) ? 'tag-group-tag-selected' : 'tag-group-tag'
        }
        key={`tag-${tag.id}`}
        selected={selected.includes(tag.id)}
        onClick={() => onChange(prepSelection(selected, tag.id))}
        label={tag.label}
        color={color}
        disabled={disabled}
      />
    ))}
  </Container>
);

TagGroup.propTypes = {
  color: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledTag = styled(Tag)`
  margin: 4px;
`;
