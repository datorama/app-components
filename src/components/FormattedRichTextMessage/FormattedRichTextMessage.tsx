import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Hash } from '../../types/common.types';

type Props = {
  id: string;
  values?: Hash<string>;
  customFormattingRules?: Hash<(...chunks: ReactNode[]) => ReactNode>;
};

const richTextFormattingRules = {
  b: function toBold(...chunks: ReactNode[]) {
    return <strong style={{ fontWeight: 600 }}>{chunks}</strong>;
  },
  i: function toItalic(...chunks: ReactNode[]) {
    return <em style={{ fontStyle: 'italic' }}>{chunks}</em>;
  },
};

export const FormattedRichTextMessage = ({
  id,
  values,
  customFormattingRules,
}: Props) => {
  const intl = useIntl();
  const messages: (ReactNode | string)[] | ReactNode = intl.formatMessage(
    { id },
    {
      ...values,
      ...richTextFormattingRules,
      ...customFormattingRules,
    }
  );

  return (
    <>
      {typeof Array.isArray(messages)
        ? (messages as (ReactNode | string)[]).map((message, index) => (
            <React.Fragment key={index}>{message}</React.Fragment>
          ))
        : messages}
    </>
  );
};
