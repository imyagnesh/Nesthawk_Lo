/* eslint-disable react-native/no-inline-styles */
import React, {memo, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {action} from '../../utils';
import {format, isValid} from 'date-fns';
import * as types from '../../constants/actionTypes';
import Text from '../../components/text/Text';
import Loading from '../../components/loading/Loading';
import Button from '../../components/button/Button';
import FastImage from 'react-native-fast-image';

const Dashboard = ({
  dashboardSuccess,
  dealsSuccess,
  userInfoSuccess,
  referAgentGetLenderInfoSuccess,
  login,
  dashboard,
  navigation: {navigate},
  loading,
  loginChat,
  loginChatSuccess,
}) => {
  const {ENROLLMENT_ID} = login;
  useEffect(() => {
    loginChatSuccess();
    dashboardSuccess(ENROLLMENT_ID);
    dealsSuccess({contactId: ENROLLMENT_ID, searchDeal: '', filterByStage: ''});
    userInfoSuccess(ENROLLMENT_ID);
    referAgentGetLenderInfoSuccess(ENROLLMENT_ID);
  }, [
    ENROLLMENT_ID,
    dashboardSuccess,
    dealsSuccess,
    referAgentGetLenderInfoSuccess,
    userInfoSuccess,
    loginChatSuccess,
  ]);
  if (loading) {
    return <Loading />;
  }
  const keyExtractor = (item, index) => `${item}-${index}`;
  const renderItem = ({
    item: {DEAL_ID, USER_ID, DATE, DESC, NAME, IMAGE, SHOW_ALERT},
  }) => {
    let descData = DESC !== undefined && DESC !== null && DESC.split('for');
    return (
      <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
        {IMAGE && (
          <TouchableOpacity
            onPress={() => {
              navigate('Profile', {ID: USER_ID});
            }}>
            <FastImage
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginHorizontal: 10,
                resizeMode: 'contain',
              }}
              source={{uri: IMAGE, priority: FastImage.priority.high}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
        <View style={{flex: 1, flexWrap: 'wrap', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                textAlign: 'left',
                lineHeight: 20,
                color: '#337ab7',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}
              onPress={() => navigate('Profile', {ID: USER_ID})}>
              {NAME}
            </Text>
          </View>
          {DATE && isValid(new Date(DATE)) && (
            <Text variant="subtitle2" style={{fontSize: 12, lineHeight: 20}}>
              {format(new Date(DATE), 'd LLL, yyyy')}
            </Text>
          )}
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {descData[0] !== undefined && (
              <Text
                variant="subtitle2"
                style={{fontSize: 14, lineHeight: 20, flexWrap: 'wrap'}}>
                {descData[0]}
                {descData[1] !== undefined && (
                  <Text
                    variant="subtitle2"
                    style={{
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#333',
                      flexWrap: 'wrap',
                    }}>
                    {'for'}
                    <Text
                      variant="subtitle2"
                      style={{
                        fontSize: 14,
                        lineHeight: 20,
                        color: '#22527c',
                        flexWrap: 'wrap',
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}
                      onPress={() => navigate('DealDetail', {ID: DEAL_ID})}>
                      {descData[1]}
                    </Text>
                  </Text>
                )}
              </Text>
            )}
          </View>
        </View>
        {SHOW_ALERT !== undefined &&
          SHOW_ALERT !== null &&
          SHOW_ALERT !== 'false' && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: 5,
                marginLeft: 2,
              }}>
              {renderButton(DEAL_ID)}
            </View>
          )}
      </View>
    );
  };
  const renderFlatList = data => {
    const {DEALS_NOTIFICATION} = dashboard;
    return (
      <FlatList
        data={DEALS_NOTIFICATION}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  const renderButton = DEAL_ID => {
    return (
      <Button
        viewStyle={{
          backgroundColor: '#c9302c',
          borderRadius: 5,
        }}
        title="New Alert"
        textStyle={{color: '#fff', fontSize: 12}}
        onPress={() => navigate('DealDetail', {ID: DEAL_ID})}
      />
    );
  };
  return <View style={{flex: 1}}>{renderFlatList()}</View>;
};

const mapStateToProps = state => ({
  loading:
    !!state.loading[`${types.DASHBOARD}`] ||
    !!state.loading[`${types.DEALS}`] ||
    !!state.loading[`${types.USER_INFO}`] ||
    !!state.loading[`${types.REFER_AGENT_GET_LENDER_INFO}`],
  error:
    state.error[`${types.DASHBOARD}`] ||
    state.error[`${types.DEALS}`] ||
    state.error[`${types.USER_INFO}`] ||
    state.error[`${types.REFER_AGENT_GET_LENDER_INFO}`],
  login: state.login,
  dashboard: state.dashboard,
  loginChat: state.loginChat,
});

const mapDispatchToProps = dispatch => {
  return {
    dashboardSuccess: values =>
      dispatch(action(`${types.DASHBOARD}_${types.REQUEST}`, values)),
    dealsSuccess: values =>
      dispatch(action(`${types.DEALS}_${types.REQUEST}`, values)),
    userInfoSuccess: values =>
      dispatch(action(`${types.USER_INFO}_${types.REQUEST}`, values)),
    referAgentGetLenderInfoSuccess: values =>
      dispatch(
        action(`${types.REFER_AGENT_GET_LENDER_INFO}_${types.REQUEST}`, values),
      ),
    loginChatSuccess: () =>
      dispatch(action(`${types.LOGIN_CHAT_MSG}_${types.REQUEST}`)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Dashboard));
