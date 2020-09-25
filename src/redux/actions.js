import * as actionTypes from './actionTypes';

export function addCarList(data) {
  return {
    type: actionTypes.ADD_CAR_LIST,
    data
  }
}