import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col, Datepicker, hexToRgba} from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Datepickewr } from '../components/index';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} />
);
`;

const double = `
import { Datepickewr } from '../components/index';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={2} />
);
`;

const multi = `
import { Datepickewr } from '../components/index';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={3} />
);
`;

const DatePickerDoc = () => {
	const title = 'datepicker';
	const description = 'Default date picker';
	
	return (
		<Base title={title} description={description} name="Datepicker">
			<Row align="stretch">
				<Col>
					<Snippet snippet={snippet}/>
				</Col>
				<Col>
					<Box>
						<StyledDatepicker months={1}/>
					</Box>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Snippet snippet={double}/>
				</Col>
				<Col>
					<Box>
						<StyledDatepicker months={2}/>
					</Box>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Snippet snippet={multi}/>
				</Col>
				<Col>
					<Box>
						<StyledDatepicker months={3}/>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default DatePickerDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({theme}) => hexToRgba(theme.p50, 40)};
`;

const StyledDatepicker = styled(Datepicker)`
  left: auto;
  right: 0;
`;
