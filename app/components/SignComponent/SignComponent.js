import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './Styles';

const SignComponent = props => (
  <View style={styles.container}>
    <Button
      title="Sign in"
      buttonStyle={styles.button}
      raised
      fontWeight="700"
      icon={{ color: 'white', name: 'md-log-in', type: 'ionicon' }}
      onPress={() => props.signIn()}
    />
    <Button
      title="Sign up"
      buttonStyle={[styles.button, { backgroundColor: '#3F51B5' }]}
      raised
      fontWeight="700"
      icon={{ color: 'white', name: 'md-person-add', type: 'ionicon' }}
      onPress={() => props.signUp()}
    />
  </View>
  );

SignComponent.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

SignComponent.defaultProps = {
  signIn: () => {},
  signUp: () => {},
};

export default SignComponent;
