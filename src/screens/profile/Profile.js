/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, Image, StyleSheet, FlatList} from 'react-native';
import Text from '../../components/text/Text';
import {ScrollView} from 'react-native-gesture-handler';
import RatingBar from '../../components/ratingBar/RatingBar';
import Phone from '../../assets/icons/phone.svg';
import Mail from '../../assets/icons/mail.svg';
import House from '../../assets/icons/house.svg';
import {openLink} from '../../utils';

const listData = [
  {
    imageUrl: '',
    rating: 3,
    comments: 'this was nice in buy',
  },
  {
    imageUrl: '',
    rating: 4,
    comments: 'this was nice in buy',
  },
];

const Profile = () => {
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
        {!item.imageUrl ? (
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
        ) : (
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
        )}
        <View style={{flex: 1, flexWrap: 'wrap', marginHorizontal: 10}}>
          <RatingBar minRating={Number(item.rating)} />
          <Text
            variant="subtitle2"
            style={{
              fontSize: 18,
              textAlign: 'left',
              lineHeight: 20,
              color: '#333',
              marginTop: 5,
              fontWeight: '400',
            }}>
            {item.comments}
          </Text>
        </View>
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
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{marginHorizontal: 10}}>
        <Image
          style={{
            width: undefined,
            height: 200,
            marginHorizontal: 10,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/icon.jpeg')}
        />
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
          {'Agent find Loan Officer'}
        </Text>
        <Text
          variant="subtitle2"
          style={{
            fontSize: 18,
            textAlign: 'left',
            lineHeight: 20,
            color: '#000',
          }}>
          {'Scott Edwards'}
        </Text>
        <View
          style={{lineHeight: 20, marginVertical: 10, flexDirection: 'row'}}>
          <RatingBar />
          <Text
            variant="subtitle2"
            style={{
              fontSize: 18,
              textAlign: 'left',
              lineHeight: 20,
              marginLeft: 10,
              color: '#333',
              fontWeight: '400',
            }}>
            {'With Agent Find since'}
          </Text>
        </View>
        <View style={{marginVertical: 5}}>{lineSeparator()}</View>
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
            onPress={() => openLink('tel:(913) 213-4544')}>
            {'(913) 213-4544'}
          </Text>
        </View>
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
            onPress={() => openLink('mailto:sedwards@mortgagecompany.com')}>
            {'sedwards@mortgagecompany.com'}
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
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
        {renderFlatList(listData)}
      </View>
    </ScrollView>
  );
};

export default memo(Profile);
