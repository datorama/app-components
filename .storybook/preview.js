import {addParameters, addDecorator} from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import StyleDecorator from './StyleDecorator';
import NotificationsDecorator from './NotificationsDecorator';

addParameters({
	viewMode: 'docs',
	docs: {
		container: DocsContainer,
		page: DocsPage,
	}
});

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Global theme for components',
		defaultValue: 'Light',
		toolbar: { icon: 'circlehollow', label: 'Theme', items: ['Light','Dark'] },
	}
};

addDecorator(NotificationsDecorator);
addDecorator(StyleDecorator);

