import React from 'react';
import styled from 'styled-components';
import Datepicker from '../components/base/Datepicker';

// components
import Base from './Base';

const DatePickerDoc = () => {
	const title = 'datepicker';
	const description = 'Default date picker';
	
	return (
		<Base title={title} description={description} name="Datepicker">
			<SectionTitle>simple date picker</SectionTitle>
			<Datepicker/>
		</Base>
	);
};

export default DatePickerDoc;

const SectionTitle = styled.div`
  font-size: 18px;
  color: ${({theme}) => theme.p600};
  font-weight: 300;
  text-transform: capitalize;
  margin: 40px 0 20px 0;
`;