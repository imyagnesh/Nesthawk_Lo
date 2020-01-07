/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const Alerts = ({navigation: {getParam}}) => {
  const link = getParam('uri');
  const openWebView = () => {
    return (
      <WebView
        source={{uri: link}}
        javaScriptEnabled
        startInLoadingState
        incognito
      />
    );
  };
  return <View style={{flex: 1}}>{openWebView()}</View>;
};

export default Alerts;
