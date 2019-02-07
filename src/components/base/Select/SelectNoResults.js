import React from 'react';
import styled from 'styled-components/macro';

// components
import {Label} from './Select';

const SelectNoResults = () => (
	<Container>
		<Label textAlign="center">
			No results
		</Label>
	</Container>
);

SelectNoResults.propTypes = {};

export default SelectNoResults;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;
