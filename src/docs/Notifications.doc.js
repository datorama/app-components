import React from 'react';
import styled, {withTheme} from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Notifications from '../components/base/Notifications';
import {Row, Col} from '../components/index';

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
						<Notifications/>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default withTheme(NotificationsDoc);

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 4px;
	justify-content: center;
	background: ${({theme}) => theme.p50};
`;