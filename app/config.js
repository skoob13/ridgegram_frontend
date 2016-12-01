import { Platform } from 'react-native';

export default {
  apiURI: Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api',
  defaultImage: 'https://openclipart.org/image/2400px/svg_to_png/177394/1366695174.png',
};
