import React from 'react';
import styled from 'styled-components';
import {keys} from 'lodash/fp';
import Highlight from 'react-highlight-js';

// components
import {
	lightPrimary,
	lightAccent,
	darkPrimary,
	darkAccent
} from '../components/colors';
import {Row, Col} from '../components/index';
import Base from './Base';

const snippet = `
// inside a component
import { lightTheme } from 'app-components';
// lightTheme.a500 for example.

// using styled-components
({ theme }) => theme.p300
`;

const Color = ({label, color}) => (
	<ColorCard>
		<ColorPreview color={color}/>
		
		<ColorCardInfo>
			<Info>{label}</Info>
			<Info>{color}</Info>
		</ColorCardInfo>
	</ColorCard>
);

const Colors = () => {
	return (
		<Base
			title="colors"
			description="Convey meaning through color. The App-components color system can be used to create a color theme that reflects your brand or style."
		>
			<Row>
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
			</Row>
			
			<Row>
				<Col>
					<SectionTitle>light theme</SectionTitle>
				</Col>
			</Row>
			
			<Row>
				<Col direction="row" justify="space-between">
					{keys(lightPrimary).map(key => <Color key={`light-${key}`} color={lightPrimary[key]} label={key}/>)}
				</Col>
			</Row>
			
			<Row>
				<Col direction="row" justify="space-between">
					{keys(lightAccent).map(key => <Color key={`light-${key}`} color={lightAccent[key]} label={key}/>)}
				</Col>
			</Row>
			
			<Row>
				<Col>
					<SectionTitle>dark theme</SectionTitle>
				</Col>
			</Row>
			
			<Row>
				<Col direction="row" justify="space-between">
					{keys(darkPrimary).reverse().map(key => <Color key={`dark-${key}`} color={darkPrimary[key]} label={key}/>)}
				</Col>
			</Row>
			
			<Row>
				<Col direction="row" justify="space-between">
					{keys(darkAccent).reverse().map(key => <Color key={`dark-${key}`} color={darkAccent[key]} label={key}/>)}
				</Col>
			</Row>
		</Base>
	);
};

export default Colors;

const SectionTitle = styled.div`
  font-size: 18px;
  color: ${({theme}) => theme.p600};
  font-weight: 300;
  text-transform: capitalize;
  margin: 40px 0 20px 0;
`;

const ColorCard = styled.div`
  width: calc(100% / 9);
  max-width: 120px;
  margin-right: 10px;
  height: 140px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 300ms;
  
  &:hover {
  	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:last-child { margin-right: 0; }
`;

const ColorPreview = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 90px;
	background: ${({color}) => color};
`;

const ColorCardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: ${({theme}) => theme.p0};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
`;

const Info = styled.div`
  font-size: 12px;
  margin: 2px 0;
  text-transform: uppercase;
  color: ${({theme}) => theme.p600};
`;