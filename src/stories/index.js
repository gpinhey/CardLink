import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import reducer from '../reducers';
import CardCanvas from '../components/CardCanvas';
import CardGrid from '../components/CardGrid';
import Card from '../components/Card';
import {AStar, gridToGraph, euclidean} from '../AStar';

let store = createStore(reducer);

store.dispatch({type:"ADD_CARD",
  id: "A",
  x: 0,
  y: 0});
store.dispatch({type:"ADD_CARD",
  id: "B",
  x: 5,
  y: 5});
store.dispatch({type:"ADD_CARD",
  id: "C",
  x: 2,
  y: 2});

const path = AStar(gridToGraph(8,8),
                   {x:0,y:0},
                   {x:7,y:7},
                   euclidean,
                   [{x:4,y:4}]);

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
  .add('Astar', () => (
    <div>{JSON.stringify(path)}</div>
  ))
