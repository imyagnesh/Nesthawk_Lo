import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';

function* dealFiles({payload: values}) {
  try {
    const res = yield call(Api().get, `/LODealFiles/${values}`);
    yield put(
      action(`${types.DEAL_FILES}_${types.SUCCESS}`, res.data, {
        notification: 'deal files successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.DEAL_FILES}_${types.FAIL}`, 'Something Wrong', {
        notification: 'deal files Fail',
        type: 'failure',
      }),
    );
  }
}

function* dealFilesPost({payload: values}) {
  try {
    const res = yield call(Api().post, '/LODealFiles/', values);
    yield put(
      action(`${types.DEAL_FILES}_${types.SUCCESS}`, res.data, {
        notification: 'deal files successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.DEAL_FILES}_${types.FAIL}`, 'Something Wrong', {
        notification: 'deal files Fail',
        type: 'failure',
      }),
    );
  }
}

function* dealFilesRequest() {
  yield takeLatest(`${types.DEAL_FILES}_${types.REQUEST}`, dealFiles);
}

function* dealFilesPostRequest() {
  yield takeLatest(`${types.DEAL_FILES_POST}_${types.REQUEST}`, dealFilesPost);
}

export default function* init() {
  yield all([fork(dealFilesRequest), fork(dealFilesPostRequest)]);
}
