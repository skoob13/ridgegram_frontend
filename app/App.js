import React, { Component } from 'react';
import { View, BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import {
  Home,
  Sign,
  SplashScreen
} from './containers';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class App extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    selectedProfile: React.PropTypes.object,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  // Listening for back button on Android
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  popRoute() {
    this.props.popRoute();
  }

  // Rendering scenes
  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashScreen />;
      case 'home':
        return <Home />;
      case 'profile':
        return <Profile {...this.props.selectedProfile} />
      default :
        return <Sign />;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={'white'}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          //renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: () => dispatch(popRoute()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  selectedProfile: state.feed.selectedProfile,
});

export default connect(mapStateToProps, bindAction)(App);
