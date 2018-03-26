import { combineReducers } from 'redux';

function cardExists(cards, place) {
  if (cards.find(card => (card.x === place.x && card.y === place.y))) {
    return true;
  }
  return false;
}

function cards(state=[], action) {
  switch(action.type) {
    case "ADD_CARD":
      if (cardExists(state, action)) return state;
      const newCard = [{id: action.id,
                        x: action.x,
                        y: action.y}];
      return state.concat(newCard);
    case "MOVE_CARD":
      if (cardExists(state, action)) return state;
      return state.map((card) => {
        if (card.id === action.id) {
          return Object.assign({}, card, {
            x: action.x,
            y: action.y})
        }
        return card;
      });
    default: return state;
  }
}

export default combineReducers({cards});