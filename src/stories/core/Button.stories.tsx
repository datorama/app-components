import React from 'react';
import {action} from '@storybook/addon-actions';

// Components
import Button from '../../packages/core/Button'

export default {
  title: 'Core/Button',
  component: Button
};

export const normal = () => <Button onClick={action('clicked')}>Default Button</Button>;

export const secondary = () => <Button onClick={action('clicked')} isSecondary>Secondary Button</Button>;

export const disabled = () => <Button onClick={action('clicked')} isDisabled>Disabled Button</Button>;

export const small = () => <Button onClick={action('clicked')} isSmall>Small Button</Button>;

export const round = () => <Button onClick={action('clicked')} isRound>+</Button>;
