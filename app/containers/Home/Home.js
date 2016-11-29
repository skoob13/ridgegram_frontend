import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { Tabs, Tab, Icon } from 'react-native-elements'

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
          renderIcon={() => <Icon name='whatshot' size={26} />}
          renderSelectedIcon={() => <Icon name='whatshot' size={26} />}
          onPress={ () => jumpToTab(0, navigation.key) }>
          <View style={{flex: 1, backgroundColor: 'green'}} />
        </Tab>
        <Tab
          selected={selectedTab === 'profile'}
          title={'Profile'}
          renderIcon={() => <Icon name='whatshot' size={26} />}
          renderSelectedIcon={() => <Icon name='whatshot' size={26} />}
          onPress={ () => jumpToTab(1, navigation.key) }>
          <View style={{flex: 1, backgroundColor: 'red'}} />
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
