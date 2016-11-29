import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

const Toolbar = (props, context) => {
  const styles = {
    height: 64,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'transparent'
  };

  return (
    <View style={[styles, props.style]}>
      {props.children}
    </View>
  );
}

Toolbar.propTypes = {
  children: PropTypes.element,
  style: PropTypes.number,
};

export default Toolbar;
