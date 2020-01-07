/* eslint-disable no-unused-vars */
import {createSwitchNavigator} from 'react-navigation';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import Login from './screens/login/Login';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import CustomDrawer from './components/customDrawer/CustomDrawer';
import Profile from './screens/profile/Profile';
import Alerts from './screens/alerts/Alerts';
import DealDetail from './screens/dealDetail/DealDetail';
import ChatMsg from './screens/chatMsg/ChatMsg';

import {
  dashboardStackNavigator,
  dealsStackNavigator,
  buyerStagesStackNavigator,
  requestAgentStackNavigator,
} from './stackNavigator';

const modalNavigationOption = ({navigation}) => {
  let headerRight = navigation.getParam('headerRight', null);
  const {routeName} = navigation.state;
  let title = '';
  if (routeName === 'Assigned') {
    title = 'Assigned';
  }
  if (routeName === 'Profile') {
    title = 'Profile';
  }
  if (routeName === 'RequestAgent') {
    title = 'Request Agent';
  }
  if (routeName === 'Alerts') {
    title = 'Alerts';
  }
  if (routeName === 'DealDetail') {
    title = 'Deal Detail';
  }
  if (routeName === 'ChatMsg') {
    title = 'Chatter';
  }
  return {
    header: undefined,
    title,
    headerRight: headerRight,
    headerStyle: {
      backgroundColor: '#0c52fd',
    },
    headerTintColor: '#fff',
  };
};

const rootStackNavigator = createStackNavigator(
  {
    HomeApp: dashboardStackNavigator,
    Profile: {
      screen: Profile,
      navigationOptions: modalNavigationOption,
    },
    Alerts: {
      screen: Alerts,
      navigationOptions: modalNavigationOption,
    },
    DealDetail: {
      screen: DealDetail,
      navigationOptions: modalNavigationOption,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    mode: 'modal',
  },
);

const rootDealsStackNavigator = createStackNavigator(
  {
    Deals: dealsStackNavigator,
    DealDetail: {
      screen: DealDetail,
      navigationOptions: modalNavigationOption,
    },
    ChatMsg: {
      screen: ChatMsg,
      navigationOptions: modalNavigationOption,
    },
    Profile: {
      screen: Profile,
      navigationOptions: modalNavigationOption,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    mode: 'modal',
  },
);

export const AppDrawerNavigator = createDrawerNavigator(
  {
    DashBoard: rootStackNavigator,
    Deals: rootDealsStackNavigator,
    BuyerStages: buyerStagesStackNavigator,
    RequestAgent: requestAgentStackNavigator,
  },
  {
    contentComponent: CustomDrawer,
    drawerPosition: 'right',
    resetOnBlur: true,
  },
);

export const Main = createSwitchNavigator(
  {
    Login: Login,
    App: AppDrawerNavigator,
  },
  {
    initialRouteName: 'Login',
  },
);

export default createReduxContainer(Main);
