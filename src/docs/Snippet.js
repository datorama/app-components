import React from 'react';
import Highlight from 'react-highlight-js';

export default class Snippet extends React.PureComponent {
	render() {
		const {snippet} = this.props;
		
		return (
			<Highlight language="javascript">{snippet}</Highlight>
		);
	}
}