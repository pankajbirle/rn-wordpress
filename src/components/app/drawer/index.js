/**
 * This is the Drawer component
 * Anything inside this file will be there in the drawer
 */

import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { List, ListItem, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class Drawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDisplayName: '',
            userEmail: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userResponse')
            .then((value) => {
                if (value != null) {
                    value = JSON.parse(value);
                    this.setState({
                        userDisplayName: value.user_display_name,
                        userEmail: value.user_email
                    })
                }
            })
    }

    navigate = (path) => () => {
        this.props.navigation.navigate(path);
    }

    /**
     * @method onLogout
     * @description Clear AsyncStorage and navigate user to AuthLoading screen
     */
    onLogout = () => () => {
        AsyncStorage.clear()
        this.props.navigation.navigate('AuthLoading');
    }

    /**
     * @method render
     * @description render component
     */
    render() {
        const { userDisplayName, userEmail } = this.state
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'https://i.ytimg.com/vi/TZ7aoZG11Cc/maxresdefault.jpg' }} />
                                <Body>
                                    <Text>{userDisplayName}</Text>
                                    <Text note ellipsizeMode='tail' numberOfLines={1}>{userEmail}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <List>
                        <ListItem>
                            <Text onPress={this.navigate('PostListing')}>Post Listing</Text>
                        </ListItem>
                        <ListItem>
                            <Text onPress={this.navigate('Gallery')}>Gallery</Text>
                        </ListItem>
                        <ListItem>
                            <Text onPress={this.navigate('Pages')}>Pages</Text>
                        </ListItem>
                        <ListItem>
                            <Text onPress={this.navigate('Services')}>Services</Text>
                        </ListItem>
                        <ListItem>
                            <Text onPress={this.onLogout()}>Logout</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}