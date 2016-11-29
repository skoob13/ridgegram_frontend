import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  SignComponent,
  SignIn,
  SignUp
} from '../../components';
import { signIn } from '../../redux/actions/signIn';

const {
  popRoute,
  pushRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellphone: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  _renderScene(props) {
    const {
      navigation,
      pushToRoute,
      signToAccount,
    } = this.props;

    switch (props.scene.route.key) {
      case 'signIn':
        return <SignIn signIn={(cellphone, password) => {
          signToAccount(cellphone, password);
        }}/>;
      case 'signUp':
        return <SignUp />
      default :
        return <SignComponent
          signIn={() => pushToRoute({ key: 'signIn' }, navigation.key)}
          signUp={() => pushToRoute({ key: 'signUp' }, navigation.key)}
        />;
    }
  }

  _renderOverlay(props) {
    if (this.props.isFetching) {
      return (
        <View style={{flex: 1, backgroundColor: 'black'}} />
      );
    }
  }

  render() {
    const {
      navigation,
    } = this.props;

    return (
      <NavigationCardStack
        navigationState={navigation}
        renderScene={this._renderScene.bind(this)}
        renderHeader={this._renderOverlay.bind(this)}
      />
    );
  }
}

function bindActions(dispatch) {
	return {
    pushToRoute: (i, key) => dispatch(pushRoute(i, key)),
    popToRoute: (i, key) => dispatch(popRoute(i, key)),
    signToAccount: (cellphone, password) => dispatch(signIn({
      cellphone: cellphone,
      password: password,
    })),
	};
}

function mapStateToProps(state) {
  console.log(state);
	return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
		navigation: state.signNavigation
	};
}
export default connect(mapStateToProps, bindActions)(Sign);
