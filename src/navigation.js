/* eslint-disable no-unused-vars */
import {createSwitchNavigator} from 'react-navigation';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import Login from './screens/login/Login';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import CustomDrawer from './components/customDrawer/CustomDrawer';
import Profile from './screens/profile/Profile';

import {
  dashboardStackNavigator,
  dealsStackNavigator,
  buyerStagesStackNavigator,
  profileStackNavigator,
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
    Deals: dealsStackNavigator,
    BuyerStages: buyerStagesStackNavigator,
  },
  {
    contentComponent: CustomDrawer,
    drawerPosition: 'right',
    resetOnBlur: true,
  },
);

export const Main = createSwitchNavigator(
  {
    // Login: Login,
    App: AppDrawerNavigator,
  },
  {
    initialRouteName: 'App',
  },
);

export default createReduxContainer(Main);
