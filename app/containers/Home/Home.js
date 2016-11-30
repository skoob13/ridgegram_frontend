import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { Tabs, Tab } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles';
import { signOut } from '../../redux/actions/auth';

import { Profile } from '../../components';
import { Feed } from '../';

const {
  jumpTo,
  replaceAt
} = navigationActions;

class Home extends Component {
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
    user: React.PropTypes.object,
    jumpToTab: React.PropTypes.func,
    logOut: React.PropTypes.func,
    replaceRoutes: React.PropTypes.func,
  }

  static defaultProps = {
    navigation: {},
    user: {},
    jumpToTab: () => {},
    logOut: () => {},
    replaceRoutes: () => {},
  }

  componentWillUnmount() {
    this.props.jumpToTab(0, 'HomeTabs');
  }

  logOut() {
    this.props.replaceRoutes();
    this.props.logOut();
  }

  render() {
    const {
      jumpToTab,
      navigation,
      user
    } = this.props;

    const selectedTab = navigation.index === 0 ? 'feed' : 'profile';

    return (
      <Tabs>
        <Tab
          selected={selectedTab === 'feed'}
          title={'Feed'}
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.titleStyle}
          renderIcon={() => <Icon name='md-list' size={26} />}
          renderSelectedIcon={() => <Icon color="#F66E96" name='md-list' size={26} />}
          onPress={ () => jumpToTab(0, navigation.key) }>
          <Feed />
        </Tab>
        <Tab
          selected={selectedTab === 'profile'}
          title={'Profile'}
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.titleStyle}
          renderIcon={() => <Icon name='md-person' size={26} />}
          renderSelectedIcon={() => <Icon color="#F66E96" name='md-person' size={26} />}
          onPress={ () => jumpToTab(1, navigation.key) }>
          <Profile {...user} logoutPressed={this.logOut.bind(this)} />
        </Tab>
      </Tabs>
    );
  }
}

function bindActions(dispatch) {
	return {
		jumpToTab: (i, key) => dispatch(jumpTo(i, key)),
    logOut: () => dispatch(signOut()),
    replaceRoutes: () => dispatch(replaceAt('home', { key: 'sign', index: 0 }, 'global')),
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.tabReducer,
    user: state.auth.user,
	};
}

export default connect(mapStateToProps, bindActions)(Home);
