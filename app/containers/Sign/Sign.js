import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  SignComponent,
  SignIn,
  SignUp
} from '../../components';
import { signIn, signUp } from '../../redux/actions/auth';

const {
  popRoute,
  pushRoute,
  replaceAt
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

const {
  Header,
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
    if (nextProps.isAuthenticated) {
      this.props.replaceRoute('sign', { key: 'home' }, 'global');
    }
  }

  componentWillUnmount() {
    const {
      popToRoute,
      navigation
    } = this.props;

    if (navigation.routes.length === 2) {
      popToRoute('signNavigator');
    }
  }

  _renderScene(props) {
    const {
      createAccount,
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
        return <SignUp signUp={(user) => {
          createAccount(user);
        }} />
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
        <Header style={{height: 320, backgroundColor: 'black'}} {...props}/>
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
    popToRoute: (key) => dispatch(popRoute(key)),
    signToAccount: (cellphone, password) => dispatch(signIn({
      cellphone: cellphone,
      password: password,
    })),
    replaceRoute: (at, to, key) => dispatch(replaceAt(at, to, key)),
    createAccount: (user) => dispatch(signUp(user)),
	};
}

function mapStateToProps(state) {
	return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
		navigation: state.signNavigation
	};
}
export default connect(mapStateToProps, bindActions)(Sign);
