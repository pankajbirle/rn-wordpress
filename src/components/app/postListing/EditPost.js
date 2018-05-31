import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { getDataById, updateDataById } from '../../../actions/Posts';
import { HeaderComponent, ToastComponent, Spinner } from '../../common';
import { ValidationComponent } from '../../../helper';

import {
    View, Text, FlatList, TouchableOpacity, TextInput
} from 'react-native';

import {
    Header, Body, Container, Content, Icon, Card, Button
} from 'native-base';

class EditPost extends ValidationComponent {

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
     * @method componentDidMount
     * @description Code some necessary actions to be taken as soon as component mounts
     */
    componentDidMount() {
        /** Action method called to load the api as soon as the component is mounted */

        const { navigation } = this.props;
        const postId = navigation.getParam('postId', 'NO-ID');

        this.props.getDataById(postId, res => {
            console.log(JSON.stringify(res));
            if (res.status != 200 && res.status != 204) {
                if (res.status == 404) {
                    this.setState({
                        visible: true, message: 'There is some server error', toastBgColor: 'red'
                    })
                } else if (res.status == 401) {
                    this.setState({
                        visible: true, message: 'Unauthorized Access', toastBgColor: 'red'
                    })
                }
            } else {
                this.setState({ postId: postId, title: res.data.title.rendered, content: res.data.content.rendered });
            }
        })
    }

    /**
     * @method updatePost
     * @description Function to update the post
     */
    updatePost = () => {
        const { title, content, postId } = this.state;
        let requestParams = { title, content, id: postId };

        this.setState({ isSubmitted: true });
        this.checkValidation();
        if (this.getErrorMessages()) {

        } else {

            //  alert(JSON.stringify(requestParams));
            this.props.updateDataById(requestParams, res => {
                let status = res.status;
                if (status != 200 && status != 204) {
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
                        visible: true, message: "This post has been updated successfully", toastBgColor: 'green'
                    })
                    setTimeout(() => {
                        this.props.navigation.navigate('PostListing');
                    }, 2000);
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
        }), 2000); /** hide toast after 2s */
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
     * @method render
     * @description Renders the component
     */
    render() {
        const { isEditing, isFetching } = this.props.postReducer
        return (
            <Container>
                <HeaderComponent
                    title='Edit Post'
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
                        />
                        {this.isFieldInError('content') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('content')}</Text>}
                    </Card>
                    <Button
                        onPress={this.updatePost}
                        block
                        info
                        style={{ margin: 2 }}
                    >
                        <Text style={{ color: '#fff' }}>Update</Text>
                    </Button>
                    <ToastComponent
                        visible={this.state.visible}
                        backgroundColor={this.state.toastBgColor}
                        onShow={this.hideToast}
                        message={this.state.message}
                    />
                </Content>
                {
                    isFetching || isEditing && (
                        <Spinner />
                    )
                }
            </Container >
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
        isFetching: state.posts.isFetching,
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
        getDataById: (id, callback) => dispatch(getDataById(id, callback)),
        updateDataById: (id, callback) => dispatch(updateDataById(id, callback))
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
)(EditPost);