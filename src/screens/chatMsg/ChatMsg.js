/* eslint-disable react-native/no-inline-styles */
import React, {memo, useEffect, useState} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import cometdLib from 'cometd';
import {Formik, Field} from 'formik';
import {connect} from 'react-redux';
import {action, OS} from '../../utils';
import TextInput from '../../components/textInput/TextInput';
import Button from '../../components/button/Button';
import * as types from '../../constants/actionTypes';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../../components/text/Text';
import commonStyle from '../../commonStyle';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const ChatMsg = ({
  login,
  loginChat,
  chatMessage,
  chatMsgSuccess,
  chatMsgPostSuccess,
  navigation: {getParam},
}) => {
  const [eventInfo, setEventInfo] = useState({
    componentsToUpdate: [],
    data: {},
  });
  const dealID = getParam('ID');
  const {CHAT} = chatMessage;
  const {ENROLLMENT_ID, NAME, PROFILE_IMG} = login;

  useEffect(() => {
    if (dealID) {
      // chatMsgSuccess('0060U00000FyNyc');
      chatMsgSuccess(dealID);
    }

    // const cometd = new cometdLib.CometD();
    // const listOfComponentsToUpdate = ['DealDetails'];
    // const {access_token, token_type, instance_url} = loginChat;
    // const url = `${instance_url}/cometd/40.0/`;
    // const authorization = `${token_type} ${access_token}`;
    // const configure = {
    //   url: url,
    //   requestHeaders: {Authorization: authorization},
    //   logLevel: 'debug',
    //   appendMessageTypeToURL: false,
    // };
    // cometd.configure(configure);
    // cometd.websocketEnabled = false;
    // let subscription = null;
    // /* Try for a handshake to connect to Salesforce through cometD library */
    // cometd.handshake(handshakeReply => {
    //   // console.warn('handshakeReply=>>', handshakeReply);
    //   if (handshakeReply.successful) {
    //     // console.warn('handshakeReply.data=>> ', handshakeReply);
    //     subscription = cometd.subscribe(
    //       handshakeReply.channel,
    //       platformEvent => {
    //         /* Platform event received */
    //         // console.warn('platformEvent=>>>', platformEvent);
    //         // console.warn('platformEvent 111=>>>', platformEvent);
    //         if (platformEvent && platformEvent.data.payload) {
    //           /* set the state to update the React Context */
    //           setEventInfo({
    //             componentsToUpdate: listOfComponentsToUpdate,
    //             data: {},
    //           });
    //         }
    //       },
    //     );
    //   } else {
    //     // console.warn('Failed to connected to CometD.');
    //   }
    // });
    // return () => {
    //   if (subscription !== null) {
    //     cometd.unsubscribe(subscription);
    //   }
    // };
  }, [chatMsgSuccess, dealID, loginChat]);
  const renderChat = () => {
    return (
      <Formik
        initialValues={{
          dealId: dealID,
          contactId: ENROLLMENT_ID,
          contactName: NAME,
          contactImage: PROFILE_IMG,
          message: '',
        }}
        onSubmit={chatMsgPostSuccess}>
        {({handleSubmit}) => (
          <View style={{flex: 1, marginHorizontal: 10}}>
            <View style={{flexDirection: 'row', height: 40}}>
              <View style={{flex: 1}}>
                <Field
                  name="message"
                  component={TextInput}
                  placeholder="Type a message"
                  placeholderTextColor="#555"
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginLeft: 5,
                }}>
                <Button
                  viewStyle={{
                    backgroundColor: '#0e52fd',
                    borderRadius: 5,
                  }}
                  title="Send"
                  textStyle={{color: '#fff', fontSize: 12}}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    );
  };
  const renderDetailsLeft = (index, contactImage, contactName, message) => {
    return (
      <View
        key={index}
        style={[
          styles.card,
          commonStyle.hMar10,
          {
            flexDirection: 'row',
            marginVertical: 5,
            padding: 5,
            flexWrap: 'wrap',
          },
        ]}>
        <View style={{flex: 1}}>
          {contactImage && (
            <FastImage
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginHorizontal: 5,
                resizeMode: 'contain',
              }}
              source={{
                uri: contactImage,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        <View style={{flex: 4}}>
          {contactName && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                lineHeight: 20,
                marginVertical: 5,
                flexWrap: 'wrap',
                color: '#333',
              }}>
              {contactName}
            </Text>
          )}
          {message && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                lineHeight: 20,
                flexWrap: 'wrap',
                color: '#333',
              }}>
              {message}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderDetailsRight = (index, contactImage, contactName, message) => {
    return (
      <View
        key={index}
        style={[
          styles.card,
          commonStyle.hMar10,
          {
            flexDirection: 'row',
            marginVertical: 5,
            padding: 5,
            flexWrap: 'wrap',
          },
        ]}>
        <View style={{flex: 4, alignItems: 'flex-end', marginRight: 10}}>
          {contactName && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                lineHeight: 20,
                marginVertical: 5,
                flexWrap: 'wrap',
                color: '#333',
              }}>
              {contactName}
            </Text>
          )}
          {message && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                lineHeight: 20,
                flexWrap: 'wrap',
                color: '#333',
              }}>
              {message}
            </Text>
          )}
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {contactImage && (
            <FastImage
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginHorizontal: 5,
                resizeMode: 'contain',
              }}
              source={{
                uri: contactImage,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
      </View>
    );
  };
  console.warn('CHAT=>>>', CHAT);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        enabled={OS === 'ios'}
        keyboardVerticalOffset={64}>
        <ScrollView
          style={{
            flexGrow: 1,
          }}>
          {CHAT && CHAT.length === 0 ? (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                lineHeight: 20,
                textAlign: 'center',
                marginTop: 20,
                color: '#333',
              }}>
              {'There are no activities available.'}
            </Text>
          ) : (
            CHAT &&
            CHAT.map((item, index) => {
              return (
                <>
                  {item.contactId !== ENROLLMENT_ID
                    ? renderDetailsLeft(
                        `${item.contactId}-${index}`,
                        item.contactImage,
                        item.contactName,
                        item.message,
                      )
                    : renderDetailsRight(
                        `${item.contactId}-${index}`,
                        item.contactImage,
                        item.contactName,
                        item.message,
                      )}
                </>
              );
            })
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          position: 'absolute',
          bottom: OS === 'ios' ? 35 : 10,
        }}>
        {renderChat()}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  loading: !!state.loading[`${types.CHAT_MSG}`],
  error: state.error[`${types.CHAT_MSG}`],
  loginChat: state.loginChat,
  chatMessage: state.chatMessage,
  login: state.login,
});

const mapDispatchToProps = dispatch => {
  return {
    chatMsgSuccess: values =>
      dispatch(action(`${types.CHAT_MSG}_${types.REQUEST}`, values)),
    chatMsgPostSuccess: (values, actions) =>
      dispatch(
        action(`${types.CHAT_MSG_POST}_${types.REQUEST}`, values, actions),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(ChatMsg));
