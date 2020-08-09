import {addParameters, addDecorator} from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import StyleDecorator from './StyleDecorator';
import NotificationsDecorator from './NotificationsDecorator';

addParameters({
	viewMode: 'docs',
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
});

addDecorator(NotificationsDecorator);
addDecorator(StyleDecorator);

