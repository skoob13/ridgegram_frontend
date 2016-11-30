import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 8,
  },

  image: {
    flex: 1,
  },

  idContainer: {
    justifyContent: 'flex-end',
    paddingTop: 8
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-end',
    padding: 20
  },

  h3: {
    color: 'rgba(0,0,0,0.87)',
    fontWeight: '400',
  },

  h5pink: {
    color: '#F66E96',
    marginTop: 4,
  },

  h5: {
    color: 'rgba(0,0,0,0.4)',
    marginTop: 12,
  },

  h4: {
    fontWeight: '600'
  },

  h6: {
    fontWeight: '600'
  },

  btnContainer: {
    position: 'absolute',
    top: 100,
    right: 36,
  },

  overlayModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});
