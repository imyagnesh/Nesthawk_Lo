import React from 'react';
import TextInput from '../../components/textInput/TextInput';
import Select from '../../components/select/Select';
import {desiredMoveDateData, loanTypeData, preApprovedData} from '../../utils';
export const clientLastNameRef = React.createRef();
export const clientPhoneRef = React.createRef();
export const clientEmailRef = React.createRef();
export const clientCityRef = React.createRef();
export const clientStateRef = React.createRef();
export const desiredMoveDateRef = React.createRef();
export const preApprovedAmountRef = React.createRef();
export const preApprovedRef = React.createRef();
export const tellMoreRef = React.createRef();

export default [
  {
    name: 'clientFirstName',
    label: 'First Name',
    placeholder: 'First Name',
    component: TextInput,
    isRequired: true,
    inputStyle: {
      height: 40,
    },
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (clientLastNameRef && clientLastNameRef.current) {
        clientLastNameRef.current.focus();
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
    name: 'clientLastName',
    label: 'Last Name',
    placeholder: 'Last Name',
    component: TextInput,
    isRequired: true,
    inputStyle: {
      height: 40,
    },
    innerRef: clientLastNameRef,
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (clientPhoneRef && clientPhoneRef.current) {
        clientPhoneRef.current.focus();
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
    name: 'clientPhone',
    label: 'Phone Number',
    placeholder: 'Phone Number',
    component: TextInput,
    isRequired: true,
    inputStyle: {
      height: 40,
    },
    innerRef: clientPhoneRef,
    keyboardType: 'phone-pad',
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (clientEmailRef && clientEmailRef.current) {
        clientEmailRef.current.focus();
      }
    },
    value: '',
    validate: value => {
      let errorMessage;
      if (value.length === 0) {
        errorMessage = 'Required';
      } else if (!/^\d{10}$/i.test(value)) {
        errorMessage = 'Invalid Mobile Number';
      }
      return errorMessage;
    },
  },
  {
    name: 'clientEmail',
    label: 'Email',
    placeholder: 'Email',
    component: TextInput,
    isRequired: true,
    inputStyle: {
      height: 40,
    },
    innerRef: clientEmailRef,
    keyboardType: 'email-address',
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (clientCityRef && clientCityRef.current) {
        clientCityRef.current.focus();
      }
    },
    value: '',
    validate: value => {
      let errorMessage;
      if (!value) {
        errorMessage = 'Required';
      } else if (
        value &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ) {
        errorMessage = 'Invalid email address';
      }
      return errorMessage;
    },
  },
  {
    name: 'clientCity',
    label: 'City',
    placeholder: 'City',
    component: TextInput,
    isRequired: true,
    inputStyle: {
      height: 40,
    },
    innerRef: clientCityRef,
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (clientStateRef && clientStateRef.current) {
        clientStateRef.current.focus();
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
    name: 'clientState',
    label: 'State',
    placeholder: 'State',
    component: TextInput,
    isRequired: true,
    inputStyle: {
      height: 40,
    },
    innerRef: clientStateRef,
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (desiredMoveDateRef && desiredMoveDateRef.current) {
        desiredMoveDateRef.current.focus();
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
    name: 'desiredMoveDate',
    label: 'Desired Move Date',
    placeholder: 'Desired Move Date',
    component: Select,
    isRequired: true,
    value: '',
    options: desiredMoveDateData,
    validate: value => {
      let errorMessage;
      if (!value) {
        errorMessage = 'Required';
      }
      return errorMessage;
    },
  },
  {
    name: 'loanType',
    label: 'Type of Loan',
    placeholder: 'Type of Loan',
    component: Select,
    value: '',
    options: loanTypeData,
    isRequired: true,
    validate: value => {
      let errorMessage;
      if (!value) {
        errorMessage = 'Required';
      }
      return errorMessage;
    },
  },
  {
    name: 'preApproved',
    label: 'Pre-Approved?',
    placeholder: 'Pre-Approved?',
    component: Select,
    value: '',
    options: preApprovedData,
    isRequired: true,
    innerRef: preApprovedRef,
    validate: value => {
      let errorMessage;
      if (!value) {
        errorMessage = 'Required';
      }
      return errorMessage;
    },
  },
  {
    name: 'preApprovedAmount',
    label: 'Pre-approved Amount',
    placeholder: 'Pre-approved Amount',
    component: TextInput,
    isRequired: true,
    inputStyle: {
      height: 40,
    },
    innerRef: preApprovedAmountRef,
    keyboardType: 'numeric',
    returnKeyType: 'next',
    onSubmitEditing: () => {
      if (tellMoreRef && tellMoreRef.current) {
        tellMoreRef.current.focus();
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
    name: 'tellMore',
    label: 'Tell us more',
    placeholder: 'Tell us more',
    component: TextInput,
    multiline: true,
    inputStyle: {
      height: 60,
    },
    innerRef: tellMoreRef,
    returnKeyType: 'next',
    // onSubmitEditing: () => {
    //   if (mobilRef && mobilRef.current) {
    //     mobilRef.current.focus();
    //   }
    // },
    value: '',
  },
];
