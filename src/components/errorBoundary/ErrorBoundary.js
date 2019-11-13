import React from 'react';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';

class ErrorBoundary extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { hasError: false };
  //   }

  //   static getDerivedStateFromError(error) {
  //     // Update state so the next render will show the fallback UI.
  //     return { hasError: true };
  //   }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    if (__DEV__) {
      return;
    }

    // to prevent multiple alerts shown to your users
    if (this.errorShown) {
      return;
    }

    this.errorShown = true;

    Alert.alert(
      null,
      'An unexpected error has occurred. Please restart to continue.',
      [
        {
          text: 'Restart',
          onPress: RNRestart.Restart,
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return <h1>Something went wrong.</h1>;
    // }

    return this.props.children;
  }
}

export default ErrorBoundary;
