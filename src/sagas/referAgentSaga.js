import {call, put, all, fork, takeLatest} from 'redux-saga/effects';
import {Api, action} from '../utils';
import {NavigationActions, StackActions} from 'react-navigation';
import * as types from '../constants/actionTypes';

function* referAgent({payload: values, meta: actions}) {
  const {resetForm, setErrors, setSubmitting} = actions;
  try {
    const data = {
      lenderId: values.lenderId,
      clientFirstName: values.clientFirstName,
      clientLastName: values.clientLastName,
      clientPhone: values.clientPhone,
      clientEmail: values.clientEmail,
      clientCity: values.clientCity,
      clientState: values.clientState,
      desiredMoveDate: values.desiredMoveDate.trim(),
      loanType: values.loanType.trim(),
      preApproved: values.preApproved.trim(),
      preApprovedAmount: values.preApprovedAmount,
      tellMore: values.tellMore,
    };
    const res = yield call(Api().post, '/ReferAgent/', data);
    yield put(
      action(`${types.REFER_AGENT}_${types.SUCCESS}`, res.data, {
        notification: 'refer agent successfully',
        type: 'success',
      }),
    );
    yield call(resetForm);
    yield put(NavigationActions.navigate({routeName: 'Dashboard'}));
    yield put(StackActions.popToTop());
  } catch (error) {
    yield call(setErrors, {serverError: error.message});
    yield put(
      action(`${types.REFER_AGENT}_${types.FAIL}`, 'Something Wrong', {
        notification: 'refer agent Fail',
        type: 'failure',
      }),
    );
  } finally {
    yield call(setSubmitting, false);
  }
}

function* referAgentRequest() {
  yield takeLatest(`${types.REFER_AGENT}_${types.REQUEST}`, referAgent);
}

export default function* init() {
  yield all([fork(referAgentRequest)]);
}
