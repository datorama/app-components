import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Button from '../components/base/Button';
import Select from '../components/base/Select/Select';

const snippet = `
// add snippet inside a styled component
({ theme }) => theme.animation.zoomIn;
`;

export default class AnimationsDoc extends React.Component {
	state = {
		selected: [{value: 'zoomIn', label: 'zoom in [zoomIn]'}],
		animate: true
	};
	
	handleSelect = selected => this.setState({selected});
	
	animate = () => {
		this.setState({animate: false}, () => {
			setTimeout(() => {
				this.setState({animate: true});
			}, 500);
		});
	};
	
	render() {
		const title = 'animations';
		const description = 'animations snippets';
		const {selected, animate} = this.state;
		
		return (
			<Base title={title} description={description}>
				<Highlight language="javascript">{snippet}</Highlight>
				
				<Row>
					<Select
						options={[
							{value: 'fadeLeft', label: 'fade left [fadeLeft]'},
							{value: 'fadeRight', label: 'fade right [fadeRight]'},
							{value: 'fadeUp', label: 'fade up [fadeUp]'},
							{value: 'fadeDown', label: 'fade down [fadeDown]'},
							{value: 'zoomIn', label: 'zoom in [zoomIn]'},
							{value: 'zoomOut', label: 'zoom out [zoomOut]'},
						]}
						values={selected}
						onChange={this.handleSelect}
					/>
					<StyledButton onClick={this.animate}>Animate</StyledButton>
				</Row>
				
				<Playground>
					<Card type={selected[0].value} animate={animate}/>
				</Playground>
			</Base>
		);
	}
}

const Playground = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({theme}) => theme.p50};
	width: 100%;
	height: 400px;
`;

const Row = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
`;

const Card = styled.div`
	width: 400px;
	height: 200px;
	background: #fff;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	opacity: 0;
	
	${({type, theme, animate}) => animate && theme.animation[type]};
`;

const StyledButton = styled(Button)`
	margin-left: 20px;
`;