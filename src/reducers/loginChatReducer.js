import * as types from '../constants/actionTypes';
const initialState = {};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case `${types.LOGIN_CHAT_MSG}_${types.SUCCESS}`: {
      return payload;
    }

    default:
      return state;
  }
};
