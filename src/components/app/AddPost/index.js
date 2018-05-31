import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { addPost } from '../../../actions/Posts';
import { HeaderComponent, ToastComponent, Spinner } from '../../common';

import {
    View, Text, FlatList, TouchableOpacity, TextInput
} from 'react-native';
import { ValidationComponent } from '../../../helper';

import {
    Header, Body, Container, Content, Icon, Card, Button
} from 'native-base';

class AddPost extends ValidationComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            postId: '',
            showToast: false,
            visible: false,
            toastBgColor: 'green',
            isSubmitted: false,
        }
    }

    /**
* @method checkValidation
* @description called to check validations
*/
    checkValidation = () => {
        /* Call ValidationComponent validate method */
        this.validate({
            title: {
                required: true,
            },
            content: {
                required: true,
            }
        });
        this.setState({ error: true });
    }

    /**
 * @method onInputValueChanged
 * @description called when input field value changes
 */
    onInputValueChanged = (key) => (value) => {
        this.changeValue(key, value);
    }

    /**
 * @method changeValue
 * @description called
 */
    changeValue = (key, value) => {
        const state = this.state;
        state[key] = value;
        this.setState(state, () => {
            if (this.state.isSubmitted) {
                this.checkValidation();
            }
        })
    }

    /**
     * @method updatePost
     * @description Function to update the post
     */
    updatePost = () => {
        const { title, content } = this.state;
        let requestParams = { title, content, status: 'publish' };

        this.setState({ isSubmitted: true });
        this.checkValidation();
        if (this.getErrorMessages()) {

        } else {
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
                }, 500);
            }
        })
    }
    }

    /**
     * @method hideToast
     * @description function to hide toast
     */
    hideToast = () => {
        setTimeout(() => this.setState({
            visible: false
        }), 500); /** hide toast after 2s */
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
                        <View>
                            <View style={styles.viewTitle}>
                                <TextInput
                                    style={styles.title}
                                    onChangeText={this.onInputValueChanged('title')}
                                    value={this.state.title}
                                    placeholder='Post Title'
                                    maxLength={50}
                                />
                                {this.isFieldInError('title') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('title')}</Text>}

                            </View>
                        </View>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.post}
                            onChangeText={this.onInputValueChanged('content')}
                            value={this.state.content}
                            placeholder='Post Content'
                        />
                        {this.isFieldInError('content') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('content')}</Text>}

                    </Card>
                    <Button
                        onPress={this.updatePost}
                        block
                        info
                        style={{ margin: 2 }}
                    >
                        <Text style={{ color: '#fff' }}>Add</Text>
                    </Button>

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