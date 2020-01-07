/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {Formik, Field, FieldArray} from 'formik';
import Text from '../text/Text';
import Button from '../button/Button';
import {ScrollView, BorderlessButton} from 'react-native-gesture-handler';
import RemoveCircle from '../../assets/icons/remove_circle.svg';

const Form = ({
  fields,
  innerRef,
  disable,
  buttonText,
  cancelButton,
  ...props
}) => {
  return (
    <Formik ref={innerRef} {...props}>
      {({handleSubmit, isSubmitting, errors, values}) => {
        return (
          <>
            {errors && errors.serverError && (
              <Text variant="error" style={{textAlign: 'center', margin: 10}}>
                {errors.serverError}
              </Text>
            )}
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1}}
              enabled={Platform.OS === 'ios'}
              keyboardVerticalOffset={64}>
              <ScrollView style={{flex: 1, margin: 10}}>
                {fields.map(item => {
                  if (
                    item.onField &&
                    item.onValue &&
                    !item.onValue.split(',').includes(`${values[item.onField]}`)
                  ) {
                    return;
                  }
                  if (item.fieldArray) {
                    return (
                      <FieldArray
                        key={item.name}
                        name={item.name}
                        render={arrayHelpers => (
                          <>
                            {values[item.name].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View style={[{flex: 1}, item.containerStyle]}>
                                  {item.fieldArray.map(arr => (
                                    <Field
                                      key={arr.name}
                                      {...arr}
                                      name={`${item.name}[${index}].${
                                        arr.name
                                      }`}
                                    />
                                  ))}
                                </View>
                                <BorderlessButton
                                  style={{marginLeft: 10}}
                                  onPress={() => arrayHelpers.remove(index)}>
                                  <RemoveCircle width={24} height={24} />
                                </BorderlessButton>
                              </View>
                            ))}
                            <Button
                              style={{flex: 1}}
                              viewStyle={{
                                paddingVertical: 10,
                                backgroundColor: '#ef4b4b',
                              }}
                              title={item.buttonTitle}
                              textStyle={{color: '#fff'}}
                              onPress={() => arrayHelpers.push(item.addObject)}
                            />
                          </>
                        )}
                      />
                    );
                  }
                  return <Field key={item.name} disable={disable} {...item} />;
                })}
              </ScrollView>
            </KeyboardAvoidingView>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {!!cancelButton && (
                <View
                  style={{
                    flex: 1,
                    marginRight: 5,
                  }}>
                  <Button
                    viewStyle={{
                      paddingVertical: 10,
                      backgroundColor: '#ef4b4b',
                    }}
                    textStyle={{color: '#fff'}}
                    {...cancelButton}
                  />
                </View>
              )}
              <View
                style={{
                  flex: 1,
                }}>
                <Button
                  viewStyle={{
                    paddingVertical: 10,
                    backgroundColor: '#0c52fd',
                  }}
                  title={buttonText || 'Submit'}
                  textStyle={{color: '#fff'}}
                  loading={isSubmitting}
                  disable={isSubmitting || disable}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

export default memo(Form);
