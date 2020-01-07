import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';
import {validateYupSchema} from 'formik';

function* chatMsg({payload: values}) {
  try {
    const res = yield call(Api().get, `/LOChat/${values}`);
    yield put(
      action(`${types.CHAT_MSG}_${types.SUCCESS}`, res.data, {
        notification: 'chat message successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.CHAT_MSG}_${types.FAIL}`, 'Something Wrong', {
        notification: 'chat message Fail',
        type: 'failure',
      }),
    );
  }
}

function* chatMsgPost({payload: values, meta: actions}) {
  const {resetForm, setErrors, setSubmitting} = actions;
  try {
    const data = {
      dealId: values.dealId,
      contactId: values.contactId,
      message: values.message,
    };
    const res = yield call(Api().post, '/LOChat/', data);
    const chatData = {
      CHAT: [
        {
          ...res.data,
          contactId: values.contactId,
          message: values.message,
          contactName: values.contactName,
          contactImage: values.contactImage,
        },
      ],
    };
    yield put(
      action(`${types.CHAT_MSG}_${types.SUCCESS}`, chatData, {
        notification: 'chat message successfully',
        type: 'success',
      }),
    );
    yield call(resetForm);
  } catch (error) {
    yield call(setErrors, {serverError: error.message});
    yield put(
      action(`${types.CHAT_MSG}_${types.FAIL}`, 'Something Wrong', {
        notification: 'chat message Fail',
        type: 'failure',
      }),
    );
  } finally {
    yield call(setSubmitting, false);
  }
}

function* chatMsgPostRequest() {
  yield takeLatest(`${types.CHAT_MSG_POST}_${types.REQUEST}`, chatMsgPost);
}

function* chatMsgRequest() {
  yield takeLatest(`${types.CHAT_MSG}_${types.REQUEST}`, chatMsg);
}

export default function* init() {
  yield all([fork(chatMsgRequest), fork(chatMsgPostRequest)]);
}
