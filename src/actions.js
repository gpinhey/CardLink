import { createAction } from 'redux-actions';

export const ActionTypes = {
  addCard : 'ADD_CARD',
  moveCard : 'MOVE_CARD'
};


export const addCard = createAction(ActionTypes.addCard,
  (id, x, y) => ({id, x, y}));
export const moveCard = createAction(ActionTypes.moveCard,
  (id, x, y) => ({id, x, y}));