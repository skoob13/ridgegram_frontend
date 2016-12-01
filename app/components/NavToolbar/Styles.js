import { StyleSheet, Platform, PixelRatio } from 'react-native';

export default StyleSheet.create({
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
    bottom: Platform.OS === 'android' ? 0 : -1 / PixelRatio.get(),
  },
});
