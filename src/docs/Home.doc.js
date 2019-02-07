import React from 'react';
import styled from 'styled-components';
import {lightTheme} from '../components/index';

// assets
import rightHero from './assets/right.svg';
import leftHero from './assets/left.svg';

const Home = () => {
	return (
		<Container>
			<Hero>
				<HeroTitle>Datorama Apps</HeroTitle>
				<HeroSubtitle>design system</HeroSubtitle>
				<LeftImg src={leftHero}/>
				<RightImg src={rightHero}/>
			</Hero>
		</Container>
	);
};

export default Home;

const Container = styled.div`
	width: 100%;
	box-sizing: border-box;
	flex-direction: column;
	${({theme}) => theme.animation.fade};
`;

const Hero = styled.div`
	position: relative;
	width: 100%;
	height: 500px;
	background: ${lightTheme.a400};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const HeroTitle = styled.div`
	font-size: 40px;
	color: #fff;
	font-weight: 500;
`;

const HeroSubtitle = styled.div`
	font-size: 30px;
	color: #fff;
	font-weight: 300;
`;

const HeroImg = styled.div`
	position: absolute;
	width: 450px;
	height: 420px;
	background: url(${({src}) => src}) no-repeat;
	background-size: contain;
`;

const RightImg = styled(HeroImg)`
	top: 40px;
	right: 40px;
`;

const LeftImg = styled(HeroImg)`
	bottom: 0;
	left: 40px;
`;