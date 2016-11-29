import React, { Component, PropTypes } from 'react';
import { View, ListView, TouchableWithoutFeedback, PixelRatio, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { ListItem, Text } from 'react-native-elements'
import styles from './Styles';
import { Toolbar } from '../../components';

// Redux actions
import { selectProfile } from '../../redux/actions/feed';

const {
  pushRoute,
  popRoute
} = navigationActions;

class Feed extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource
    }
  }

  render() {
    const {
      pushToRoute,
      popToRoute,
      navigation,
    } = this.props;

    return (
      <View style={styles.container}>
        <Toolbar style={styles.toolbar} shadow>
          <View style={styles.toolbarCentered}>
            <Text h5>Ridgegram</Text>
          </View>
        </Toolbar>
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
        />
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <ListItem
        roundAvatar
        avatar={{ uri: rowData.avatar.url }}
        //onPress={() => push}
        title={rowData.fullname}
        subtitle={ rowData.avatar.description ? rowData.avatar.description : null }
      />
    );
  }
}

function bindActions(dispatch) {
	return {
		pushToRoute: (i, key) => dispatch(pushRoute(i, key)),
    popToRoute: (i, key) => dispatch(popRoute(i, key)),
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.tabReducer
	};
}
export default connect(mapStateToProps, bindActions)(Feed);
