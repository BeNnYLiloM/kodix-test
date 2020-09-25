import * as actionTypes from './actionTypes';

export function rootReducer(state, action) {
  switch(action.type) {
    case actionTypes.ADD_CAR_LIST:
      return {
        ...state,
        carList: action.data
      };

    default:
      return state;
  }
}