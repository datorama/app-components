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
	
	const styles = [
		{id: 'headline', usage: 'Headline', color: 'p600', spec: '34px, 300', key: 'theme.text.headline'},
		{
			id: 'subHeadline',
			usage: 'Sub-headline / LP Headline',
			color: 'p600',
			spec: '18px, 600',
			key: 'theme.text.subHeadline'
		},
		{id: 'p', usage: 'Regular text, lists, labels, user input', color: 'p600', spec: '14px, 400', key: 'theme.text.p'},
		{id: 'pBold', usage: 'Emph', color: 'p600', spec: '14px, 600', key: 'theme.text.pBold'},
		{id: 'pLink', usage: 'Links, buttons text', color: 'p400', spec: '14, 600', key: 'theme.text.pLink'},
		{id: 'pNote', usage: 'Secondary text', color: 'p300', spec: '14, 400', key: 'theme.text.pNote'},
		{id: 'pItalic', usage: 'Alternative text', color: 'p300', spec: '14, 400', key: 'theme.text.pItalic'},
		{id: 'sm', usage: 'Small text, lists, labels, user input', color: 'p600', spec: '12, 400', key: 'theme.text.sm'},
		{id: 'smBold', usage: 'Emph', color: 'p600', spec: '12, 600', key: 'theme.text.smBold'},
		{id: 'smLink', usage: 'Small links, small buttons text', color: 'p400', spec: '12, 600', key: 'theme.text.smLink'},
		{id: 'smNote', usage: 'Secondary small text', color: 'p300', spec: '12, 400', key: 'theme.text.smNote'},
		{id: 'smItalic', usage: 'Alternative small text', color: 'p300', spec: '12, 400', key: 'theme.text.smItalic'},
		{id: 'tooltip', usage: 'Tooltips', color: 'p0', spec: '11, 400', key: 'theme.text.tooltip'}
	];
	
	return (
		<Base title={title} description={description}>
			<Highlight language="javascript">{snippet}</Highlight>
			
			<Row>
				<Col>Sample</Col>
				<Col>Usage</Col>
				<Col>Spec</Col>
				<Col>Key</Col>
			</Row>
			
			{
				styles.map(style => (
					<Row key={style.id}>
						<Col><Demo name={style.id}>Sample</Demo></Col>
						<Col>{style.usage}</Col>
						<Col><Color color={style.color}/>[{style.color}] {style.spec}</Col>
						<Col>{style.key}</Col>
					</Row>
				))
			}
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
	background: ${({theme, color}) => theme[color]};
	border-radius: 2px;
	margin-right: 5px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Demo = styled.div`
	${({theme, name}) => theme.text[name]};
`;