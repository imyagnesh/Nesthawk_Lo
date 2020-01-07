import {
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Alert,
} from 'react-native';
import {startOfWeek, eachDayOfInterval, addDays} from 'date-fns';
import axios from 'axios';
import Config from 'react-native-config';

export const {OS} = Platform;

const startWeek = startOfWeek(new Date(), {weekStartsOn: 1});

export const weekDays = eachDayOfInterval({
  start: startWeek,
  end: addDays(startWeek, 13),
});

export const Api = token => {
  const AxiosInstance = axios.create({
    baseURL: Config.BASE_URL,
    timeout: 100000,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  AxiosInstance.interceptors.request.use(
    config => {
      if (token) {
        config.headers.authorization = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return AxiosInstance;
};

export const getToken = state => {
  const {access_token, token_type} = state.auth;
  if (token_type && access_token) {
    return `${token_type} ${access_token}`;
  }
  return '';
};

export const isConnected = state => state.network.isConnected;

export const action = (type, payload, meta) => ({
  type,
  payload,
  meta,
});

export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const hasLocationPermission = async () => {
  if (OS === 'ios' || (OS === 'android' && Platform.Version < 23)) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const openLink = url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Error', 'Url Not supported');
      } else {
        Linking.openURL(url);
      }
    })
    .catch(() => {
      Alert.alert('Error', 'Unable to open Url');
    });
};

export const formatData = value => {
  return value === undefined ||
    value === '' ||
    value === null ||
    value.length === 0
    ? ' '
    : value;
};

export const formatNumberWithComma = value => {
  return value === undefined ||
    value === '' ||
    value === null ||
    value.length === 0
    ? ' '
    : `$${value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export const desiredMoveDateData = [
  {
    text: '1 to 30 Days',
    value: '1 to 30 Days',
  },
  {
    text: '30 to 60 Days',
    value: '30 to 60 Days',
  },
];
export const loanTypeData = [
  {
    text: 'FHA',
    value: 'FHA',
  },
  {
    text: 'CONV',
    value: 'CONV',
  },
  {
    text: 'VA',
    value: 'VA',
  },
];
export const preApprovedData = [
  {
    text: 'Yes',
    value: 'Yes',
  },
  {
    text: 'No',
    value: 'No',
  },
];

export const filterByStageData = [
  {
    text: 'Stages',
    value: '',
  },
  {
    text: 'Actively Looking',
    value: 'Buyer Actively Looking',
  },
  {
    text: 'Closed',
    value: 'Closed',
  },
  {
    text: 'Inactive',
    value: 'Inactive',
  },
  {
    text: 'Offer Out',
    value: 'Buyer Making Offer',
  },
  {
    text: 'Under Contract',
    value: 'UC',
  },
  {
    text: 'On Hold',
    value: 'On Hold',
  },
];
