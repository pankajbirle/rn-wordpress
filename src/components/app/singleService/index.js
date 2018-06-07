import React, { Component } from 'react';
import styles from '../../../assets/styles';
import { HeaderComponent, ToastComponent, Spinner, Confirm } from '../../common';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Alert,
    Image,
    BackHandler
} from 'react-native';
import {
    Header, Body, Container, Content, Icon, Card, Footer, Button, CardItem, Left, Right, Title
} from 'native-base';
import HTMLView from 'react-native-htmlview';
import { capitalizeFirstLetter, formatDate, stripHtml, convertDate } from '../../../helper'

export default class SingleService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    /**
     * @method componentDidMount
     * @description Code some necessary actions to be taken as soon as component mounts
     */
    componentDidMount() {
        const { params } = this.props.navigation.state
        this.setState({ item: params.item })
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Services');
        return true;
    }

    /**
     * @method render
     * @description Renders the component
     */
    render() {
        const { item } = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Services')}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{
                        paddingLeft: 20
                    }}>
                        <Title>Service Detail</Title>
                    </Body>
                </Header>
                <Content style={styles.contentStyle}>
                    {item && (
                        <Card style={styles.cardStyle}>
                            <CardItem>
                                <Body>
                                    <View style={styles.flexDirectionStyle}>
                                        <View style={styles.viewTitle}>
                                            <Text style={styles.listItemTitle}>{item.title.rendered}</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url }} style={styles.imageStyle} />
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>{stripHtml(item.content.rendered)}</Text>
                                </Body>
                            </CardItem>
                            <CardItem footer>
                                <Left>
                                    <Text>Service Type: {item.service_type.service_type}</Text>
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