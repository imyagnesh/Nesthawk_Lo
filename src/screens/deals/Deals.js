/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {memo, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from '../../components/text/Text';
import Button from '../../components/button/Button';
import Modal from 'react-native-modal';
import {openLink} from '../../utils';
import commonStyle from '../../commonStyle';
import styles from './styles';

const listData = [
  {
    Deals: [
      {
        heading: 'Deals',
        title: 'NICOLE BUYER 113',
        mailID: 'nicolebuyer@agentfind.com',
        phone: '(678) 457-9533',
      },
    ],
    Status: [{heading: 'Status', buttonText: 'Recording'}],
    loanOfficer: [
      {
        heading: 'Loan Officer',
        title: 'Scott Edwards',
        mailID: 'sedwards@mortgagecompany.com',
        phone: '(913) 213-4544',
      },
    ],
    assignedAgent: [
      {
        heading: 'Assigned Agent',
        title: 'Casi Clinton',
        mailID: 'casi@kw.com',
        phone: '(404) 988-0799',
      },
    ],
    timeframeForPurchase: [
      {heading: 'Timeframe for Purchase', title: 'Immediate'},
    ],
    notes: [{heading: 'Notes', title: 'View Notes'}],
  },
  {
    Deals: [
      {
        heading: 'Deals',
        title: 'NICOLE BUYER 114',
        mailID: 'nicolebuyer@agentfind.com',
        phone: '(678) 457-9533',
      },
    ],
    Status: [{heading: 'Status', buttonText: 'Recording'}],
    loanOfficer: [
      {
        heading: 'Loan Officer',
        title: 'Scott Edwards',
        mailID: 'sedwards@mortgagecompany.com',
        phone: '(913) 213-4544',
      },
    ],
    assignedAgent: [
      {
        heading: 'Assigned Agent',
        title: 'Casi Clinton',
        mailID: 'casi@kw.com',
        phone: '(404) 988-0799',
      },
    ],
    timeframeForPurchase: [
      {heading: 'Timeframe for Purchase', title: 'Immediate'},
    ],
    notes: [{heading: 'Notes', title: 'View Notes'}],
  },
];

const Deals = () => {
  const [open, setOpen] = useState(false);
  const renderSeparator = () => {
    return (
      <View
        style={{
          borderBottomColor: '#860f0f',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    );
  };
  const renderData = (index, heading, title, mailAddress, phoneNumber) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, marginHorizontal: 10}}>
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
          <Text
            variant="subtitle2"
            style={{
              fontSize: 20,
              textAlign: 'left',
              lineHeight: 20,
              color: '#0e52fd',
              marginTop: 20,
              fontWeight: '400',
            }}>
            {title}
          </Text>
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
            onPress={() => openLink('mailto:sedwards@mortgagecompany.com')}>
            {mailAddress}
          </Text>
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
            onPress={() => openLink('tel:(913) 213-4544')}>
            {phoneNumber}
          </Text>
        </View>
      </View>
    );
  };
  const renderTimeframe = (index, heading, title) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
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
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              textAlign: 'left',
              lineHeight: 20,
              color: '#333',
              fontWeight: '300',
            }}>
            {title}
          </Text>
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
              height: 250,
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
                {`8/30 Buyer is still actively looking - just placed an offer on a home - waiting to hear back.
9/1 Buyer will be in town next week to begin home search
8/20 Made contact with buyer setting up with agent`}
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
                  }}
                  title="OK"
                  textStyle={{color: '#fff', fontSize: 12}}
                  onPress={() => {
                    setOpen(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  };
  const renderNotes = (index, heading, title) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
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
            }}>
            {title}
          </Text>
        </View>
      </View>
    );
  };
  const renderButton = (index, heading, buttonText) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text
          variant="subtitle2"
          style={{
            fontSize: 16,
            textAlign: 'left',
            lineHeight: 20,
            color: '#333',
            marginHorizontal: 10,
            fontWeight: 'bold',
          }}>
          {heading}
        </Text>
        <View style={{flex: 2}}>
          <Button
            viewStyle={{
              width: 110,
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
        </View>
      </View>
    );
  };
  const keyExtractor = (item, index) => `${item}-${index}`;
  const renderItem = ({item}) => {
    const {
      Deals,
      Status,
      loanOfficer,
      assignedAgent,
      timeframeForPurchase,
      notes,
    } = item;
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        {Deals &&
          Deals.map((item, index) => {
            return renderData(
              index,
              item.heading,
              item.title,
              item.mailID,
              item.phone,
            );
          })}
        {Status &&
          Status.map((item, index) => {
            return renderButton(index, item.heading, item.buttonText);
          })}
        {loanOfficer &&
          loanOfficer.map((item, index) => {
            return renderData(
              index,
              item.heading,
              item.title,
              item.mailID,
              item.phone,
            );
          })}
        {assignedAgent &&
          assignedAgent.map((item, index) => {
            return renderData(
              index,
              item.heading,
              item.title,
              item.mailID,
              item.phone,
            );
          })}
        {timeframeForPurchase &&
          timeframeForPurchase.map((item, index) => {
            return renderTimeframe(index, item.heading, item.title);
          })}
        {notes &&
          notes.map((item, index) => {
            return renderNotes(index, item.heading, item.title);
          })}
      </View>
    );
  };
  const renderFlatList = data => {
    return (
      <View>
        {open && renderModalData()}
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          // ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  return <View style={{flex: 1}}>{renderFlatList(listData)}</View>;
};

export default memo(Deals);
