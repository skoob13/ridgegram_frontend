import React, { Component, PropTypes } from 'react';
import {
  Alert,
  View,
  Image,
  TouchableWithoutFeedback,
  Picker
} from 'react-native';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './Styles';
import config from '../../config';
import ImagePicker from 'react-native-image-picker';

class SignUp extends Component {
  static defaultProps = {
    signUp: () => {},
  }

  static propTypes = {
    signUp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      cellphone: '',
      password: '',
      fullname: '',
      description: '',
      gender: 'female',
      avatarSource: config.defaultImage
    };
  }

  openGallery() {
    const options = {
      title: 'Select Avatar',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take photo',
      mediaType: 'photo',
      quality: '0.1',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error) {
        console.log('Image picker error!');
      }
      else {
        const source = 'data:image/jpeg;base64,' + response.data;

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    const {
      signUp,
    } = this.props;

    const {
      avatarSource,
      cellphone,
      gender,
      fullname,
      description,
      password,
    } = this.state;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Card
          title="Sign Up"
          containerStyle={{marginBottom: 32}}
          >
            <TouchableWithoutFeedback onPress={() => this.openGallery()}>
              <View style={styles.takePhoto}>
                <Image style={styles.image} source={{uri: avatarSource}} />
                <FormLabel>Select your avatar</FormLabel>
              </View>
            </TouchableWithoutFeedback>
            <FormLabel>About you</FormLabel>
            <FormInput
              onChangeText={ (text)=> this.setState({description: text}) }
              maxLength={256}
              returnKeyType="next"
            />
            <FormLabel>Fullname</FormLabel>
            <FormInput
              onChangeText={ (text)=> this.setState({fullname: text}) }
              maxLength={64}
              returnKeyType="next"
            />
            <FormLabel>Gender</FormLabel>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={(g) => this.setState({gender: g})}
              style={{marginHorizontal: 16}}
              >
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Male" value="male" />
            </Picker>
            <FormLabel>Cellphone</FormLabel>
            <FormInput
              onChangeText={ (text)=> this.setState({cellphone: text}) }
              autoCorrect={false}
              keyboardType="phone-pad"
              maxLength={32}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              onChangeText={ (text)=> this.setState({password: text}) }
              autoCorrect={false}
              maxLength={32}
              autoCapitalize="none"
              returnKeyType="next"
              secureTextEntry
            />
            <Button
              title="Sign up"
              buttonStyle={styles.button}
              raised
              fontWeight="700"
              icon={{color: 'white', name: 'md-log-in', type: 'ionicon'}}
              onPress={() => {
                if (cellphone && fullname && gender && description && password.length > 5) {
                  signUp({
                    avatar: avatarSource,
                    cellphone: cellphone,
                    gender: gender,
                    fullname: fullname,
                    description: description,
                    password: password,
                  })
                } else {
                  Alert.alert(
                    'Sign up error',
                    'One of fields is empty or length of password is less than 6 symbols! Avatar can be empty.',
                    [
                      {text: 'OK', onPress: () => {}},
                    ]
                  );
                }
              }}
            />
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUp;
