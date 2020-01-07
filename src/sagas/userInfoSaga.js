import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';

function* userInfo({payload: values}) {
  try {
    const res = yield call(Api().get, `/UserInfo/${values}`);
    yield put(
      action(`${types.USER_INFO}_${types.SUCCESS}`, res.data, {
        notification: 'user info successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.USER_INFO}_${types.FAIL}`, 'Something Wrong', {
        notification: 'user info Fail',
        type: 'failure',
      }),
    );
  }
}

function* userInfoRequest() {
  yield takeLatest(`${types.USER_INFO}_${types.REQUEST}`, userInfo);
}

export default function* init() {
  yield all([fork(userInfoRequest)]);
}
