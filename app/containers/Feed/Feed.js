import React, { Component, PropTypes } from 'react';
import { View, ListView, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { ListItem } from 'react-native-elements';
import styles from './Styles';
import { SplashComponent } from '../../components';

// Redux actions
import { getFeed, getUser } from '../../redux/actions/feed';

const {
  pushRoute,
} = navigationActions;

class Feed extends Component {
  static propTypes = {
    pushToRoute: PropTypes.func,
    fetch: PropTypes.func,
    fetchUser: PropTypes.func,
    feed: PropTypes.array,
    isFetching: PropTypes.bool,
    hasMore: PropTypes.bool,
  }

  static defaultProps = {
    pushToRoute: () => {},
    fetch: () => {},
    fetchUser: () => {},
    feed: [],
    isFetching: false,
    hasMore: true,
  }

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource,
    };
  }

  componentDidMount = () => this._onEndReached();

  componentWillReceiveProps(nextProps) {
    if (nextProps.feed) {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.feed) });
    }
  }

  _onEndReached() {
    const {
      fetch,
      feed,
      isFetching,
      hasMore,
    } = this.props;

    if (!isFetching && hasMore) {
      fetch(feed.length);
    }
  }

  _renderRow(rowData) {
    return (
      <ListItem
        roundAvatar
        avatar={{ uri: rowData.avatar.url }}
        onPress={() => {
          const {
            fetchUser,
            pushToRoute,
          } = this.props;

          fetchUser(rowData.id);
          pushToRoute({ key: 'profile' }, 'global');
        }}
        title={rowData.fullname}
        subtitle={rowData.avatar.description ? rowData.avatar.description : null}
      />
    );
  }

  _renderFooter() {
    const {
      isFetching,
      hasMore,
    } = this.props;

    if (isFetching && hasMore) {
      return (
        <SplashComponent style={styles.splashComponent} />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          automaticallyAdjustContentInsets={false}
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={rowData => this._renderRow(rowData)}
          renderFooter={() => this._renderFooter()}
          onEndReached={() => this._onEndReached()}
          onEndReachedThreshold={1500}
          style={{ marginTop: 1 / PixelRatio.get() }}
        />
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    pushToRoute: (i, key) => dispatch(pushRoute(i, key)),
    fetch: offset => dispatch(getFeed(offset)),
    fetchUser: id => dispatch(getUser(id)),
  };
}

function mapStateToProps(state) {
  return {
    feed: state.feed.data,
    isFetching: state.feed.isFetching,
    hasMore: state.feed.hasMoreUsers,
  };
}
export default connect(mapStateToProps, bindActions)(Feed);
