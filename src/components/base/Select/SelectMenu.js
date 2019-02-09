import React from 'react';
import styled, {css} from 'styled-components/macro';
import PropTypes from 'prop-types';

// components
import {optionsType} from './Select.types';
import SelectSearch from './SelectSearch';
import SelectMultiHeader from './SelectMultiHeader';
import SelectNoResults from './SelectNoResults';
import SelectOptions from './SelectOptions';

const SelectMenu = props => {
	const {
		open,
		searchable,
		onSearch,
		options,
		values,
		multi,
		selectAll,
		optionRenderer,
		onSelect,
		menuRenderer,
		searchTerm,
		total,
		maxItems,
		searchPlaceholder,
		optionLabelRenderer
	} = props;
	
	if (menuRenderer) {
		return menuRenderer(props);
	}
	
	let maxHeight = 400;
	if (multi) {
		maxHeight += 5;
	}
	if (searchable) {
		maxHeight += 5;
	}
	
	return (
		<Container visible={open} className="menu" maxheight={`${maxHeight}px`}>
			<SelectSearch
				searchable={searchable}
				onChange={onSearch}
				value={searchTerm}
				searchPlaceholder={searchPlaceholder}
			/>
			
			<SelectMultiHeader
				options={options}
				values={values}
				multi={multi}
				selectAll={selectAll}
				total={total}
			/>
			
			{!options.length && <SelectNoResults/>}
			
			<SelectOptions
				options={options}
				values={values}
				optionRenderer={optionRenderer}
				multi={multi}
				handleClick={onSelect}
				maxItems={maxItems}
				searchable={searchable}
				optionLabelRenderer={optionLabelRenderer}
			/>
		</Container>
	);
};

export default SelectMenu;

SelectMenu.propTypes = {
	open: PropTypes.bool,
	searchable: PropTypes.bool,
	onSearch: PropTypes.func,
	options: optionsType,
	values: optionsType,
	multi: PropTypes.bool,
	selectAll: PropTypes.func,
	optionRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	searchTerm: PropTypes.string,
	total: PropTypes.number,
	maxItems: PropTypes.number,
	searchPlaceholder: PropTypes.string,
	optionLabelRenderer: PropTypes.func
};

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  min-height: 20px;
  max-height: ${({maxHeight}) => maxHeight};
  background: ${({theme}) => theme.p0};
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: all 300ms;
  user-select: none;
  overflow: hidden;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-10px);

  ${({visible}) =>
	visible &&
	css`
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      transform: translateY(0);
    `};
`;
