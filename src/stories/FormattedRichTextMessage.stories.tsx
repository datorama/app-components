import React, { ReactNode } from 'react';
import { FormattedRichTextMessage } from '../components/FormattedRichTextMessage/FormattedRichTextMessage';
import { IntlProvider } from 'react-intl';

export default {
  title: 'core/FormattedRichTextMessage',
  component: FormattedRichTextMessage,
  argTypes: {
    id: { control: 'none' },
    values: { control: 'object' },
    customFormattingRules: { control: 'none' },
  },
};

const Template = (args) => {
  return (
    <IntlProvider
      locale="en"
      messages={{
        richTextMessageExample:
          'Add <b>{bold}</b>, <i>{italic}</i>, or <b><i>{both}</i></b> to your translation strings. You can also add <customRule>{custom}</customRule> formatting rules.',
      }}
    >
      <FormattedRichTextMessage {...args} />
    </IntlProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  id: 'richTextMessageExample',
  values: {
    bold: 'bold statements',
    italic: 'italic ones',
    both: 'both',
    custom: 'custom',
  },
  customFormattingRules: {
    customRule: function toCustom(...chunks: ReactNode[]) {
      return (
        <span
          style={{
            color: '#3eb75a',
            fontFamily: "'Teko', sans-serif",
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            textShadow: '0 0 35px #38c278',
          }}
        >
          {chunks}
        </span>
      );
    },
  },
};
