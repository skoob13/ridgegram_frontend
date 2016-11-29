import React, { Component, PropTypes } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Card, FormLabel, FormInput, ScrollView } from 'react-native-elements';
import styles from './Styles';

class SignUp extends Component {
  static defaultProps = {
    signUp: () => {},
  }

  static propTypes = {
    signUp: PropTypes.func.isRequired,
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
      signUp,
    } = this.props;

    const {
      cellphone,
      password
    } = this.state;

    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Card
            title="Sign Up"
            >
              <FormLabel>Cellphone</FormLabel>
              <FormInput
                onChangeText={ (text)=> this.setState({cellphone: text}) }
                autoCorrect={false}
                keyboardType="phone-pad"
                maxLength={32}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <FormLabel>Password</FormLabel>
              <FormInput
                onChangeText={ (text)=> this.setState({password: text}) }
                autoCorrect={false}
                maxLength={32}
                autoCapitalize="none"
                returnKeyType="next"
                secureTextEntry
              />
              <Button
                title="Sign up"
                buttonStyle={styles.button}
                raised
                fontWeight="700"
                icon={{color: 'white', name: 'md-log-in', type: 'ionicon'}}
                onPress={() => signUp(cellphone, password)}
              />
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default SignUp;
