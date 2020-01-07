import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';
import Config from 'react-native-config';

function* loginChat() {
  try {
    const res = yield call(Api().post, Config.LOGIN_CHAT_MSG);
    yield put(
      action(`${types.LOGIN_CHAT_MSG}_${types.SUCCESS}`, res.data, {
        notification: 'login chat successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.LOGIN_CHAT_MSG}_${types.FAIL}`, 'Something Wrong', {
        notification: 'login chat Fail',
        type: 'failure',
      }),
    );
  }
}

function* loginChatRequest() {
  yield takeLatest(`${types.LOGIN_CHAT_MSG}_${types.REQUEST}`, loginChat);
}

export default function* init() {
  yield all([fork(loginChatRequest)]);
}
