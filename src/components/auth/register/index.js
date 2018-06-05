/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Title, Button, Radio, ListItem, Picker, Content, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import { ValidationComponent } from '../../../helper';
import styles from '../../../assets/styles';
import { HeaderComponent, ToastComponent } from '../../common'
import { registerUser } from '../../../actions/Auth';

class Register extends ValidationComponent {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            error: false,
            password: "",
            isSubmitted: false,
            confirmpassword: "",
            loading: false,
            showToast: false,
            visible: false,
            toastBgColor: 'green'
        };
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
            username: {
                required: true,
                name: true,
                minlength: 3,
                maxlength: 7,
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                password: true,
            },
            confirmpassword: {
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
     * @method onValueChanged
     * @description called
     */
    onValueChanged = (key, value) => () => {
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
     * @method onPressRegisterButton
     * @description After pressing the register button
     */
    onPressRegisterButton = () => {
        const { username, email, password } = this.state;
        this.setState({ isSubmitted: true });
        this.checkValidation();
        if (this.getErrorMessages()) {

        } else {
            this.setState({ loading: true });
            this.props.registerUser(username, email, password, (res) => {
                console.log("res", res);
                let status = res.status;
                this.setState({ loading: false });
                if (status != 200 && status != 204) {
                    if (status == undefined) {
                        this.setState({
                            visible: true, message: "Wrong parameters", toastBgColor: 'red'
                        })
                    } else if (status == 404) {
                        this.setState({
                            visible: true, message: status, toastBgColor: 'red'
                        })
                    } else if (status == 401) {
                        this.setState({
                            visible: true, message: status, toastBgColor: 'red'
                        })
                    } else {
                        this.setState({
                            visible: true, message: "There is some error. Please try again later.", toastBgColor: 'red'
                        })
                    }
                } else {
                    this.setState({
                        visible: true, message: 'You are successfully registered!', toastBgColor: 'green'
                    })
                    AsyncStorage.setItem('userResponse', JSON.stringify(res.data));
                    this.props.navigation.navigate('PostListing')
                }
            });

        }
    }

    /**
     * @method render
     * @description Renders component
     */
    render() {
        return (
            <Container>
                <HeaderComponent
                    title='Register'
                    leftButton='back'
                />
                <Content style={styles.m20}>
                    <TextInput placeholder="Name" onChangeText={this.onInputValueChanged('username')} value={this.state.username} />
                    {this.isFieldInError('username') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('username')}</Text>}

                    <TextInput placeholder="Email" onChangeText={this.onInputValueChanged('email')} value={this.state.email} />
                    {this.isFieldInError('email') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('email')}</Text>}

                    <TextInput secureTextEntry placeholder="Password" onChangeText={this.onInputValueChanged('password')} value={this.state.password} />
                    {this.isFieldInError('password') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('password')}</Text>}

                    <TextInput secureTextEntry placeholder="Confirm Password" onChangeText={this.onInputValueChanged('confirmpassword')} value={this.state.confirmpassword} />
                    {this.isFieldInError('confirmpassword') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('confirmpassword')}</Text>}

                    {this.state.isSubmitted && !this.isFieldInError('confirmpassword') && this.state.password != this.state.confirmpassword && (
                        <Text style={styles.errorTextStyle}>Must be same as Password</Text>
                    )}
                    <Button success block style={{ marginTop: 20 }}
                        onPress={this.onPressRegisterButton}
                    >
                        <Text>Register</Text>
                    </Button>
                </Content>
                <ToastComponent
                    visible={this.state.visible}
                    backgroundColor={this.state.toastBgColor}
                    onShow={this.hideToast}
                    message={this.state.message}
                />
            </Container>
        );
    }
}


/**
* @method mapStateToProps
* @description return state to component as props
* @param {*} state
*/
function mapStateToProps(store) {
    return {

    }
}

/**
 * @method mapDispatchToProps
 * @description dispatch actions
* @param {*} dispatch
                        */
function mapDispatchToProps(dispatch) {
    return {
        registerUser: (name, email, password, callback) => dispatch(registerUser(name, email, password, callback)),
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
)(Register);