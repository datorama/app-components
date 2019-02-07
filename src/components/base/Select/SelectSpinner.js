import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const SelectSpinner = props => {
	return (
		<Container size={props.size} margin={props.margin} color={props.color}>
			<div className="fulfilling-square-spinner">
				<div className="spinner-inner"/>
			</div>
		</Container>
	);
};

export default SelectSpinner;

SelectSpinner.propTypes = {
	size: PropTypes.string,
	margin: PropTypes.string,
	color: PropTypes.string
};

const Container = styled.div`
  margin: ${({margin}) => margin || 0};

  .fulfilling-square-spinner,
  .fulfilling-square-spinner * {
    box-sizing: border-box;
  }

  .fulfilling-square-spinner {
    width: ${({size}) => size || '40px'};
    height: ${({size}) => size || '40px'};
    position: relative;
    border: 1px solid ${({color}) => color || '#fff'};
    border-radius: 50%;
    overflow: hidden;
  }

  .fulfilling-square-spinner .spinner-inner {
    vertical-align: top;
    display: inline-block;
    background-color: ${({color}) => color || '#fff'};
    width: 100%;
    opacity: 1;
    animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;
  }

  @keyframes fulfilling-square-spinner-inner-animation {
    0% {
      height: 0;
    }
    25% {
      height: 0;
    }
    50% {
      height: 100%;
    }
    75% {
      height: 100%;
    }
    100% {
      height: 0;
    }
  }
`;
