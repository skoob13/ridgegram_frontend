import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, PixelRatio } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const NavToolbar = (props) => {
  return (
    <View style={styles.toolbar}>
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
      <View style={styles.shadow} />
    </View>
  );
}

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
    height: 64,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  toolbarCentered: {
    flex: 0.4,
    alignItems: 'center',
  },

  toolbarPart: {
    flex: 0.2,
  },

  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    height: 1 / PixelRatio.get(),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'android' ? 0 : - 1 / PixelRatio.get(),
  },


});

export default NavToolbar;
