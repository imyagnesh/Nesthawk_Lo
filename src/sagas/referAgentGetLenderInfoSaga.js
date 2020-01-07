import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';

function* referAgentGetLenderInfo({payload: values}) {
  try {
    const res = yield call(Api().get, `/ReferAgent/${values}`);
    yield put(
      action(
        `${types.REFER_AGENT_GET_LENDER_INFO}_${types.SUCCESS}`,
        res.data,
        {
          notification: 'refer agent get lender info successfully',
          type: 'success',
        },
      ),
    );
  } catch (error) {
    yield put(
      action(
        `${types.REFER_AGENT_GET_LENDER_INFO}_${types.FAIL}`,
        'Something Wrong',
        {
          notification: 'refer agent get lender info Fail',
          type: 'failure',
        },
      ),
    );
  }
}

function* referAgentGetLenderInfoRequest() {
  yield takeLatest(
    `${types.USER_INFO}_${types.REQUEST}`,
    referAgentGetLenderInfo,
  );
}

export default function* init() {
  yield all([fork(referAgentGetLenderInfoRequest)]);
}
