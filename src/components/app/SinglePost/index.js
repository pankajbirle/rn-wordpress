import React, { Component } from 'react';
import styles from '../../../assets/styles';
import { HeaderComponent, ToastComponent, Spinner, Confirm } from '../../common';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import {
    Header, Body, Container, Content, Icon, Card, Footer, Button, CardItem, Left, Right
} from 'native-base';
import HTMLView from 'react-native-htmlview';
import { capitalizeFirstLetter, formatDate, stripHtml, convertDate } from '../../../helper'

export default class SinglePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null
        }
    }
    /**
     * @method componentDidMount
     * @description Code some necessary actions to be taken as soon as component mounts
     */
    componentDidMount() {
        const { params } = this.props.navigation.state
        this.setState({ item: params.item })
    }

    /**
     * @method render
     * @description Renders the component
     */
    render() {
        const { item } = this.state;
        return (
            <Container>
                <HeaderComponent
                    title='Post Detail'
                    leftButton='back'
                />
                <Content style={styles.contentStyle}>
                    {item && (

                        <Card style={styles.cardStyle}>
                            <CardItem bordered>
                                <Body>
                                    <View style={styles.flexDirectionStyle}>
                                        <View style={styles.viewTitle}>
                                            <Text style={styles.listItemTitle}>{item.title.rendered}</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>

                            <CardItem bordered>
                                <Body>
                                    <Text>{stripHtml(item.content.rendered)}</Text>
                                </Body>
                            </CardItem>

                            <CardItem footer bordered>
                                <Left>
                                    <Text>{capitalizeFirstLetter(item._embedded.author[0].name)}</Text>
                                </Left>
                                <Body>
                                    <Text>{convertDate(item.date)}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )}
                </Content>
            </Container>
        )
    }
}