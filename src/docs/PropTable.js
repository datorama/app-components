import React from 'react';
import styled from 'styled-components';
import meta from '../meta';
import {find, keys, getOr} from 'lodash/fp';

const PropTable = ({compKey}) => {
	const data = find(({displayName}) => displayName === compKey, meta);
	const {props} = data;
	
	return (
		<Container>
			<Row>
				<Col bold>Property</Col>
				<Col bold>Default value</Col>
				<Col bold>Type</Col>
				<Col bold>Required</Col>
			</Row>
			{
				keys(props).map(key => (
					<Row key={key}>
						<Col>{key}</Col>
						<Col>{getOr('-', 'defaultValue.value', props[key])}</Col>
						<Col><Tag>{props[key].type.name}</Tag></Col>
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
	border-bottom: 1px solid ${({theme}) => theme.p100};
	color: ${({theme}) => theme.p400};
	font-size: 12px;
	font-weight: 600;
`;

const Col = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	font-weight: ${({bold}) => bold ? '700' : '500'};
`;

const Tag = styled.div`
	background: ${({theme}) => theme.p50};
	padding: 2px 6px;
	border-radius: 4px;
`;