/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Image, FlatList} from 'react-native';
import Text from '../text/Text';
import {RectButton} from 'react-native-gesture-handler';
import {openLink} from '../../utils';

import styles from './styles';
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

const CustomDrawer = ({navigation: {navigate, closeDrawer}, logout}) => {
  const profileIcon = '../../assets/images/icon.jpeg';
  const renderProfileImage = () => {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Image
            style={[styles.profileImage, {resizeMode: 'contain'}]}
            source={require(profileIcon)}
          />
          <Text
            variant="subtitle2"
            style={{
              lineHeight: 20,
              fontSize: 16,
              color: '#fff',
            }}>
            {'Scott Edwards'}
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
      openLink('https://www.agentfind.com/refer/');
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

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({type: 'LOGOUT'}),
});

export default connect(
  null,
  mapDispatchToProps,
)(CustomDrawer);
