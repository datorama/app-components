import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import searchIcon from '../../assets/search-thin.svg';

const SelectSearch = props =>
	props.searchable && (
		<Container>
			<Input
				placeholder={props.searchPlaceholder || "Search"}
				onChange={props.onChange}
				value={props.value}
			/>
			<SearchIcon/>
		</Container>
	);

SelectSearch.propTypes = {
	searchable: PropTypes.bool,
	onChange: PropTypes.func,
	value: PropTypes.string,
	searchPlaceholder: PropTypes.string
};

export default SelectSearch;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  margin: 10px 10px 0 10px;
  height: 30px;
  border-radius: 2px;
  border: 1px solid #ccced3;
  box-sizing: border-box;
  padding: 0 30px 0 10px;
  font-size: 13px;
  font-weight: 300;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9ea0a5;
  }
`;

const SearchIcon = styled.div`
  width: 18px;
  height: 18px;
  background: url(${searchIcon}) no-repeat;
  background-size: contain;
  position: absolute;
  right: 15px;
  top: calc(50% - 4px);
`;
