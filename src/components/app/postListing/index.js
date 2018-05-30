import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { fetchPostsFromAPI, deleteDataById } from '../../../actions/Posts';
import { HeaderComponent, ToastComponent } from '../../common';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import {
    Header,
    Body,
    Container,
    Content,
    Icon,
    Card,
    Footer,
    Button
} from 'native-base';
import HTMLView from 'react-native-htmlview';

class PostListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            visible: false,
            toastBgColor: 'green'
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
        Alert.alert(
            'Alert',
            'Are you sure you want to delete this post?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => this.deletePost(id), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    /**
     * @method deletePost
     * @description Function to delete Post
     */
    deletePost = (id) => {
        // alert(id);
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
        const post = this.props.posts;
        const isFetching = this.props.isFetching;

        return (
            <Container>
                <HeaderComponent
                    title='Posts'
                    leftButton='menu'
                />
                <Content style={styles.contentStyle}>
                    <FlatList
                        data={post}
                        extraData={this.props}
                        style={styles.myList}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <Card style={styles.cardStyle}>
                                <View style={styles.flexDirectionStyle}>
                                    <View style={styles.viewTitle}>
                                        <Text style={styles.title}>{item.title.rendered}</Text>
                                    </View>
                                    <View style={styles.actionButtons}>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.editPost(item.id)}>
                                            <View style={styles.flexDirectionStyle}>
                                                <Icon style={styles.editIcon} name='ios-create-outline'></Icon>
                                                <Text>Edit  </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.deleteSelectedPost(item.id)}>
                                            <View style={styles.flexDirectionStyle}>
                                                <Icon style={styles.deleteIcon} name='ios-trash-outline'></Icon>
                                                <Text> Delete</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <HTMLView
                                    value={item.content.rendered}
                                />
                            </Card>
                        )}
                    />
                    <ToastComponent
                        visible={this.state.visible}
                        backgroundColor={this.state.toastBgColor}
                        onShow={this.hideToast}
                        message={this.state.message}
                    />
                    <ActivityIndicator
                        animating={isFetching} size="large"
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
function mapStateToProps(state) {
    return {
        posts: state.posts.posts,
        isFetching: state.posts.isFetching
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