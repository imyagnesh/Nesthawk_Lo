/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-native-progress-circle';
import Text from '../text/Text';
import styles from './styles';
const CircleWithText = ({item}) => {
  const BuyersDetails = key => {
    switch (key) {
      case 'OnHold':
        return 'On Hold';
      case 'Inactive':
        return 'Inactive';
      case 'Closed':
        return 'Closed';
      case 'UnderContract':
        return 'Under\n Contract';
      case 'OfferOut':
        return 'Offer Out';
      case 'ActivelyLooking':
        return 'Activity\n Looking';
      default:
        return key;
    }
  };
  return (
    <>
      {item && (
        <ProgressCircle
          percent={item.value}
          radius={80}
          borderWidth={5}
          color="#DC143C"
          shadowColor="#cccccc"
          bgColor="#fff">
          <Text style={[styles.textStyle, {fontSize: 30, lineHeight: 50}]}>
            {item.value}
          </Text>
          <Text
            style={[
              styles.textStyle,
              {fontSize: 10, lineHeight: 20, flexWrap: 'wrap'},
            ]}>
            {BuyersDetails(item.key)}
          </Text>
        </ProgressCircle>
      )}
    </>
  );
};
CircleWithText.propTypes = {
  item: PropTypes.object.isRequired,
};

export default memo(CircleWithText);
