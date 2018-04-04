import { combineReducers } from 'redux';
import { ActionTypes } from './actions';

function cardExists(cards, place) {
  if (cards.find(card => (card.x === place.x && card.y === place.y))) {
    return true;
  }
  return false;
}

function cards(state=[], action) {
  switch(action.type) {
    case ActionTypes.addCard:
      if (cardExists(state, action)) return state;
      const newCard = [{id: action.payload.id,
                        x: action.payload.x,
                        y: action.payload.y}];
      return state.concat(newCard);
    case ActionTypes.moveCard:
      if (cardExists(state, action)) return state;
      return state.map((card) => {
        if (card.id === action.payload.id) {
          return Object.assign({}, card, {
            x: action.payload.x,
            y: action.payload.y})
        }
        return card;
      });
    default: return state;
  }
}

export default combineReducers({cards});