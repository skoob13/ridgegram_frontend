import React, { PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles';

const NavToolbar = props => (
  <View style={styles.toolbar}>
    <View style={styles.toolbarPart}>
      {
          props.popEnabled && (
            <TouchableOpacity onPress={() => props.popRoute()}>
              <Icon name="ios-arrow-back" size={32} />
            </TouchableOpacity>
          )
        }
    </View>
    <View style={styles.toolbarCentered}>
      <Text h5>Ridgegram</Text>
    </View>
    <View style={[styles.toolbarPart, { alignItems: 'flex-end' }]}>
      {
          props.logOutEnabled && (
            <TouchableOpacity onPress={() => props.logOut()}>
              <Text h5>Sign out</Text>
            </TouchableOpacity>
          )
        }
    </View>
    <View style={styles.shadow} />
  </View>
  );

NavToolbar.defaultProps = {
  popEnabled: false,
  popRoute: () => {},
  logOutEnabled: false,
  logOut: () => {},
};

NavToolbar.propTypes = {
  popEnabled: PropTypes.bool,
  popRoute: PropTypes.func,
  logOutEnabled: PropTypes.bool,
  logOut: PropTypes.func,
};

export default NavToolbar;
