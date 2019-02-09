import React from 'react';
import styled, {css} from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Button from '../components/base/Button';
import Select from '../components/base/Select/Select';
import {Row, Col} from '../components/index';

const snippet = `
// add a css block snippet inside a styled component

// default fade
({ theme }) => theme.animation.fade;

// fade left
({ theme }) => theme.animation.fadeLeft;

// fade right
({ theme }) => theme.animation.fadeRight;

// fade up
({ theme }) => theme.animation.fadeUp;

// fade down
({ theme }) => theme.animation.fadeDown;

// zoom in
({ theme }) => theme.animation.zoomIn;

// zoom out
({ theme }) => theme.animation.zoomOut;
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
		const description = 'animations snippets. @todo: support exit animations.';
		const {selected, animate} = this.state;
		
		return (
			<Base title={title} description={description}>
				<Row>
					<Col>
						<Highlight language="javascript">{snippet}</Highlight>
					</Col>
					<Col>
						<Playground>
							<Header>
								<Select
									options={[
										{value: 'fade', label: 'fade in [fade]'},
										{value: 'fadeOut', label: 'fade out [fadeOut]'},
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
							</Header>
							
							<Card type={selected[0].value} animate={animate}/>
						</Playground>
					</Col>
				</Row>
			</Base>
		);
	}
}

const Playground = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	background: ${({theme}) => theme.p50};
	width: 100%;
	height: 385px;
	border-radius: 4px;
`;

const Header = styled(Row)`
	padding: 10px;
	margin-bottom: 40px;
	margin-left: 20px;
`;

const Card = styled.div`
	width: 60%;
	height: 200px;
	background: ${({theme}) => theme.p0};
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	opacity: 0;
	border: 1px solid ${({theme}) => theme.p100};
	
	${({type}) => type === 'fadeOut' && css`
		opacity: 1;
	`};
	
	${({type, theme, animate}) => animate && theme.animation[type]};
`;

const StyledButton = styled(Button)`
	margin-left: 20px;
`;