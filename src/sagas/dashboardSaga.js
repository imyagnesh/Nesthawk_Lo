import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';

function* dashboard({payload: values}) {
  try {
    const res = yield call(Api().post, '/LODashboard/', {
      contactId: values,
    });
    yield put(
      action(`${types.DASHBOARD}_${types.SUCCESS}`, res.data, {
        notification: 'dashboard successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.DASHBOARD}_${types.FAIL}`, 'Something Wrong', {
        notification: 'dashboard Fail',
        type: 'failure',
      }),
    );
  }
}

function* dashboardRequest() {
  yield takeLatest(`${types.DASHBOARD}_${types.REQUEST}`, dashboard);
}

export default function* init() {
  yield all([fork(dashboardRequest)]);
}
