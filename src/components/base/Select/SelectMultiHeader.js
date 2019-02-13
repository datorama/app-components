import React, {Fragment} from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

// components
import {Label, Option} from './Select';
import {optionsType} from './Select.types';
import Checkbox from '../Checkbox';

const SelectMultiHeader = props => {
	const {options, values, multi, selectAll, total} = props;
	
	if (!multi || !options.length) {
		return null;
	}
	
	const counts = `(${values.length}/${total})`;
	let label = 'Select all';
	
	let allSelected = false;
	let partialSelected = values.length && values.length < options.length;
	
	if (total === values.length) {
		allSelected = true;
	}
	
	if (allSelected || partialSelected) {
		label = 'Deselect all';
	}
	
	return (
		<Fragment>
			<Option className="option" onClick={selectAll} margin="5px 0 0 0">
				<StyledCheckbox
					checked={!!allSelected || !!partialSelected}
					partial={!!partialSelected}
				/>
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
  background: ${({theme}) => theme.p100};
`;

const StyledCheckbox = styled(Checkbox)`
	margin-right: 10px;
`;

const Italic = styled.span`
  ${({theme}) => theme.text.smItalic};
`;
