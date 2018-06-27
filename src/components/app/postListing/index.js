import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { fetchPostsFromAPI, deleteDataById } from '../../../actions/Posts';
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
import Moment from 'moment';
class PostListing extends Component {

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
        this.props.fetchPostsFromAPI()
    }

    /**
     * @method changeScreen
     * @description Navigate back to home
     */
    changeScreen = () => {
        this.props.navigation.goBack();
    }

    /**
     * @method editPost
     * @description Navigate to Edit Page
     */
    editPost(id) {
        this.props.navigation.navigate('EditPost', { postId: id });
    }

    /**
     * @method deleteSelectedPost
     * @description Function to delete Post
     */
    deleteSelectedPost = (id) => {
        this.setState({
            showConfirm: true,
            deleteId: id
        })
    }

    /**
     * @method deletePost
     * @description Function to delete Post
     */
    deletePost = () => () => {
        let id = this.state.deleteId
        this.setState({ showConfirm: false })
        this.props.deleteDataById(id, res => {
            if (res.status != 200 && res.status != 204) {
                if (res.status == 404) {
                    this.setState({
                        visible: true, message: res.response.data.message, toastBgColor: 'red'
                    })
                } else if (res.status == 401) {
                    this.setState({
                        visible: true, message: res.response.data.message, toastBgColor: 'red'
                    })
                }
                else {
                    this.setState({
                        visible: true, message: "There is some error. Please try again later.", toastBgColor: 'red'
                    })
                }
            } else {
                this.setState({
                    visible: true, message: 'The post has been deleted successfully.', toastBgColor: 'green'
                })
                this.props.fetchPostsFromAPI();
            }
        })
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
        const { fetchingAllPosts, isDeleting, posts } = this.props.postReducer
        const { showConfirm } = this.state
        const showLoader = (fetchingAllPosts || isDeleting || (posts == null))
        return (
            <Container>
                <HeaderComponent
                    title='Posts'
                    leftButton='menu'
                    renderRightComponent={() => (
                        <Text style={styles.headerPostButton} onPress={() => this.props.navigation.navigate("AddPost")}>Add Post</Text>
                    )}
                />
                <Content style={styles.contentStyle}>
                    {posts != null && (
                        <FlatList
                            data={posts}
                            extraData={this.props}
                            style={styles.myList}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                                <Card>
                                    <CardItem bordered>
                                        <Body>
                                            <View>
                                                <View style={styles.viewTitle}>
                                                    <Text onPress={() => this.props.navigation.navigate('SinglePost', { item })} style={styles.listItemTitle}>{item.title.rendered}</Text>
                                                    <Text style={styles.author}>Author: {capitalizeFirstLetter(item._embedded.author[0].name)}</Text>
                                                </View>
                                            </View>
                                        </Body>
                                    </CardItem>

                                    <CardItem bordered>
                                        <Body>
                                            <Text ellipsizeMode='tail' numberOfLines={4}>{stripHtml(item.content.rendered)}</Text>
                                        </Body>
                                    </CardItem>

                                    <CardItem footer bordered>
                                        <Left>
                                            <Text style={{ fontSize: 13 }}>{convertDate(item.date)}</Text>
                                        </Left>
                                        <Right>
                                            <View style={styles.actionButtons}>
                                                <TouchableOpacity style={styles.postActionButtonWrap} onPress={() => this.editPost(item.id)}>
                                                    <View style={styles.flexDirectionStyle}>
                                                        <Icon style={[styles.editIcon, { fontSize: 18 }]} name='ios-create-outline'></Icon>
                                                        <Text style={{ fontSize: 13 }}>Edit  </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.postActionButtonWrap} onPress={() => this.deleteSelectedPost(item.id)}>
                                                    <View style={styles.flexDirectionStyle}>
                                                        <Icon style={[styles.deleteIcon, { fontSize: 18 }]} name='ios-trash-outline'></Icon>
                                                        <Text style={{ fontSize: 13 }}> Delete  </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.postActionButtonWrap} onPress={() => this.props.navigation.navigate("SinglePost", { item })}>
                                                    <View style={styles.flexDirectionStyle}>
                                                        <Icon style={[styles.viewIcon, { fontSize: 18 }]} name='ios-eye-outline'></Icon>
                                                        <Text style={{ fontSize: 13 }}> View</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </Right>
                                    </CardItem>
                                </Card>
                            )}
                            ListEmptyComponent={() => {
                                if (!showLoader) {
                                    return <Text style={styles.noDataStyle}>No Record Found</Text>
                                } else {
                                    return null
                                }
                            }}
                        />
                    )}
                    <ToastComponent
                        visible={this.state.visible}
                        backgroundColor={this.state.toastBgColor}
                        onShow={this.hideToast}
                        message={this.state.message}
                    />
                </Content>
                {showLoader && (
                    <Spinner />
                )}
                <Confirm
                    show={showConfirm}
                    title="Delete Post?"
                    message="Are you sure you want to delete this post?"
                    cancelText="No, cancel"
                    confirmText="Yes, delete it"
                    onCancelPressed={() => this.setState({ showConfirm: false })}
                    onConfirmPressed={this.deletePost()}
                />
            </Container>
        )
    }
}

/**
* @method mapStateToProps
* @description return state to component as props
* @param {*} state
*/
function mapStateToProps(state) {
    return {
        postReducer: state.posts
    }
}

/**
 * @method mapDispatchToProps
 * @description dispatch actions
* @param {*} dispatch
                        */
function mapDispatchToProps(dispatch) {
    return {
        fetchPostsFromAPI: () => dispatch(fetchPostsFromAPI()),
        deleteDataById: (id, callback) => dispatch(deleteDataById(id, callback)),
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
)(PostListing);