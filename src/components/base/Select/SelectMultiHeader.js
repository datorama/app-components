import React, {Fragment} from 'react';
import styled, {css} from 'styled-components/macro';
import PropTypes from 'prop-types';

// components
import {Label, Option, Icon} from './Select';
import {optionsType} from './Select.types';

// assets
import checkIcon from '../../assets/check.svg';
import lineIcon from '../../assets/line.svg';

const SelectMultiHeader = props => {
	const {options, values, multi, selectAll, total} = props;
	
	if (!multi || !options.length) {
		return null;
	}
	
	const counts = `(${values.length}/${total})`;
	let label = 'Select all';
	
	let allIcon = null;
	let allSelected = false;
	let partialSelected = values.length && values.length < options.length;
	
	if (total === values.length) {
		allSelected = true;
		allIcon = checkIcon;
	}
	
	if (partialSelected) {
		allIcon = lineIcon;
	}
	
	if (allSelected || partialSelected) {
		label = 'Deselect all';
	}
	
	return (
		<Fragment>
			<Option className="option" onClick={selectAll} margin="5px 0 0 0">
				<Checkbox
					selected={allSelected}
					touched={partialSelected}
				>
					<Icon
						selected={allSelected || partialSelected}
						src={allIcon}
						top={allSelected ? 4 : 6}
					/>
				</Checkbox>
				<Label>
					{label} <Italic>{counts}</Italic>
				</Label>
			</Option>
			
			<Divider/>
		</Fragment>
	);
};

SelectMultiHeader.propTypes = {
	selectAll: PropTypes.func,
	options: optionsType,
	values: optionsType,
	multi: PropTypes.bool,
	total: PropTypes.number
};

export default SelectMultiHeader;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({theme}) => theme.p200};
`;

const Checkbox = styled.div`
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  border: 1px solid ${({theme}) => theme.p200};
  border-radius: 2px;
  margin-right: 10px;
  position: relative;
  transition: all 300ms;
  overflow: hidden;
  background: ${({touched, theme}) => touched ? theme.p200 : 'transparent'};

  ${({selected}) =>
	selected &&
	css`
      border-color: ${({theme}) => theme.a400};
      background: ${({theme}) => theme.a400};
    `};
`;

const Italic = styled.span`
  ${({theme}) => theme.text.smItalic};
`;
