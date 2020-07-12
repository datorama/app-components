import {addParameters, addDecorator} from '@storybook/react';
import StyleDecorator from './StyleDecorator';
import {DocsPage, DocsContainer} from '@storybook/addon-docs/blocks';

addParameters({
	viewMode: 'docs',
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
});

addDecorator(StyleDecorator);
