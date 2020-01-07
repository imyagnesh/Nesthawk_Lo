/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import * as types from '../../constants/actionTypes';
import Button from '../../components/button/Button';
import Loading from '../../components/loading/Loading';
import CircleWithText from '../../components/circle/CircleWithText';

const BuyerStages = ({dashboard, loading, navigation: {navigate}}) => {
  if (loading) {
    return <Loading />;
  }
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
  const toKeyValue = obj => {
    let arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push({key: key, value: obj[key]});
      }
    }
    return arr;
  };
  const renderFlatList = () => {
    const {DEALS_COUNT} = dashboard;
    const arrayKeyValue = toKeyValue(DEALS_COUNT);
    arrayKeyValue.sort((a, b) => {
      return a.key.localeCompare(b.key);
    });
    return (
      <FlatList
        data={arrayKeyValue}
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
      {renderFlatList()}
      {renderButton()}
    </View>
  );
};

const mapStateToProps = state => ({
  loading: !!state.loading[`${types.DASHBOARD}`],
  error: state.error[`${types.DASHBOARD}`],
  dashboard: state.dashboard,
});

export default connect(
  mapStateToProps,
  null,
)(memo(BuyerStages));
