import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ label, small }) => (
	<Container>{label}</Container>
);

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	label: PropTypes.string
};

Button.defaultProps = {
	label: 'untitled'
};

export default Button;

const Container = styled.div`
  padding: 0 14px;
  //height: 24px;
  height: 34px;
  color: #fff;
  background: ${({theme}) => theme.a400};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
`;