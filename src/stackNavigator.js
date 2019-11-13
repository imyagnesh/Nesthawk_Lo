/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

import BuyerStages from './screens/buyerStages/BuyerStages';
import Dashboard from './screens/dashboard/Dashboard';
import Deals from './screens/deals/Deals';
import Profile from './screens/profile/Profile';

import {createStackNavigator} from 'react-navigation-stack';
import {BorderlessButton} from 'react-native-gesture-handler';

import Menu from './assets/icons/menu.svg';

const headerNavigationOption = ({navigation}) => {
  const {routeName} = navigation.state;
  let title = routeName;
  if (routeName === 'BuyerStages') {
    title = 'Buyer Stages';
  }
  return {
    title,
    headerStyle: {
      backgroundColor: '#0c52fd',
    },
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow: 1,
      alignSelf: 'center',
      color: '#fff',
    },
    headerLeft: <View style={{marginHorizontal: 10}} />,
    headerRight: (
      <BorderlessButton
        style={{marginRight: 20}}
        onPress={() => navigation.openDrawer()}>
        <Menu width={30} height={30} style={{color: '#fff'}} />
      </BorderlessButton>
    ),
  };
};

export const dashboardStackNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: headerNavigationOption,
  },
});

export const dealsStackNavigator = createStackNavigator({
  Deals: {
    screen: Deals,
    navigationOptions: headerNavigationOption,
  },
});

export const buyerStagesStackNavigator = createStackNavigator({
  BuyerStages: {
    screen: BuyerStages,
    navigationOptions: headerNavigationOption,
  },
});

export const profileStackNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: headerNavigationOption,
  },
});
