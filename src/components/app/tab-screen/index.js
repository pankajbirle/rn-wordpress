/**
 * This screen contains tab navigation
 * Here we have simply used the previous defined screens(Home and Profile)
 */
import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Text } from 'react-native';
import { Icon } from 'native-base';
import HomeScreen from '../home';
import SettingsScreen from '../profile';


export default TabNavigator(
    {
        Home: { screen: HomeScreen },
        Settings: { screen: SettingsScreen },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }
                /**
                 * You can return any component that you like here! We usually use an
                 * icon component from react-native-vector-icons
                 */
                return <Icon name= { iconName }/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            activeBackgroundColor : 'white'
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);