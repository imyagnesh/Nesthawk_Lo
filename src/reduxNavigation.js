/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, BackHandler, Alert} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
// import Toast from './components/toast/Toast';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import App from './navigation';

class ReduxNavigation extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  };

  state = {
    isConnected: true,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    // $FlowFixMe
    const {dispatch, state} = this.props;
    if (
      state.routes &&
      state.routes[state.index] &&
      state.routes[state.index].routes &&
      state.routes[state.index].routes.length === 4
    ) {
      Alert.alert(
        'Exit Application',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  handleConnectivityChange = isConnected => {
    this.setState({isConnected});
  };

  render() {
    const {dispatch, state} = this.props;

    return (
      <ErrorBoundary>
        <View style={{flex: 1}}>
          {/* <Toast /> */}
          <App dispatch={dispatch} state={state} />
        </View>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  state: state.nav,
});

export default connect(mapStateToProps)(ReduxNavigation);
