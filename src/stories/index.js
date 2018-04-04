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
import { addCard } from '../actions';

let store = createStore(reducer,
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(addCard("A", 0, 0));
store.dispatch(addCard("B", 5, 5));
store.dispatch(addCard("C", 2, 2));

const path = AStar(gridToGraph(8,8),
                   {x:0,y:0},
                   {x:7,y:7},
                   euclidean,
                   [{x:4,y:4}]);

storiesOf('CardCanvas', module)
  .addDecorator(story => (
    <Provider store={store}>
      {story()}
    </Provider>
  ))
  .add('cardgrid', () => (
    <CardGrid />
  ))
  .add('canvas', () => (
    <CardCanvas width="75%" height="100%" onPath={true} fromDir="TR" toDir="L"/>
  ))
  .add('store', () => (
    <div>{JSON.stringify(store.getState())}</div>
  ))
  .add('Astar', () => (
    <div>{JSON.stringify(path)}</div>
  ))
