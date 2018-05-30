import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { addPost } from '../../../actions/Posts';
import { HeaderComponent, ToastComponent, Spinner } from '../../common';

import {
    View, Text, FlatList, TouchableOpacity, TextInput, Button
} from 'react-native';

import {
    Header, Body, Container, Content, Icon, Card
} from 'native-base';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            postId: '',
            showToast: false,
            visible: false,
            toastBgColor: 'green'
        }
    }

    /**
     * @method componentDidMount
     * @description Code some necessary actions to be taken as soon as component mounts
     */

    /**
     * @method updatePost
     * @description Function to update the post
     */
    updatePost = () => {
        const { title, content } = this.state;
        let requestParams = { title, content, status: 'publish' };

        //  alert(JSON.stringify(requestParams));
        this.props.addPost(requestParams, res => {
            let status = res.status;
            if (status != 200 && status != 204 && status != 201) {
                if (status == 404) {
                    this.setState({
                        visible: true, message: 'There is some server error', toastBgColor: 'red'
                    })
                } else if (status == 401) {
                    this.setState({
                        visible: true, message: 'Unauthorized Access', toastBgColor: 'red'
                    })
                }
                else {
                    this.setState({
                        visible: true, message: "There is some error. Please try again later.", toastBgColor: 'red'
                    })
                }
            } else {
                this.setState({
                    visible: true, message: "The post has been created succcessfully.", toastBgColor: 'green'
                })
                setTimeout(() => {
                    this.props.navigation.navigate('PostListing');
                }, 2000);
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
     * @method render
     * @description Renders the component
     */
    render() {
        const { isAdding } = this.props.postReducer
        return (
            <Container>
                <HeaderComponent
                    title='Add Post'
                    leftButton='back'
                />
                <Content style={styles.contentStyle}>
                    <Card style={styles.cardStyle}>
                        <View style={styles.flexDirectionStyle}>
                            <View style={styles.viewTitle}>
                                <TextInput
                                    style={styles.title}
                                    onChangeText={(title) => this.setState({ title })}
                                    value={this.state.title}
                                    placeholder='Post Title'
                                />
                            </View>
                        </View>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.post}
                            onChangeText={(content) => this.setState({ content })}
                            value={this.state.content}
                            placeholder='Post Content'
                        />
                    </Card>
                    <Button
                        title='Add'
                        onPress={this.updatePost}
                    />
                    <ToastComponent
                        visible={this.state.visible}
                        backgroundColor={this.state.toastBgColor}
                        onShow={this.hideToast}
                        message={this.state.message}
                    />
                </Content>
                {isAdding && (
                    <Spinner />
                )}
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
        addPost: (data, callback) => dispatch(addPost(data, callback))
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
)(AddPost);