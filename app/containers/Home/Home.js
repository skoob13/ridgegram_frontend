import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { Tabs, Tab } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles';

import { Profile } from '../../components';
import { Feed } from '../';

const {
  jumpTo
} = navigationActions;

class Home extends Component {
  render() {
    const {
      jumpToTab,
      navigation,
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
          <Profile avatar={{url: 'https://pp.vk.me/c631525/v631525614/2b398/kbI5QohgEgQ.jpg', description: 'Hey', likesCount: 25}} />
        </Tab>
      </Tabs>
    );
  }
}

function bindActions(dispatch) {
	return {
		jumpToTab: (i, key) => dispatch(jumpTo(i, key)),
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.tabReducer
	};
}
export default connect(mapStateToProps, bindActions)(Home);
