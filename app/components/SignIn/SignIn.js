import React, { Component, PropTypes } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import styles from './Styles';

class SignIn extends Component {
  static defaultProps = {
    signIn: () => {},
  }

  static propTypes = {
    signIn: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      cellphone: '',
      password: '',
    };
  }

  render() {
    const {
      signIn,
    } = this.props;

    const {
      cellphone,
      password,
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Card
          title="Sign In"
        >
          <FormLabel>Cellphone</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ cellphone: text })}
            autoCorrect={false}
            keyboardType="phone-pad"
            maxLength={32}
            autoCapitalize="none"
            returnKeyType="next"
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ password: text })}
            autoCorrect={false}
            maxLength={32}
            autoCapitalize="none"
            returnKeyType="next"
            secureTextEntry
          />
          <Button
            title="Sign in"
            buttonStyle={styles.button}
            raised
            fontWeight="700"
            icon={{ color: 'white', name: 'md-log-in', type: 'ionicon' }}
            onPress={() => {
              if (cellphone && password) {
                signIn(cellphone, password);
              } else {
                Alert.alert(
                    'Sign in error',
                    'One of fields is empty!',
                  [
                      { text: 'OK', onPress: () => {} },
                  ],
                  );
              }
            }}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

export default SignIn;
