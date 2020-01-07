import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import {NavigationActions, StackActions} from 'react-navigation';
import * as types from '../constants/actionTypes';

function* login({payload: values, meta: actions}) {
  const {resetForm, setErrors, setSubmitting} = actions;
  try {
    const res = yield call(Api().post, '/LO/login', values);
    const {ERROR} = res.data;
    if (ERROR === 'Invalid Credentials') {
      yield call(setErrors, {serverError: 'Invalid Credentials'});
      yield put(
        action(`${types.LOGIN}_${types.FAIL}`, 'Something Wrong', {
          notification: 'login Fail',
          type: 'failure',
        }),
      );
    } else {
      const charRes = yield call(
        Api().post,
        'https://test.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9CxwbdV68qJJgpzlbXx49mAePx_XP5OEUncBDEGJS2A..hKKGGbiWUO8M_uiAQfv6f7N31HQBnq9U19Yo&client_secret=EC5212199F35AADB482940ED864B81F4E7500E0FA0B72F62FCA3E908A46CB74C&username=test@nesthawk.com&password=kumar135',
      );
      yield call(resetForm);
      yield put(NavigationActions.navigate({routeName: 'Dashboard'}));
      yield put(StackActions.popToTop());
      yield put(
        action(`${types.LOGIN}_${types.SUCCESS}`, res.data, {
          notification: 'login successfully',
          type: 'success',
        }),
      );
      yield put(
        action(`${types.LOGIN_CHAT_MSG}_${types.SUCCESS}`, charRes.data, {
          notification: 'login chat successfully',
          type: 'success',
        }),
      );
    }
  } catch (error) {
    yield call(setErrors, {serverError: 'Invalid Credentials'});
    yield put(
      action(`${types.LOGIN}_${types.FAIL}`, 'Something Wrong', {
        notification: 'login Fail',
        type: 'failure',
      }),
    );
    yield put(
      action(`${types.LOGIN_CHAT_MSG}_${types.FAIL}`, 'Something Wrong', {
        notification: 'login chat Fail',
        type: 'failure',
      }),
    );
  } finally {
    yield call(setSubmitting, false);
  }
}

function* loginRequest() {
  yield takeLatest(`${types.LOGIN}_${types.REQUEST}`, login);
}

export default function* init() {
  yield all([fork(loginRequest)]);
}
