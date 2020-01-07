/* eslint-disable react-native/no-inline-styles */
import React, {memo, useState} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {action} from '../../utils';
import {Formik, Field} from 'formik';
import Select from '../../components/select/Select';
import TextInput from '../../components/textInput/TextInput';
import * as types from '../../constants/actionTypes';
import Text from '../../components/text/Text';
import Button from '../../components/button/Button';
// import Loading from '../../components/loading/Loading';
import Modal from 'react-native-modal';
import {openLink, filterByStageData} from '../../utils';
import commonStyle from '../../commonStyle';
import styles from './styles';

const Deals = ({
  deals,
  dealsSuccess,
  login,
  loading,
  navigation: {navigate},
}) => {
  const {ENROLLMENT_ID} = login;
  const initialValues = {dropdown: '', searchDeal: ''};
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(null);
  //   if (loading) {
  //     return <Loading />;
  //   }
  const renderData = (heading, title, mailAddress, phoneNumber, idDetails) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              textAlign: 'left',
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
              flexWrap: 'wrap',
            }}>
            {heading}
          </Text>
        </View>
        <View style={{flex: 3}}>
          {title && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 20,
                textAlign: 'left',
                lineHeight: 20,
                color: '#0e52fd',
                marginTop: 20,
                fontWeight: '400',
                textDecorationLine: 'underline',
              }}
              onPress={() => {
                if (heading === 'Deals') {
                  navigate('DealDetail', {ID: idDetails});
                } else {
                  navigate('Profile', {ID: idDetails});
                }
              }}>
              {title}
            </Text>
          )}
          {mailAddress && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                textAlign: 'left',
                lineHeight: 20,
                color: '#337ab7',
                fontWeight: '300',
                textDecorationLine: 'underline',
              }}
              onPress={() => openLink(`mailto:${mailAddress}`)}>
              {mailAddress}
            </Text>
          )}
          {phoneNumber && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                textAlign: 'left',
                lineHeight: 20,
                color: '#337ab7',
                marginTop: 5,
                fontWeight: '300',
                textDecorationLine: 'underline',
              }}
              onPress={() => openLink(`tel:${phoneNumber}`)}>
              {phoneNumber}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderTimeFrame = (heading, title) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <View style={{marginLeft: 10}}>
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              textAlign: 'left',
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
              flexWrap: 'wrap',
            }}>
            {heading}
          </Text>
        </View>
        <View style={{flex: 1}}>
          {title && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 16,
                textAlign: 'left',
                lineHeight: 20,
                color: '#333',
                fontWeight: '400',
              }}>
              {title}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderModalData = () => {
    return (
      <>
        <Modal
          isVisible={open}
          animationIn="slideInRight"
          animationOut="slideOutRight">
          <View
            style={{
              height: undefined,
              backgroundColor: 'white',
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <Text
                variant="subtitle2"
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  lineHeight: 20,
                  color: '#333',
                  fontWeight: 'bold',
                  flexWrap: 'wrap',
                  marginVertical: 10,
                }}>
                {'Activity Notes'}
              </Text>
              <Text
                variant="subtitle2"
                style={{
                  fontSize: 16,
                  textAlign: 'left',
                  lineHeight: 20,
                  color: '#333',
                  fontWeight: '200',
                  flexWrap: 'wrap',
                }}>
                {notes}
              </Text>
              <View
                style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 10}}>
                <Button
                  viewStyle={{
                    width: 100,
                    backgroundColor: '#77cbf2',
                    borderColor: '#77cbf2',
                    borderRadius: 4,
                    borderWidth: 1,
                    marginBottom: 10,
                  }}
                  title="OK"
                  textStyle={{color: '#fff', fontSize: 12}}
                  onPress={() => {
                    setOpen(false);
                    setNotes(null);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  };
  const renderNotes = (heading, title, notes) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <View style={{flex: 2, marginHorizontal: 10}}>
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              textAlign: 'left',
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
              flexWrap: 'wrap',
            }}>
            {heading}
          </Text>
        </View>
        <View style={{flex: 1}}>
          {notes && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 14,
                textAlign: 'left',
                lineHeight: 20,
                color: '#808080',
                fontWeight: '300',
                textDecorationLine: 'underline',
              }}
              onPress={() => {
                setOpen(true);
                setNotes(notes);
              }}>
              {title}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderStatus = (heading, buttonText) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          variant="subtitle2"
          style={{
            fontSize: 16,
            textAlign: 'left',
            lineHeight: 20,
            color: '#333',
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
          {heading}
        </Text>
        <View style={{flex: 2}}>
          {buttonText && (
            <Button
              viewStyle={{
                borderColor: '#4cae4c',
                borderRadius: 4,
                borderWidth: 1,
                marginHorizontal: 30,
              }}
              title={buttonText}
              textStyle={{color: '#4cae4c', fontSize: 12}}
              onPress={() =>
                openLink(
                  'https://afnew-agentfind.cs97.force.com/AgentFind/DealDetail?id=0060U00000EuR2aQAF&contid=0033D00000SadnMQAR',
                )
              }
            />
          )}
        </View>
      </View>
    );
  };
  const keyExtractor = (item, index) => `${item}-${index}`;
  const renderItem = ({item}) => {
    const {
      DEAL_ID,
      DEAL_NAME,
      DEAL_EMAIL,
      DEAL_PHONE,
      LO_ID,
      LO_NAME,
      LO_EMAIL,
      LO_PHONE,
      AGENT_ID,
      AGENT_NAME,
      AGENT_EMAIL,
      AGENT_PHONE,
      PURCHASE_TIMEFRAME,
      NOTES,
    } = item;
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        {renderData(
          'Deals',
          DEAL_NAME.toUpperCase(),
          DEAL_EMAIL,
          DEAL_PHONE,
          DEAL_ID,
        )}
        {renderStatus('Status', item.STATUS)}
        {renderData('Loan Officer', LO_NAME, LO_EMAIL, LO_PHONE, LO_ID)}
        {renderData(
          'Assigned Agent',
          AGENT_NAME,
          AGENT_EMAIL,
          AGENT_PHONE,
          AGENT_ID,
        )}
        {renderTimeFrame('TimeFrame \nfor \nPurchase', PURCHASE_TIMEFRAME)}
        {renderNotes('Notes', 'View Notes', NOTES)}
      </View>
    );
  };
  const renderFlatList = () => {
    const {DEALS} = deals;
    return (
      <View>
        {open && renderModalData()}
        <FlatList
          data={DEALS}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const renderSearchFilter = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const valuesData = {
            contactId: ENROLLMENT_ID,
            searchDeal: values.searchDeal.toLowerCase(),
            filterByStage: values.dropdown,
          };
          dealsSuccess(valuesData);
          actions.setSubmitting(false);
        }}>
        {({handleSubmit}) => (
          <View style={{flex: 1, marginVertical: 10}}>
            <View style={{marginHorizontal: 10}}>
              <Field
                name="dropdown"
                component={Select}
                options={filterByStageData}
                placeholder="Stages"
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginHorizontal: 10}}>
                <Field
                  name="searchDeal"
                  component={TextInput}
                  placeholder="Search Deals..."
                  placeholderTextColor="#555"
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginRight: 5,
                  marginLeft: 2,
                }}>
                <Button
                  viewStyle={{
                    backgroundColor: '#c9302c',
                    borderRadius: 5,
                  }}
                  title="Filter"
                  textStyle={{color: '#fff', fontSize: 12}}
                  onPress={handleSubmit}
                />
              </View>
            </View>
            {renderFlatList()}
          </View>
        )}
      </Formik>
    );
  };
  return <View style={{flex: 1}}>{renderSearchFilter()}</View>;
};

const mapStateToProps = state => ({
  loading: !!state.loading[`${types.DEALS}`],
  error: state.error[`${types.DEALS}`],
  deals: state.deals,
  login: state.login,
});

const mapDispatchToProps = dispatch => {
  return {
    dealsSuccess: values =>
      dispatch(action(`${types.DEALS}_${types.REQUEST}`, values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Deals));
