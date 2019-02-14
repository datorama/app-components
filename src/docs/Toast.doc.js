import React from 'react';
import styled, {withTheme} from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {withToast} from '../components/base/Toasts';
import {Row, Col} from '../components/index';
import Button from '../components/base/Button';

const snippet = `
import { ToastsProvider, withToast } from 'app-components';

const App = () => (
  <ToastsProvider>
    ... wrap your entire app
  </ToastsProvider>
);

const NestedComp = ({ addToast }) => ();

export const withToast(NestedComp);

// toast object. types - info (default), success, warning and alert
{ title: '',  subtitle: '', type: 'alert', timeout: 3000 }
`;

const ToastDoc = props => {
	const title = 'toasts';
	const description = 'toasts.';
	
	const notif = {
		title: 'Toast title',
		subtitle: 'Toast subtitle.',
		timeout: 5000
	};
	
	return (
		<Base title={title} description={description}>
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
			</Row>
			<Row>
				<Col>
					<Box>
						<StyledButton onClick={() => props.addToast(notif)}>
							Info toast
						</StyledButton>
						
						<StyledButton onClick={() => props.addToast(notif)}>
							Alert toast
						</StyledButton>
						
						<StyledButton onClick={() => props.addToast(notif)}>
							Success toast
						</StyledButton>
						
						<StyledButton onClick={() => props.addToast(notif)}>
							Warning toast
						</StyledButton>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default withToast(withTheme(ToastDoc));

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 4px;
	justify-content: center;
	background: ${({theme}) => theme.p50};
	box-sizing: border-box;
	padding: 40px;
`;

const StyledButton = styled(Button)`
	margin: 4px;
	min-width: 100px;
`;