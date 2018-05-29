/**
 * In this file we are going to check whether a user is already logged in or not
 * Based on that status we will switch to AuthStack or AppStack
 */

import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import styles from "../assets/styles";

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    /**
     * @method _bootstrapAsync
     * @description Fetch the token from storage then navigate to our appropriate place
     */
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('isLoggedIn');
        /**
         * This will switch to the App screen or Auth screen and this loading
         * screen will be unmounted and thrown away.
         */
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    /**
     * @method render
     * @description Render any loading content or splash screen that you like here
     */
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}