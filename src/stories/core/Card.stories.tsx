import React from 'react';
import {action} from '@storybook/addon-actions';

// Components
import Card, { CardProps } from 'packages/core/Card'

export const Default = (props: CardProps) => (
  <Card {...props}>
    Default Card
  </Card>
);

export const clickable = () => (
  <Card onClick={action('card clicked')}>
    Clickable Card
  </Card>
);

export default {
  title: 'Core/Card',
  component: Card
};
