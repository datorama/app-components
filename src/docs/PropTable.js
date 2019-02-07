import React from 'react';
import styled from 'styled-components';
import {lightTheme} from '../components';
import meta from '../meta';
import {find, keys, getOr} from 'lodash/fp';

const PropTable = ({compKey}) => {
	const data = find(({displayName}) => displayName === compKey, meta);
	const {props} = data;

	return (
		<Container>
			<Row>
				<Col bold>Property</Col>
				<Col bold>Default</Col>
				<Col bold>Type</Col>
				<Col bold>Required</Col>
			</Row>
			{
				keys(props).map(key => (
					<Row key={key}>
						<Col>{key}</Col>
						<Col>{getOr('-', 'defaultValue.value', props[key])}</Col>
						<Col>{props[key].type.name}</Col>
						<Col>{props[key].required.toString()}</Col>
					</Row>
				))
			}
		</Container>
	);
};

export default PropTable;

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Row = styled.div`
	width: 100%;
	min-height: 30px;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 20px;
	border-bottom: 1px solid ${lightTheme.p100};
	color: ${lightTheme.p400};
	font-size: 12px;
	font-weight: 600;
`;

const Col = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	font-weight: ${({ bold }) => bold ? '700' : '500'};
`;