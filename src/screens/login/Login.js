/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import Form from '../../components/form/Form';
import fields from './fields';
import {action} from '../../utils';
import * as types from '../../constants/actionTypes';

const Login = ({loginSuccess}) => {
  const headerImage = () => {
    return (
      <Image
        resizeMode="contain"
        style={{
          flex: 1,
          height: 200,
          width: undefined,
          backgroundColor: '#0c52fd',
        }}
        source={require('../../assets/images/logo.png')}
      />
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center'}}
      forceInset={{top: 'never', bottom: 'always'}}>
      <View style={{flexDirection: 'row'}}>{headerImage()}</View>
      <Form
        initialValues={{
          username: '',
          password: '',
        }}
        fields={fields}
        onSubmit={loginSuccess}
      />
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: (values, actions) =>
      dispatch(action(`${types.LOGIN}_${types.REQUEST}`, values, actions)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
