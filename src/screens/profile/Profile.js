/* eslint-disable react-native/no-inline-styles */
import React, {memo, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import Text from '../../components/text/Text';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {action} from '../../utils';
import * as types from '../../constants/actionTypes';
import Loading from '../../components/loading/Loading';
import RatingBar from '../../components/ratingBar/RatingBar';
import Phone from '../../assets/icons/phone.svg';
import Mail from '../../assets/icons/mail.svg';
import House from '../../assets/icons/house.svg';
import {openLink} from '../../utils';

const Profile = ({
  userInfo,
  userInfoSuccess,
  loading,
  navigation: {getParam},
}) => {
  const ID = getParam('ID');
  const {
    USER_FEEDBACK,
    USER_DETAILS: {
      AGENT_LICENSE_NO,
      AGENT_CONVERTION_RATIO,
      AGENT_COVERAGE_AREA,
      EMAIL,
      MOBILE,
      SHOW_AGENT_DETAILS,
      RATING,
      JOINED_SINCE,
      TOTAL_REVIEWS,
      NAME,
      RECORD_TYPE,
    },
    PROFILE_IMG,
  } = userInfo;
  useEffect(() => {
    if (ID !== undefined && ID !== null) {
      userInfoSuccess(ID);
    }
  }, [ID, userInfoSuccess]);
  if (loading) {
    return <Loading />;
  }
  const lineSeparator = () => {
    return (
      <View
        style={{
          borderBottomColor: '#A2A2A2',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    );
  };
  const keyExtractor = (item, index) => `${item}-${index}`;
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: '#f5f5f5',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <House
            width={24}
            height={24}
            style={{
              color: '#cdcdcd',
              alignSelf: 'center',
              alignItems: 'center',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 10,
          }}>
          {item.REVIEW && <RatingBar minRating={Number(item.REVIEW)} />}
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              textAlign: 'left',
              lineHeight: 20,
              marginTop: 5,
              fontWeight: '400',
            }}>
            {item.RATING}
          </Text>
        </View>
      </View>
    );
  };
  const renderFlatList = data => {
    return (
      <FlatList
        data={USER_FEEDBACK}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{marginHorizontal: 10}}>
        {PROFILE_IMG && (
          <FastImage
            style={{
              width: undefined,
              height: 200,
              marginHorizontal: 10,
            }}
            source={{uri: PROFILE_IMG, priority: FastImage.priority.high}}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {RECORD_TYPE && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              lineHeight: 30,
              marginVertical: 10,
              color: '#0e52fd',
            }}>
            {`Agent find ${RECORD_TYPE}`}
          </Text>
        )}
        {NAME && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 18,
              textAlign: 'left',
              lineHeight: 20,
              color: '#000',
            }}>
            {NAME}
          </Text>
        )}
        <View
          style={{
            lineHeight: 20,
            marginVertical: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {RATING && <RatingBar minRating={Number(Math.ceil(RATING))} />}
          {JOINED_SINCE && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 18,
                textAlign: 'left',
                lineHeight: 20,
                marginLeft: 5,
                color: '#000',
              }}>
              {`With Agent Find since ${JOINED_SINCE}`}
            </Text>
          )}
        </View>
        <View style={{marginVertical: 5}}>{lineSeparator()}</View>
        {SHOW_AGENT_DETAILS !== undefined &&
          SHOW_AGENT_DETAILS !== null &&
          SHOW_AGENT_DETAILS === 'Yes' && (
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  flexWrap: 'wrap',
                }}>
                <Text
                  variant="subtitle2"
                  style={{
                    fontSize: 18,
                    textAlign: 'left',
                    lineHeight: 20,
                    color: '#333',
                    fontWeight: '400',
                  }}>
                  {'Agent License #:'}
                </Text>
                {AGENT_LICENSE_NO !== undefined && AGENT_LICENSE_NO !== null && (
                  <Text
                    variant="subtitle2"
                    style={{
                      fontSize: 14,
                      lineHeight: 20,
                      marginLeft: 5,
                      color: '#808080',
                      fontWeight: '400',
                    }}>
                    {`${AGENT_LICENSE_NO}`}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  flexWrap: 'wrap',
                }}>
                <Text
                  variant="subtitle2"
                  style={{
                    fontSize: 18,
                    lineHeight: 20,
                    color: '#333',
                    fontWeight: '400',
                  }}>
                  {'Conversion Ratio:'}
                </Text>
                {AGENT_CONVERTION_RATIO !== undefined &&
                  AGENT_CONVERTION_RATIO !== null && (
                    <Text
                      variant="subtitle2"
                      style={{
                        fontSize: 14,
                        lineHeight: 20,
                        marginLeft: 5,
                        color: '#808080',
                        fontWeight: '400',
                      }}>
                      {`${AGENT_CONVERTION_RATIO} %`}
                    </Text>
                  )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  flexWrap: 'wrap',
                }}>
                {NAME && (
                  <Text
                    variant="subtitle2"
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      lineHeight: 20,
                      color: '#333',
                      fontWeight: '400',
                    }}>
                    {`${NAME}’s Coverage Area:`}
                  </Text>
                )}
                {AGENT_COVERAGE_AREA !== undefined &&
                  AGENT_COVERAGE_AREA !== null && (
                    <Text
                      variant="subtitle2"
                      style={{
                        fontSize: 16,
                        lineHeight: 20,
                        marginVertical: 5,
                        color: '#808080',
                        fontWeight: '400',
                      }}>
                      {`${AGENT_COVERAGE_AREA}`}
                    </Text>
                  )}
              </View>
            </View>
          )}
        {MOBILE && (
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Phone width={24} height={24} style={{color: '#269897'}} />
            <Text
              variant="subtitle2"
              style={{
                fontSize: 18,
                textAlign: 'left',
                lineHeight: 20,
                color: '#269897',
                marginLeft: 5,
              }}
              onPress={() => openLink(`tel:${MOBILE}`)}>
              {MOBILE}
            </Text>
          </View>
        )}
        {EMAIL && (
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Mail width={24} height={24} style={{color: '#269897'}} />
            <Text
              variant="subtitle2"
              style={{
                fontSize: 18,
                textAlign: 'left',
                lineHeight: 20,
                color: '#269897',
                marginLeft: 5,
              }}
              onPress={() => openLink(`mailto:${EMAIL}`)}>
              {EMAIL}
            </Text>
          </View>
        )}
        {USER_FEEDBACK && USER_FEEDBACK.length > 0 && (
          <View style={{marginVertical: 10, flexWrap: 'wrap'}}>
            <Text
              variant="subtitle2"
              style={{
                fontSize: 16,
                textAlign: 'left',
                lineHeight: 20,
                color: '#333',
                marginLeft: 5,
                fontWeight: '300',
              }}>
              {'Most Recent Reviews'}
            </Text>
          </View>
        )}
        {renderFlatList()}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  loading: !!state.loading[`${types.USER_INFO}`],
  error: state.error[`${types.USER_INFO}`],
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => {
  return {
    userInfoSuccess: values =>
      dispatch(action(`${types.USER_INFO}_${types.REQUEST}`, values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Profile));
