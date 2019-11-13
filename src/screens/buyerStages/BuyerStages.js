/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import Button from '../../components/button/Button';
import CircleWithText from '../../components/circle/CircleWithText';

const listData = [
  {
    title: 'Activity Looking',
    value: 0,
  },
  {
    title: 'Offer Out',
    value: 0,
  },
  {
    title: 'Under Contract',
    value: 0,
  },
  {
    title: 'Closed',
    value: 0,
  },
  {
    title: 'On Hold',
    value: 0,
  },
  {
    title: 'InActive',
    value: 0,
  },
];

const BuyerStages = ({navigation: {navigate}}) => {
  const keyExtractor = (item, index) => `${item}-${index}`;
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <CircleWithText item={item} />
      </View>
    );
  };
  const renderFlatList = data => {
    return (
      <FlatList
        data={data}
        numColumns={2}
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
          paddingVertical: 15,
          marginBottom: 10,
          marginHorizontal: 10,
          backgroundColor: '#850e0e',
        }}
        title="Assigned"
        textStyle={{color: '#fff', fontSize: 14, textTransform: 'uppercase'}}
        onPress={() => {
          navigate('Deals');
        }}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      {renderFlatList(listData)}
      {renderButton()}
    </View>
  );
};

export default memo(BuyerStages);
