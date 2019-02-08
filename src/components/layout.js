import styled from 'styled-components';

const gutter = 5;

export const Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	box-sizing: border-box;
	padding: ${({padding}) => padding ? `${padding - gutter}px` : `${20 - gutter}px`};
`;

export const Row = styled.div`
	display: flex;
	width: 100%;
	align-items: ${({align}) => align || 'flex-start'};
	justify-content: ${({justify}) => justify || 'flex-start'};
	min-height: 40px;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: ${({direction}) => direction || 'column'};
	align-items: ${({align}) => align || 'center'};
	justify-content: ${({justify}) => justify || 'flex-start'};
	flex: ${({size}) => size || 1};
	max-width: ${({size}) => `calc(100% / 12 * ${size})` || '100%'};
	padding: ${gutter}px;
	margin-left: ${({offset}) => `calc(100% / 12 * ${offset})` || '2px'};
	min-height: 40px;
	box-sizing: border-box;
`;