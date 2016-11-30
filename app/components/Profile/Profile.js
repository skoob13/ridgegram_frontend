import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import styles from './Styles';
import { Toolbar } from '../';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import config from '../../config';

const {
  width,
  height
} = Dimensions.get('window');

class Profile extends Component {
  static propTypes = {
    avatar: PropTypes.shape({
      description: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }),
    cellphone: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    logoutPressed: PropTypes.func,
    id: PropTypes.string.isRequired,
    selfProfile: PropTypes.bool,
  };

  static defaultProps = {
    logoutPressed: () => {},
    avatar: {
      description: '',
      likesCount: 0,
      url: config.defaultImage,
    },
    cellphone: '',
    fullname: '',
    gender: '',
    id: '',
    selfProfile: '',
  };

  render() {
    const {
      avatar,
      cellphone,
      fullname,
      gender,
      logoutPressed,
      id,
      selfProfile
    } = this.props;
    const imageHeight = height * 0.45;

    return (
      <View style={styles.container}>
        <View style={{height: imageHeight}}>
          <Image style={styles.image} source={{uri: avatar.url}}>
            <View style={styles.overlay}>
              <Toolbar>
                <View style={styles.centered}>
                  <TouchableOpacity onPress={() => logoutPressed()}>
                    <Text h5 style={{color: 'white'}}>Sign out</Text>
                  </TouchableOpacity>
                </View>
              </Toolbar>
              <View style={styles.likesContainter}>
                <Text numberOfLines={1} h5 style={styles.h4}>{avatar.likesCount}</Text>
                <Text numberOfLines={1} h5 style={[styles.h4, {color: 'rgba(0,0,0,0.4)'}]}>
                  Likes
                </Text>
              </View>
            </View>
          </Image>
        </View>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={2} h3 style={styles.h3}>{fullname}, {gender}</Text>
          <Text numberOfLines={1} h5 style={styles.h5pink}>Phone: {cellphone}</Text>
          <View style={{flex: 1, overflow: 'hidden'}}>
            <Text h5 style={styles.h5}>{avatar.description}</Text>
          </View>
          <View style={styles.idContainer}>
            <Text h6 style={styles.h6}>id: {id}</Text>
          </View>
        </View>
        <View style={[styles.btnContainer, {top: imageHeight + 50}]}>
          <ActionButton
            buttonColor="#F66E96"
            onPress={() => {  }}
            icon={<Icon name="md-heart" size={24} color="white"/>}
          />
        </View>
      </View>
    );
  }
}

export default Profile;
