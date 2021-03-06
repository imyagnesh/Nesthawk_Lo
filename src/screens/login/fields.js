import React from 'react';
import TextInput from '../../components/textInput/TextInput';

export const passwordRef = React.createRef();

export default [
  {
    name: 'username',
    label: 'User Name',
    placeholder: 'User Name',
    component: TextInput,
    inputStyle: {
      height: 40,
    },
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (passwordRef && passwordRef.current) {
        passwordRef.current.focus();
      }
    },
    value: '',
    validate: value => {
      let errorMessage;
      if (value.length === 0) {
        errorMessage = 'Required';
      }
      return errorMessage;
    },
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    component: TextInput,
    secureTextEntry: true,
    inputStyle: {
      height: 40,
    },
    returnKeyType: 'next',
    innerRef: passwordRef,
    value: '',
    validate: value => {
      let errorMessage;
      if (value.length === 0) {
        errorMessage = 'Required';
      }
      return errorMessage;
    },
  },
];
