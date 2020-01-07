import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';

function* dealDetail({payload: values}) {
  try {
    const res = yield call(Api().get, `/LODealDetail/${values}`);
    yield put(
      action(`${types.DEAL_DETAIL}_${types.SUCCESS}`, res.data, {
        notification: 'deal detail successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.DEAL_DETAIL}_${types.FAIL}`, 'Something Wrong', {
        notification: 'deal detail Fail',
        type: 'failure',
      }),
    );
  }
}

function* dealDetailPost({payload: values}) {
  try {
    const data = {
      DEAL_ID: '0063D000008obAhQAI',
      STATUS: 'Closed',
    };
    const res = yield call(Api().post, '/LODealDetail/', data);
    yield put(
      action(`${types.DEAL_DETAIL_POST}_${types.SUCCESS}`, res.data, {
        notification: 'deal detail post successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.DEAL_DETAIL_POST}_${types.FAIL}`, 'Something Wrong', {
        notification: 'deal detail post Fail',
        type: 'failure',
      }),
    );
  }
}

function* dealDetailRequest() {
  yield takeLatest(`${types.DEAL_DETAIL}_${types.REQUEST}`, dealDetail);
}

function* dealDetailPostRequest() {
  yield takeLatest(
    `${types.DEAL_DETAIL_POST}_${types.REQUEST}`,
    dealDetailPost,
  );
}

export default function* init() {
  yield all([fork(dealDetailRequest), fork(dealDetailPostRequest)]);
}
