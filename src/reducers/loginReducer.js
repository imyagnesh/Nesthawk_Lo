import * as types from '../constants/actionTypes';
const initialState = {};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case `${types.LOGIN}_${types.SUCCESS}`: {
      return payload;
    }
    case `${types.LOGOUT}`: {
      return initialState;
    }
    default:
      return state;
  }
};
