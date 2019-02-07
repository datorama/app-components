import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Select from '../components/base/Select/Select';

const snippet = `
// inside a component
import { Select } from 'app-components';

const MyComp = ({ selected }) => (
  <Fragment>
    <Card
      multi
      searchable
      placeholder="Select colors"
      options={[]}
      values={selected}
    />
  </Fragment>
);
`;

export default class SelectDoc extends React.Component {
	state = {
		values: []
	};
	
	render() {
		const {values} = this.state;
		const title = 'select';
		const description = 'select, multi select';
		
		return (
			<Base title={title} description={description} name="Select">
				<Highlight language="javascript">{snippet}</Highlight>
				
				<Container>
					<Select
						placeholder="select colors"
						multi
						searchable
						values={values}
						options={[
							{value: '1', label: 'orange'},
							{value: '2', label: 'purple'},
							{value: '3', label: 'black'},
							{value: '4', label: 'green'},
							{value: '5', label: 'yellow'},
							{value: '6', label: 'white'},
						]}
						onChange={values => this.setState({values})}
					/>
				</Container>
			</Base>
		);
	}
}

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;