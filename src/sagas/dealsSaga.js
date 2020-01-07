import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import * as types from '../constants/actionTypes';

function* deals({payload: values}) {
  try {
    const res = yield call(Api().post, '/LODeals/', {
      contactId: values.contactId,
      searchDeal: values.searchDeal,
      filterByStage: values.filterByStage,
    });
    yield put(
      action(`${types.DEALS}_${types.SUCCESS}`, res.data, {
        notification: 'deals successfully',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      action(`${types.DEALS}_${types.FAIL}`, 'Something Wrong', {
        notification: 'deals Fail',
        type: 'failure',
      }),
    );
  }
}

function* dealsRequest() {
  yield takeLatest(`${types.DEALS}_${types.REQUEST}`, deals);
}

export default function* init() {
  yield all([fork(dealsRequest)]);
}
