import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { fetchServicesFromAPI } from '../../../actions/Services';
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
    Header, Body, Container, Content, Icon, Card, Footer, Button, CardItem, Left, Right, Thumbnail
} from 'native-base';
import { capitalizeFirstLetter, formatDate } from '../../../helper'

class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            visible: false,
            toastBgColor: 'green',
            showConfirm: false
        }
    }

    /**
     * @method componentDidMount
     * @description Code some necessary actions to be taken as soon as component mounts
     */
    componentDidMount() {
        /** Action method called to load the api as soon as the component is mounted */
        this.props.fetchServicesFromAPI()
    }

    /**
     * @method changeScreen
     * @description Navigate back to home
     */
    changeScreen = () => {
        this.props.navigation.goBack();
    }

    /**
     * @method hideToast
     * @description function to hide toast
     */
    hideToast = () => {
        setTimeout(() => this.setState({
            visible: false
        }), 2000); /** hide toast after 2s */
    }

    /**
     * @method keyExtractor
     * @description keyExtractor required by FlatList
     * @param {any} item - The item in loop
     * @param {Number} - the index of the current item
     */
    keyExtractor = (item, index) => index.toString()

    /**
     * @method render
     * @description Renders the component
     */
    render() {
        const { services, fetchingAllServices } = this.props.services;

        return (
            <Container>
                <HeaderComponent
                    title='Services'
                    leftButton='menu'
                />
                <Content style={styles.contentStyle}>
                    {services != null && (
                        <FlatList
                            data={services}
                            extraData={this.props}
                            style={styles.myList}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                                <Card>
                                    <CardItem bordered>
                                        <Left>
                                            <Thumbnail large source={{ uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url }} />
                                        </Left>
                                            <View style={styles.viewTitle}>
                                                <Text onPress={() => this.props.navigation.navigate('SinglePost', { item })} style={styles.listItemTitle}>{item.title.rendered}</Text>
                                                <Text style={styles.author}>Service Type: {item.service_type.service_type}</Text>
                                            </View>
                                    </CardItem>

                                    <CardItem bordered>
                                        <Body>
                                            <Text ellipsizeMode='tail' numberOfLines={4}>{item.content.rendered}</Text>
                                        </Body>
                                    </CardItem>

                                    <CardItem footer bordered>
                                        <Left>
                                            <Text>{formatDate(new Date(item.date))}</Text>
                                        </Left>
                                        <Right>
                                            <View style={styles.actionButtons}>
                                                <TouchableOpacity style={styles.postActionButtonWrap} onPress={() => this.props.navigation.navigate("SinglePost", { item })}>
                                                    <View style={styles.flexDirectionStyle}>
                                                        <Icon style={styles.viewIcon} name='ios-eye-outline'></Icon>
                                                        <Text> View</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </Right>
                                    </CardItem>
                                </Card>
                            )}
                        />
                    )}
                    <ToastComponent
                        visible={this.state.visible}
                        backgroundColor={this.state.toastBgColor}
                        onShow={this.hideToast}
                        message={this.state.message}
                    />
                </Content>
            </Container>
        )
    }
}

/**
* @method mapStateToProps
* @description return state to component as props
* @param {*} state
*/
function mapStateToProps(store) {
    return {
        services: store.services
    }
}

/**
 * @method mapDispatchToProps
 * @description dispatch actions
* @param {*} dispatch
                        */
function mapDispatchToProps(dispatch) {
    return {
        fetchServicesFromAPI: () => dispatch(fetchServicesFromAPI())
    }
}

/**
 * @method connect
 * @description connect with redux
* @param {function} mapStateToProps
* @param {function} mapDispatchToProps
                        */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);