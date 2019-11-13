/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, FlatList, Image} from 'react-native';
import {format} from 'date-fns';
import Text from '../../components/text/Text';
import Button from '../../components/button/Button';
import {openLink} from '../../utils';

const listData = [
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'test3 test4',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'ashim test2 sasa',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'joe test',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'ashim test ashim last',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'test3 test4',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'ashim test2 sasa',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'joe test',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'ashim test ashim last',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'test3 test4',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'ashim test2 sasa',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'joe test',
  },
  {
    url: '',
    title: 'Scott Edwards',
    date: new Date(),
    subtitle: 'New Deal Assigned for ',
    link: 'ashim test ashim last',
  },
];

const Dashboard = ({navigation}) => {
  const keyExtractor = (item, index) => `${item}-${index}`;
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 10,
              resizeMode: 'contain',
            }}
            source={require('../../assets/images/icon.jpeg')}
          />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginVertical: 10,
          }}>
          <Text
            variant="subtitle2"
            style={{
              fontSize: 15,
              textAlign: 'left',
              lineHeight: 20,
            }}>
            {item.title}
          </Text>
          <Text variant="subtitle2" style={{fontSize: 13, lineHeight: 20}}>
            {format(new Date(item.date), 'd LLL, yyyy HH:mm')}
          </Text>
          <Text variant="subtitle2" style={{fontSize: 12, lineHeight: 20}}>
            {item.subtitle}
          </Text>
          <Text
            variant="subtitle2"
            style={{
              fontSize: 12,
              lineHeight: 20,
              color: '#22527c',
              textDecorationLine: 'underline',
            }}
            onPress={() =>
              openLink(
                'https://afnew-agentfind.cs97.force.com/AgentFind/DealDetail?id=0060U00000EuR2aQAF&contid=0033D00000SadnMQAR',
              )
            }>
            {item.link}
          </Text>
        </View>
        <View style={{marginRight: 5}}>{renderButton()}</View>
      </View>
    );
  };
  const renderFlatList = data => {
    return (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  const renderButton = () => {
    return (
      <Button
        viewStyle={{
          backgroundColor: '#c9302c',
        }}
        title="New Alert"
        textStyle={{color: '#fff', fontSize: 12}}
        onPress={() =>
          openLink(
            'https://afnew-agentfind.cs97.force.com/AgentFind/DealDetail?id=0060U00000EuR2aQAF&contid=0033D00000SadnMQAR',
          )
        }
      />
    );
  };
  return <View style={{flex: 1}}>{renderFlatList(listData)}</View>;
};

export default memo(Dashboard);
