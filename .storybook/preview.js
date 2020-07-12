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

// addParameters({
// 	options: {
// 		storySort: (a, b) =>
// 			a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true }),
// 	},
// });

addDecorator(StyleDecorator);
