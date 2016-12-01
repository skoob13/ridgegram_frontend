import React, { Component, PropTypes } from 'react';
import { View, BackAndroid, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import {
  Home,
  Sign,
  SplashScreen,
} from './containers';

import {
  Profile,
  NavToolbar,
} from './components';

import { signOut } from './redux/actions/auth';
import { likeUser, flushFeed as flushHomeFeed } from './redux/actions/feed';

const {
  popRoute: popNavRoute,
  replaceAt: replaceRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class App extends Component {

  static propTypes = {
    popRoute: PropTypes.func,
    selectedProfile: PropTypes.shape({
      avatar: PropTypes.shape({
        description: PropTypes.string,
        likesCount: PropTypes.number,
        url: PropTypes.string,
      }),
      cellphone: PropTypes.string,
      fullname: PropTypes.string,
      gender: PropTypes.string,
      id: PropTypes.string,
    }),
    logOut: PropTypes.func,
    replaceRoutes: PropTypes.func,
    like: PropTypes.func,
    isFetchingLikes: PropTypes.bool,
    isFetchingUser: PropTypes.bool,
    tabsNavigation: PropTypes.shape({
      key: PropTypes.string,
      routes: PropTypes.array,
    }),
    navigation: PropTypes.shape({
      key: PropTypes.string,
      routes: PropTypes.array,
    }),
    flushFeed: PropTypes.func,
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

  /* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }]*/
  _renderScene = (props) => {
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashScreen />;
      case 'home':
        return <Home />;
      case 'profile':
        return (<Profile
          {...this.props.selectedProfile}
          selfProfile={false}
          isFetching={this.props.isFetchingUser}
          isFetchingLikes={this.props.isFetchingLikes}
          likeUser={this.props.like}
        />);
      default :
        return <Sign />;
    }
  }

  _renderHeader = (sceneProps) => {
    const {
      tabsNavigation,
      popRoute,
      replaceRoutes,
      logOut,
      flushFeed,
    } = this.props;
    const key = tabsNavigation.index === 0;

    if (sceneProps.navigationState.routes[0].key === 'home') {
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
      <View style={{ flex: 1 }}>
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: () => dispatch(popNavRoute('global')),
    logOut: () => dispatch(signOut()),
    replaceRoutes: () => dispatch(replaceRoute('home', { key: 'sign', index: 0 }, 'global')),
    like: id => dispatch(likeUser(id)),
    flushFeed: () => dispatch(flushHomeFeed()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  tabsNavigation: state.tabReducer,
  selectedProfile: state.feed.fetchedUser,
  isFetchingUser: state.feed.isFetchingUser,
  isFetchingLikes: state.feed.isFetchingLikes,
});

export default connect(mapStateToProps, bindAction)(App);
