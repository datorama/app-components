import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {Row, Col} from '../components/index';
import Carousel from '../components/base/Carousel';

const snippet = `
import { Modal } from 'app-components';

const MyComp = () => (
  <div>
    ...
    <Carousel>
      ...
    </Carousel>
  </div>
);
`;

export default class CarouselDoc extends React.Component {
	// state = {
	// 	modalOpen: false
	// };
	
	render() {
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
						<Carousel/>
					</Col>
				</Row>
			</Base>
		);
	}
}