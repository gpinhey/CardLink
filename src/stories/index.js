import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import reducer from '../reducers';
import CardCanvas from '../components/CardCanvas';
import CardGrid from '../components/CardGrid';
import Card from '../components/Card';

let store = createStore(reducer);

store.dispatch({type:"ADD_CARD",
            id: "A",
            x: 1,
            y: 2});
store.dispatch({type:"ADD_CARD",
            id: "B",
            x: 2,
            y: 1});

storiesOf('CardCanvas', module)
  .add('example', () => (
    <CardCanvas width="50" height="50"/>
  ))
  .addDecorator(story => (
    <Provider store={store}>
      {story()}
    </Provider>
  ))
  .add('cardgrid', () => (
    <CardGrid />
  ))
  .add('cards', () => (
    <CardCanvas width="100%" height="100%"/>
  ))
  .add('store', () => (
    <div>{JSON.stringify(store.getState())}</div>
  ))
