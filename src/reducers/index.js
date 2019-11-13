import {combineReducers} from 'redux';
import {Main} from '../navigation';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import loading from './loadingReducer.js';
import error from './errorReducer';

const navReducer = createNavigationReducer(Main);

export default combineReducers({
  nav: navReducer,
  loading,
  error,
});
