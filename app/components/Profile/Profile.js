import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import config from '../../config';
import { SplashComponent } from '../';

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
    id: PropTypes.string.isRequired,
    selfProfile: PropTypes.bool,
    isFetching: PropTypes.bool,
    likeUser: PropTypes.func,
    isFetchingLikes: PropTypes.func,
  };

  static defaultProps = {
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
    isFetching: false,
    isFetchingLikes: false,
    likeUser: () => {},
  };

  componentWillReceiveProps(nextProps) {
    this.refs.btn.animateButton();
  }

  render() {
    const {
      avatar,
      cellphone,
      fullname,
      gender,
      id,
      selfProfile,
      isFetching,
      likeUser
    } = this.props;
    const imageHeight = height * 0.35;

    const likeBtn = selfProfile || (
      <View style={[styles.btnContainer, {top: imageHeight + 50}]}>
        <ActionButton
          buttonColor="#F66E96"
          onPress={() => likeUser(id) }
          icon={<Icon name="md-heart" size={24} color="white"/>}
          ref="btn"
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={{height: imageHeight}}>
          <Image style={styles.image} source={{uri: avatar.url}}>
            <View style={styles.overlay}>
              <Text numberOfLines={1} h5 style={styles.h4}>{avatar.likesCount}</Text>
              <Text numberOfLines={1} h5 style={[styles.h4, {color: 'rgba(0,0,0,0.4)'}]}>
                Likes
              </Text>
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
        { likeBtn }
        {
          isFetching && <SplashComponent style={styles.overlayModal}/>
        }
      </View>
    );
  }
}

export default Profile;
