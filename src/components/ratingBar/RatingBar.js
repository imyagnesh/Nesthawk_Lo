/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Grade from '../../assets/icons/grade.svg';

const RatingBar = ({minRating, maxRating}) => {
  const ratingBarArray = [];
  for (let i = 1; i <= Number(maxRating); i += 1) {
    ratingBarArray.push(
      <TouchableWithoutFeedback key={i}>
        {i <= Number(minRating) ? (
          <Grade width={20} height={20} style={{color: '#fe7f0a'}} />
        ) : (
          <Grade width={20} height={20} style={{color: '#b8b8b8'}} />
        )}
      </TouchableWithoutFeedback>,
    );
  }
  return <View style={{flexDirection: 'row'}}>{ratingBarArray}</View>;
};

RatingBar.propTypes = {
  minRating: PropTypes.number,
  maxRating: PropTypes.number,
};
RatingBar.defaultProps = {
  minRating: Number('3'),
  maxRating: Number('5'),
};
export default RatingBar;
