import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  onSearchChange: (term: string) => void;
}

const Actions = (props: Props) => {
  const { onSearchChange } = props;
  const handleChange = useCallback(
    (e) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  return (
    <Container className="actions-container">
      <SearchInput onChange={handleChange} placeholder="Search" />
    </Container>
  );
};

export default Actions;

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  width: 160px;
  height: 30px;
  border-radius: 2px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.p200};
  font-size: 14px;
  color: ${({ theme }) => theme.p600};
  box-sizing: border-box;
  padding: 0 10px;
  transition: all 300ms;

  &::placeholder {
    color: ${({ theme }) => theme.p200};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.a400};
  }
`;
