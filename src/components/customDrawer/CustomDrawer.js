/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import {View, FlatList} from 'react-native';
import Text from '../text/Text';
import {RectButton} from 'react-native-gesture-handler';
import {action} from '../../utils';
import * as types from '../../constants/actionTypes';
import styles from './styles';
import FastImage from 'react-native-fast-image';
// import axios from 'axios';

const listData = [
  {
    title: 'DashBoard',
    screenToNavigate: 'DashBoard',
  },
  {
    title: 'Deals',
    screenToNavigate: 'Deals',
  },
  {
    title: 'Request Agent',
    screenToNavigate: 'RequestAgent',
  },
  {
    title: 'Buyer Stages',
    screenToNavigate: 'BuyerStages',
  },
  {
    title: 'Profile',
    screenToNavigate: 'Profile',
  },
];

const CustomDrawer = ({login, navigation: {navigate, closeDrawer}, logout}) => {
  const {PROFILE_IMG, NAME, ENROLLMENT_ID} = login;
  // const profileIcon = '../../assets/images/icon.jpeg';
  const renderProfileImage = () => {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <FastImage
            style={[styles.profileImage]}
            source={{uri: PROFILE_IMG, priority: FastImage.priority.high}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            variant="subtitle2"
            style={{
              lineHeight: 20,
              fontSize: 16,
              color: '#fff',
            }}>
            {NAME}
          </Text>
        </View>
      </View>
    );
  };
  const renderSeparator = () => {
    return <View style={styles.lineStyle} />;
  };
  const keyExtractor = (item, index) => `${item}-${index}`;
  const redirectToDetails = items => {
    if (items.screenToNavigate === 'RequestAgent') {
      navigate(items.screenToNavigate, {
        uri: `https://afnew-agentfind.cs97.force.com/AgentFind/AFRequestAgent?id=${ENROLLMENT_ID}`,
      });
    } else {
      navigate(items.screenToNavigate);
    }

    closeDrawer();
  };
  const MenuItem = ({items}) => {
    return (
      <View style={styles.menuContainer}>
        <Text
          variant="subtitle2"
          style={{fontSize: 16, color: '#fff', lineHeight: 20, marginLeft: 10}}>
          {items.title}
        </Text>
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <RectButton onPress={() => redirectToDetails(item)}>
        <MenuItem items={item} />
      </RectButton>
    );
  };
  const redirectToFooter = async () => {
    try {
      logout();
      closeDrawer();
    } catch (error) {
      console.warn(error);
    }
  };
  const renderFooter = () => {
    return (
      <RectButton onPress={() => redirectToFooter()}>
        <View style={styles.footer}>
          <Text
            variant="subtitle2"
            style={[styles.footerTextStyle, {color: '#fff', fontSize: 16}]}>
            {'Logout'}
          </Text>
        </View>
      </RectButton>
    );
  };
  const renderFlatList = data => {
    return (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: '#0c52fd'}]}>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        {renderProfileImage()}
        {renderSeparator()}
        {renderFlatList(listData)}
        {renderSeparator()}
      </SafeAreaView>
      {renderSeparator()}
      {renderFooter()}
    </View>
  );
};

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(action(`${types.LOGOUT}`)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawer);
