import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class ClickOut extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		children: PropTypes.node.isRequired,
		className: PropTypes.string
	};
	
	componentDidMount() {
		window.addEventListener('click', this.handleClick);
	}
	
	componentWillUnmount() {
		window.removeEventListener('click', this.handleClick);
	}
	
	handleClick = e => {
		const {onClick} = this.props;
		
		if (!this.el.contains(e.target)) {
			if (onClick) {
				onClick();
			}
		}
	};
	
	handleRef = el => {
		if (el) {
			this.el = el;
		}
	};
	
	render() {
		const {className} = this.props;
		
		return (
			<Relative ref={this.handleRef} className={className}>
				{this.props.children}
			</Relative>
		);
	}
}

export default ClickOut;

const Relative = styled.div`
  position: relative;
`;