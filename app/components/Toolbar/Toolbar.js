import React, { Component, PropTypes } from 'react';
import { View, Platform, PixelRatio } from 'react-native';

const Toolbar = (props, context) => {
  const styles = {
    height: 64,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  };

  const shadow = {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    height: 1 / PixelRatio.get(),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'android' ? 0 : - 1 / PixelRatio.get(),
  };

  return (
    <View style={[styles, props.style]}>
      {props.children}
      {
        props.shadow && <View style={shadow} />
      }
    </View>
  );
}

Toolbar.propTypes = {
  children: PropTypes.element,
  style: PropTypes.number,
  shadow: PropTypes.bool,
};

Toolbar.propTypes = {
  children: null,
  style: null,
  shadow: false,
};

export default Toolbar;
