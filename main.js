import Exponent, { Font } from 'exponent';
import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import { Examples } from '@shoutem/ui';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      let pAssets = cacheAssetsAsync({
        images: [
          require('./assets/images/exponent-wordmark.png'),
        ],
        fonts: [
          FontAwesome.font,
          {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
        ],
      });

      let pFonts = Font.loadAsync({
        'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
        'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
        'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
        'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
        'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
        'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
        'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
        'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
        'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
        'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
        'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
      });

      await Promise.all([pAssets, pFonts]);
    } catch(e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
    }
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <Exponent.Components.AppLoading />
      );
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <Examples />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Exponent.registerRootComponent(AppContainer);
