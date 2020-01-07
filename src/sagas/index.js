import {all, fork} from 'redux-saga/effects';
import loginSaga from './loginSaga';
import loginChatSaga from './loginSaga';
import dashboardSaga from './dashboardSaga';
import dealsSaga from './dealsSaga';
import userInfoSaga from './userInfoSaga';
import referAgentGetLenderInfoSaga from './referAgentGetLenderInfoSaga';
import referAgentSaga from './referAgentSaga';
import dealDetail from './dealDetailSaga';
import dealFiles from './dealFilesSaga';
import chatMsg from './chatMsgSaga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(loginChatSaga),
    fork(dashboardSaga),
    fork(dealsSaga),
    fork(userInfoSaga),
    fork(referAgentGetLenderInfoSaga),
    fork(referAgentSaga),
    fork(dealDetail),
    fork(dealFiles),
    fork(chatMsg),
  ]);
}
