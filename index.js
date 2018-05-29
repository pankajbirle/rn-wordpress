import React from 'react';
import {
    AppRegistry, YellowBox
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import App from './src';
import { Root } from "native-base";
const store = configureStore();

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const WPApp = () => (
    <Provider store={store}>
        <Root>
            <App />
        </Root>
    </Provider>
)

AppRegistry.registerComponent('WPApp', () => WPApp);