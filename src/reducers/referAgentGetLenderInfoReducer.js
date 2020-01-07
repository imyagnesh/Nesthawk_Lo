import * as types from '../constants/actionTypes';
const initialState = {};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case `${types.REFER_AGENT_GET_LENDER_INFO}_${types.SUCCESS}`: {
      return payload;
    }

    default:
      return state;
  }
};
