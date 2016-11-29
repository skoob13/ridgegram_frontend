import React, { Component } from 'react';
import { View, BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

/*import {
  Home
} from './containers';*/

import Home from './containers/Home/Home';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class App extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
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
    /*switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      default :
        return <Home />;
    }*/
    return <Home />
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
});

export default connect(mapStateToProps, bindAction)(App);
