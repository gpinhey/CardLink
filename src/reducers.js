import { combineReducers } from 'redux';

function cards(state=[], action) {
  switch(action.type) {
    case "ADD_CARD":
      const newCard = [{id: action.id,
                        x: action.x,
                        y: action.y}];
      return state.concat(newCard);
    case "MOVE_CARD":
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