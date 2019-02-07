import React from 'react';
import styled from 'styled-components';
import {lightTheme} from '../components/index';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';

const snippet = `
// using styled-components apply the styles from theme.
({ theme }) => theme.headline
`;

const Typography = () => {
	const title = 'typography';
	const description = 'App-components text styles.';
	
	return (
		<Base title={title} description={description}>
			<Highlight language="javascript">{snippet}</Highlight>
			
			<Row>
				<Col bold>Sample</Col>
				<Col bold>Usage</Col>
				<Col bold>Spec</Col>
				<Col bold>Name</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
			
			<Row>
				<Col>Headline</Col>
				<Col>Headline</Col>
				<Col><Color color="#37383a"/>weight: 300 size: 34px</Col>
				<Col>theme.headline</Col>
			</Row>
		</Base>
	);
};

export default Typography;

const Row = styled.div`
	width: 100%;
	min-height: 60px;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 20px;
	border-bottom: 1px solid ${lightTheme.p100};
	color: ${lightTheme.p400};
`;

const Col = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	font-weight: ${({bold}) => bold ? '700' : '500'};
	font-size: 12px;
	line-height: 12px;
`;

const Color = styled.div`
	width: 12px;
	height: 12px;
	background: ${({ color }) => color};
	border-radius: 2px;
	margin-right: 5px;
`;