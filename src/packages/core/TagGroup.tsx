import React, {useCallback} from 'react';
import styled from 'styled-components';

// Components
import Tag from './Tag';

type Tag = {
  id: string,
  label: string
};

export interface TagGroupProps {
  color?: string;
  tags: Tag[];
  selected: string[];
  onChange: (selected: string[]) => any,
  className?: string;
  isDisabled?: boolean
}

const TagGroup = (props: TagGroupProps) => {
  const handleClick = useCallback((id: string) => {
    const result = [...props.selected];

    if (result.includes(id)) {
      props.onChange(result.filter(val => val !== id));
    } else {
      props.onChange([...result, id]);
    }
  }, [props]);

  return (
    <Container className={props.className}>
      {props.tags.map(tag => (
        <StyledTag
          className="tag"
          key={`tag-${tag.id}`}
          isSelected={props.selected.includes(tag.id)}
          onClick={() => handleClick(tag.id)}
          color={props.color}
          isDisabled={props.isDisabled}
        >
          {tag.label}
        </StyledTag>
      ))}
    </Container>
  );
};

export default TagGroup;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledTag = styled(Tag)`
  margin-right: 4px;
`;
