import React from 'react';
import styled, {withTheme} from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {withNotifications} from '../components/base/Notifications';
import {Row, Col} from '../components/index';
import Button from '../components/base/Button';

const snippet = `
import { NotificationsProvider, withNotifications } from 'app-components';

const App = () => (
  <NotificationsProvider>
    ... wrap your entire app
  </NotificationsProvider>
);

const NestedComp = ({ addNotification }) => ();

export const withNotifications(NestedComp);
`;

const NotificationsDoc = props => {
	const title = 'notifications';
	const description = 'notifs.';
	
	return (
		<Base title={title} description={description}>
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
				<Col>
					<Box>
						<Button onClick={() => props.addNotification({title: 'default', subtitle: 'datorama apps notification'})}>Add
							notification</Button>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default withNotifications(withTheme(NotificationsDoc));

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 4px;
	justify-content: center;
	background: ${({theme}) => theme.p50};
`;