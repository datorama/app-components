import styled, {css} from 'styled-components';

const gutter = 10; // half the size

export const Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	box-sizing: border-box;
	padding: ${({padding}) => padding ? `${padding - gutter}px` : `${30 - gutter}px`};
`;

export const Row = styled.div`
	display: flex;
	width: 100%;
	align-items: ${({align}) => align || 'flex-start'};
	justify-content: ${({justify}) => justify || 'flex-start'};
	min-height: 40px;
	flex-wrap: wrap;
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
	
	@media only screen and (min-width: 1200px) {
		${({xl}) => xl && css`
			flex: none;
			flex-basis: ${100 / 12 * xl}%;
  		max-width: ${100 / 12 * xl}%;
		`};
	}
	
	@media only screen and (max-width: 1200px) {
		${({lg}) => lg && css`
			flex: none;
			flex-basis: ${100 / 12 * lg}%;
  		max-width: ${100 / 12 * lg}%;
		`};
	}
	
	@media only screen and (max-width: 992px) {
		${({md}) => md && css`
			flex: none;
			flex-basis: ${100 / 12 * md}%;
  		max-width: ${100 / 12 * md}%;
		`};
	}
	
	@media only screen and (max-width: 768px) {
		${({sm}) => sm && css`
			flex: none;
			flex-basis: ${100 / 12 * sm}%;
  		max-width: ${100 / 12 * sm}%;
		`};
	}
	
	@media only screen and (max-width: 576px) {
		${({xs}) => xs && css`
			flex: none;
			flex-basis: ${100 / 12 * xs}%;
  		max-width: ${100 / 12 * xs}%;
		`};
	}
`;