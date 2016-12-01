import React, { Component, PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Text } from 'react-native-elements';

const {
  replaceAt,
} = actions;

class SplashScreen extends Component {
  static propTypes = {
    replaceRoute: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isRehydrated: PropTypes.bool,
  }

  static defaultProps = {
    replaceRoute: () => {},
    isAuthenticated: false,
    isRehydrated: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isRehydrated && nextProps.isAuthenticated) {
      this.props.replaceRoute('splashscreen', { key: 'home', index: 0 }, 'global');
    } else if (nextProps.isRehydrated && !nextProps.isAuthenticated) {
      this.props.replaceRoute('splashscreen', { key: 'sign', index: 0 }, 'global');
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text h4 style={{ marginBottom: 8 }}>Rehydrating state...</Text>
        <ActivityIndicator />
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceRoute: (at, to, key) => dispatch(replaceAt(at, to, key)),
  };
}

function mapStateToProps(state) {
  return {
    isRehydrated: state.auth.isRehydrated,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, bindActions)(SplashScreen);
