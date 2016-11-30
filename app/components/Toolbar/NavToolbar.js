import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Toolbar from './Toolbar';
import Icon from 'react-native-vector-icons/Ionicons';

const NavToolbar = (props) => (
  <Toolbar style={styles.toolbar} shadow>
    <View style={styles.toolbarPart}>
      {
        props.popEnabled && (
          <TouchableOpacity onPress={ () => props.popRoute() }>
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
          <TouchableOpacity onPress={ () => props.logOut() }>
            <Text h5>Sign out</Text>
          </TouchableOpacity>
        )
      }
    </View>
  </Toolbar>
);

NavToolbar.defaultProps = {
  popEnabled: false,
  popRoute: () => {},
  logOutEnabled: false,
  logOut: () => {},
}

NavToolbar.defaultProps = {
  popEnabled: PropTypes.boolean,
  popRoute: PropTypes.func,
  logOutEnabled: PropTypes.boolean,
  logOut: PropTypes.func,
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
  },

  toolbarCentered: {
    flex: 0.4,
    alignItems: 'center',
  },

  toolbarPart: {
    flex: 0.2,
  },
});

export default NavToolbar;
