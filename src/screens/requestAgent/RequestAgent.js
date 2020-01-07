/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {action} from '../../utils';
import {formatData} from '../../utils';
import * as types from '../../constants/actionTypes';
import Form from '../../components/form/Form';
import fields from './fields';
import commonStyle from '../../commonStyle';
import styles from './styles';

const RequestAgent = ({referAgentSuccess, referAgentGetLenderInfo, login}) => {
  const {PHONE, EMAIL, LASTNAME, FIRSTNAME, LENDERID} = referAgentGetLenderInfo;
  const initialValues = {
    lenderId: LENDERID,
    clientFirstName: '',
    clientLastName: '',
    clientPhone: '',
    clientEmail: '',
    clientCity: '',
    clientState: '',
    desiredMoveDate: '',
    loanType: '',
    preApproved: '',
    preApprovedAmount: '',
    tellMore: '',
  };
  const renderData = (heading, value) => {
    return (
      <View style={{marginVertical: 5, marginHorizontal: 10}}>
        {heading && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#555',
              fontWeight: 'bold',
            }}>
            {heading}
          </Text>
        )}
        <View style={{flexDirection: 'row', backgroundColor: '#EEEEEE'}}>
          <Text
            style={{
              flex: 1,
              padding: 10,
              borderColor: '#000',
              borderRadius: 4,
              paddingLeft: 5,
              borderWidth: StyleSheet.hairlineWidth,
            }}
            placeholderTextColor="#EEEEEE">
            {value}
          </Text>
        </View>
      </View>
    );
  };
  const renderLine = () => {
    return (
      <View
        style={{
          borderBottomColor: '#d7d7d7',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: 10,
        }}
      />
    );
  };
  const renderHeading = heading => {
    return (
      <View>
        {heading && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#333',
              marginVertical: 5,
              fontWeight: 'bold',
            }}>
            {heading}
          </Text>
        )}
        {renderLine()}
      </View>
    );
  };
  const renderLenderInfo = () => {
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        {renderHeading('Lender Information')}
        {renderData('First Name', formatData(FIRSTNAME))}
        {renderData('Last Name', formatData(LASTNAME))}
        {renderData('Email', formatData(EMAIL))}
        {renderData('Mobile', formatData(PHONE))}
      </View>
    );
  };
  const renderClientInfo = () => {
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
          {flex: 1},
        ]}>
        {renderHeading("Client's Information")}
        <Form
          initialValues={initialValues}
          fields={fields}
          onSubmit={referAgentSuccess}
        />
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
      {renderLenderInfo()}
      {renderClientInfo()}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  loading:
    !!state.loading[`${types.REFER_AGENT}`] ||
    !!state.loading[`${types.REFER_AGENT_GET_LENDER_INFO}`],
  error:
    state.error[`${types.REFER_AGENT}`] ||
    state.error[`${types.REFER_AGENT_GET_LENDER_INFO}`],
  referAgentGetLenderInfo: state.referAgentGetLenderInfo,
  login: state.login,
});

const mapDispatchToProps = dispatch => {
  return {
    referAgentSuccess: (values, actions) =>
      dispatch(
        action(`${types.REFER_AGENT}_${types.REQUEST}`, values, actions),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(RequestAgent));
