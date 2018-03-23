import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CardCanvas from '../components/CardCanvas';
import Card from '../components/Card';

storiesOf('CardCanvas', module)
  .add('example', () => (
    <CardCanvas width="50" height="50"/>
  ))
  .add('card', () => (
    <Card label="A"/>
  ))
  .add('cards', () => (
    <div>
      <Card label="A"/>
      <Card label="B"/>
      <Card label="C"/>
    </div>
  ))
