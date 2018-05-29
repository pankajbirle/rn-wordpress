import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { getDataById, updateDataById } from '../../../actions/Posts';
import { HeaderComponent, ToastComponent } from '../../common';

import {
    View, Text, ActivityIndicator, FlatList, TouchableOpacity, TextInput, Button
} from 'react-native';

import {
    Header, Body, Container, Content, Icon, Card
} from 'native-base';

class EditPost extends Component {

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
        let requestParams = {
            "data": {
                "content": {
                    "rendered": this.state.content,
                }
            }
        }

        //  alert(JSON.stringify(requestParams));
        this.props.updateDataById(requestParams, res => {
            let status = res.response.data.data.status;
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
                this.props.navigation.navigate('PostListing');
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
        const isFetching = this.props.isFetching;
        return (
            <Container>
                <HeaderComponent
                    title='Edit Post'
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
                                />
                            </View>
                        </View>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.post}
                            onChangeText={(content) => this.setState({ content })}
                            value={this.state.content}
                        />
                        <ActivityIndicator
                            animating={isFetching} size="large"
                        />
                    </Card>
                    <Button
                        title='Update'
                        onPress={this.updatePost}
                    />
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
function mapStateToProps(state) {

    return {
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