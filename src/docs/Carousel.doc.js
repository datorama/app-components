import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {Row, Col} from '../components/index';
import Carousel from '../components/base/Carousel';

const snippet = `
import { Modal } from 'app-components';

const MyComp = ({ renderer }) => (
  <div>
    ...
    <Carousel
    	total={12}
    	slideRenderer={renderer}
    />
  </div>
);
`;

export default class CarouselDoc extends React.Component {
	state = {loading: true};
	
	componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false});
		}, 2000);
	}
	
	slideRenderer = id => (
		<Slide/>
	);
	
	render() {
		const {loading} = this.state;
		const title = 'carousel';
		const description = 'carousel';
		
		return (
			<Base title={title} description={description} name="Carousel">
				<Row>
					<Col>
						<Highlight language="javascript">{snippet}</Highlight>
					</Col>
				</Row>
				
				<Row>
					<Col>
						<StyledCarousel
							total={5}
							slideRenderer={this.slideRenderer}
							loading={loading}
							minHeight={360}
						/>
					</Col>
				</Row>
			</Base>
		);
	}
}

const Slide = styled.div`
	background: url('https://source.unsplash.com/user/noah2199/800x360') no-repeat;
	background-size: cover;
	overflow: hidden;
	width: calc(100% - 20px);
	border-radius: 4px;
	height: 360px;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
	border: 1px solid ${({theme}) => theme.p200};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledCarousel = styled(Carousel)`
	width: 800px;
`;