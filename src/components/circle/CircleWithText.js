/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from '../text/Text';
import styles from './styles';
const CircleWithText = ({item}) => {
  return (
    <>
      <View style={[styles.circleContainer]}>
        <Text style={[styles.textStyle, {fontSize: 30, lineHeight: 50}]}>
          {item.value}
        </Text>
        <Text
          style={[
            styles.textStyle,
            {fontSize: 10, lineHeight: 20, flexWrap: 'wrap'},
          ]}>
          {item.title}
        </Text>
      </View>
    </>
  );
};
CircleWithText.propTypes = {
  item: PropTypes.object.isRequired,
};

export default memo(CircleWithText);
