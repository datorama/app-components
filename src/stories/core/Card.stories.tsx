import React from 'react';
import {action} from '@storybook/addon-actions';

// Components
import Card from '../../packages/core/Card'

export default {
  title: 'Core/Card',
  component: Card
};

export const normal = () => (
  <Card>
    Default Card
  </Card>
);

export const clickable = () => (
  <Card onClick={action('card clicked')}>
    Clickable Card
  </Card>
);
