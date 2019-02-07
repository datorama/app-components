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
import Base from './Base';

const snippet = `
// inside a component
import { lightTheme } from 'app-components';
// lightTheme.a500 for example.

// using styled-components
({ theme }) => theme.p300
`;

const Color = ({label, color}) => (
	<ColorCard color={color}>
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
			<Highlight language="javascript">{snippet}</Highlight>
			
			<SectionTitle>light theme</SectionTitle>
			<Row>
				{keys(lightPrimary).map(key => <Color key={`light-${key}`} color={lightPrimary[key]} label={key}/>)}
			</Row>
			<Row>
				{keys(lightAccent).map(key => <Color key={`light-${key}`} color={lightAccent[key]} label={key}/>)}
			</Row>
			
			<SectionTitle>dark theme</SectionTitle>
			<Row>
				{keys(darkPrimary).map(key => <Color key={`dark-${key}`} color={darkPrimary[key]} label={key}/>)}
			</Row>
			<Row>
				{keys(darkAccent).map(key => <Color key={`dark-${key}`} color={darkAccent[key]} label={key}/>)}
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

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const ColorCard = styled.div`
  width: calc((100vw - 300px) / 9);
  margin-right: 10px;
  height: 140px;
  background: ${({color}) => color};
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  &:last-child { margin-right: 0; }
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