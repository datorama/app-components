import React from 'react';
import styled, {css} from 'styled-components/macro';
import PropTypes from 'prop-types';
import {find} from 'lodash/fp';

// components
import checkIcon from '../../assets/check.svg';
import {Icon, Option, Label} from './Select';
import {optionsType} from './Select.types';

const OPTION_HEIGHT = 35;

const SelectOptions = props => {
	const {
		options,
		values,
		optionRenderer,
		multi,
		handleClick,
		maxItems,
		searchable,
		optionLabelRenderer
	} = props;
	
	const items = options.map(option => {
		const selected = find(op => op.value === option.value, values);
		
		if (optionRenderer) {
			return optionRenderer({option, selected});
		}
		
		return (
			<Option
				className="option"
				key={option.value}
				onClick={handleClick(option)}
				selected={selected && !multi}
				title={option.label}
			>
				{multi && (
					<Checkbox selected={selected}>
						<Icon selected={selected} src={checkIcon}/>
					</Checkbox>
				)}
				{optionLabelRenderer ? (
					optionLabelRenderer(option)
				) : (
					<Label>{option.label}</Label>
				)}
			</Option>
		);
	});
	
	return (
		<Container maxItems={maxItems} marginTop={multi || searchable ? '5px' : 0}>
			<Inner>{items}</Inner>
		</Container>
	);
};

SelectOptions.propTypes = {
	options: optionsType,
	values: optionsType,
	optionRenderer: PropTypes.func,
	multi: PropTypes.bool,
	handleClick: PropTypes.func,
	maxItems: PropTypes.number,
	searchable: PropTypes.bool,
	optionLabelRenderer: PropTypes.func
};

export default SelectOptions;

const Container = styled.div`
  margin-top: ${({marginTop}) => marginTop};
  width: 100%;
  max-height: ${({maxItems}) => `calc(${maxItems} * ${OPTION_HEIGHT}px)`};
  overflow: auto;
`;

const Checkbox = styled.div`
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  border: 1px solid #c1c3c9;
  border-radius: 2px;
  margin-right: 10px;
  position: relative;
  transition: all 300ms;
  overflow: hidden;
  background: ${({background}) => background || 'transparent'};

  ${({selected}) =>
	selected &&
	css`
      border-color: ${({theme}) => theme.a400};
      background: ${({theme}) => theme.a400};
    `};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;
