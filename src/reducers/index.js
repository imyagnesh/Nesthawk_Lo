import {combineReducers} from 'redux';
import {Main} from '../navigation';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import loading from './loadingReducer.js';
import error from './errorReducer';
import login from './loginReducer';
import loginChat from './loginChatReducer';
import dashboard from './dashboardReducer';
import deals from './dealsReducer';
import userInfo from './userInfoReducer';
import referAgent from './referAgentReducer';
import referAgentGetLenderInfo from './referAgentGetLenderInfoReducer';
import dealDetail from './dealDetailReducer';
import dealFile from './dealFilesReducer';
import chatMessage from './chatMsgReducer';

const navReducer = createNavigationReducer(Main);

export default combineReducers({
  nav: navReducer,
  loading,
  error,
  login,
  loginChat,
  dashboard,
  userInfo,
  referAgent,
  referAgentGetLenderInfo,
  deals,
  dealDetail,
  dealFile,
  chatMessage,
});
