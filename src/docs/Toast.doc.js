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
`;

const ToastDoc = props => {
	const title = 'toasts';
	const description = 'toasts.';
	
	const notif = {
		title: 'default',
		subtitle: 'datorama apps toast',
		timeout: 2000
	};
	
	return (
		<Base title={title} description={description}>
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
				<Col>
					<Box>
						<Button onClick={() => props.addToast(notif)}>
							add default toast
						</Button>
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
`;