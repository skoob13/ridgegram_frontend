# Ridgegram frontend
[Ridgegram backend](https://github.com/skoob13/ridgegram_backend)
## Installation
`npm install`

## Configuration
`/app/config.js` for setting API host (default `http://localhost:3000/api`)

## Dependencies
* `react-native@0.38`
* `redux` & `react-redux`
* `redux-persist` for saving state with AsyncStorage (auth)
* `redux-thunk` for async magic
* `react-native-navigation-redux-helpers` helpers for navigation in `NavigationExperemental`
* `remote-redux-devtools` for debugging Redux (CTRL + CMD + UP in Chrome DevTools)
* `react-native-elements` for common elements
* `react-native-action-button` for Material Desigh like button
* `react-native-image-picker` for uploading images from gallery
* `react-native-keyboard-aware-scroll-view` replacement for React-Native `KeyboardAvoidingView` (ScrollView issues)
* `react-native-vector-icons`

## Demo
![alt text][sign] ![alt text][signIn] ![alt text][signUp] ![alt text][feed] ![alt text][self] ![alt text][profile]
[sign]: /media/sign.png "Sign screen"
[signIn]: /media/signIn.png "Sign In screen"
[signUp]: /media/signUp.png "Sign Up screen"
[feed]: /media/feed.png "Feed screen"
[self]: /media/self.png "Self profile screen"
[profile]: /media/profile.png "User's profile screen"
