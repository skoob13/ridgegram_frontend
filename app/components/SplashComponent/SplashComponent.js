import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const SplashComponent = props => (
  <View style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'center', alignItems: 'center' }, props.style]}>
    <ActivityIndicator />
  </View>
);

SplashComponent.defaultProps = {
  style: {},
};

SplashComponent.propTypes = {
  style: React.PropTypes.any,
};

export default SplashComponent;
