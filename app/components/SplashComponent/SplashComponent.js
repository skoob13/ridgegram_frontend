import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default (props) =>
  <View style={[{flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'center', alignItems: 'center'}, props.style]}>
    <ActivityIndicator />
  </View>
