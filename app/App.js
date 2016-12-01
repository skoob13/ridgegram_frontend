import React, { Component } from 'react';
import { View, BackAndroid, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import {
  Home,
  Sign,
  SplashScreen
} from './containers';

import {
  Profile,
  NavToolbar
} from './components';

import { signOut } from './redux/actions/auth';
import { likeUser, flushFeed } from './redux/actions/feed';

const {
  popRoute,
  replaceAt
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class App extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    selectedProfile: React.PropTypes.object,
    logOut: React.PropTypes.func,
    replaceRoutes: React.PropTypes.func,
    like: React.PropTypes.func,
    isFetchingLikes: React.PropTypes.bool,
    isFetchingUser: React.PropTypes.bool,
    tabsNavigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
    flushFeed: React.PropTypes.func,
  }

  // Listening for back button on Android
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      // back button not working with signin or signout but ios doesn't also have back button so ok
      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'sign') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  // Rendering scenes
  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashScreen />;
      case 'home':
        return <Home />;
      case 'profile':
        return <Profile
          {...this.props.selectedProfile}
          selfProfile={false}
          isFetching={this.props.isFetchingUser}
          isFetchingLikes={this.props.isFetchingLikes}
          likeUser={this.props.like}
        />
      default :
        return <Sign />;
    }
  }

  _renderHeader(sceneProps) {
    const {
      tabsNavigation,
      popRoute,
      replaceRoutes,
      logOut,
      flushFeed
    } = this.props;
    const key = tabsNavigation.index === 0;

    if (sceneProps.navigationState.routes[0].key === 'home')
    {
      return (
        <NavToolbar
          popEnabled={key && sceneProps.navigationState.routes.length > 1}
          popRoute={() => popRoute('global')}
          logOutEnabled={!key}
          logOut={() => {
            replaceRoutes();
            logOut();
            flushFeed();
          }}
        />
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderScene={this._renderScene.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: () => dispatch(popRoute('global')),
    logOut: () => dispatch(signOut()),
    replaceRoutes: () => dispatch(replaceAt('home', { key: 'sign', index: 0 }, 'global')),
    like: (id) => dispatch(likeUser(id)),
    flushFeed: () => dispatch(flushFeed())
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  tabsNavigation: state.tabReducer,
  selectedProfile: state.feed.fetchedUser,
  isFetchingUser: state.feed.isFetchingUser,
  isFetchingLikes: state.feed.isFetchingLikes
});

export default connect(mapStateToProps, bindAction)(App);
