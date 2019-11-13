/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import Form from '../../components/form/Form';
import fields from './fields';
import {Api, action} from '../../utils';
import {AUTH, SUCCESS} from '../../constants/actionTypes';
import navigation from '../../navigation';

const Login = ({authSuccess}) => {
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

  const login = async (values, actions) => {
    try {
      //   authSuccess({
      //     access_token: res.data.sessionId,
      //     instance_url: res.data.serverURL,
      //     token_type: 'Bearer',
      //   });
      navigation.navigate('Dashboard');
      actions.resetForm();
    } catch (error) {
      actions.setStatus({serverError: error.message});
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center'}}
      forceInset={{top: 'never', bottom: 'always'}}>
      <View style={{flex: 1, marginTop: 100}}>
        <View style={{flexDirection: 'row'}}>{headerImage()}</View>
        <Form
          initialValues={{
            username: '',
            password: '',
          }}
          fields={fields}
          onSubmit={login}
        />
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: payload => dispatch(action(`${AUTH}_${SUCCESS}`, payload)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
