import React from 'react';
import { IllustratedMessage } from '../components/IllustratedMessage/IllustratedMessage';

export default {
  title: 'core/IllustratedMessage',
  component: IllustratedMessage,
  argTypes: {},
};

const Template = () => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, TITLE } = IllustratedMessage.ENUMS;

  return (
    <IllustratedMessage
      type={TYPE.NO_DATA}
      size={SIZE.M}
      mode={MODE.LIGHT}
      illustration={ILLUSTRATION[TYPE.NO_DATA][MODE.LIGHT][SIZE.M]}
      style={{ height: 250 }}
    >
      <IllustratedMessage.Illustration />

      <IllustratedMessage.Title>{TITLE[TYPE.NO_DATA]}</IllustratedMessage.Title>
    </IllustratedMessage>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
