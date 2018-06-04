import React, { Component } from 'react';
import { View, TextInput, Button, AsyncStorage, Text, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { ValidationComponent } from '../../../helper';
import { HeaderComponent, ToastComponent } from '../../common'
import { loginUser } from '../../../actions/Auth';

class Login extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            isSubmitted: false,
            loading: false,
            showToast: false,
            visible: false,
            toastBgColor: 'green'
        }
    }

    /**
  * @method checkValidation
  * @description called to check validations
  */
    checkValidation = () => {
        /* Call ValidationComponent validate method */
        this.validate({
            name: {
                required: true,
                name: true,
            },
            password: {
                required: true,
            }
        });
        this.setState({ error: true });
    }

    /**
     * @method login
     * @description login takes user the app stack by setting isLoggedIn in AsncStorage
     */
    login = () => {
        const { name, password } = this.state
        this.setState({ isSubmitted: true });
        this.checkValidation();
        if (this.getErrorMessages()) {

        } else {
            this.setState({ loading: true })
            this.props.loginUser(name, password, (res) => {
                let status = res.status;
                this.setState({ loading: false })
                if (status != 200 && status != 204) {
                    if (status == undefined) {
                        this.setState({
                            visible: true, message: "Invalid username/password", toastBgColor: 'red'
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
                        visible: true, message: 'Success', toastBgColor: 'green'
                    })
                    AsyncStorage.setItem('userResponse', JSON.stringify(res.data));
                    this.props.navigation.navigate('AuthLoading');
                }
            })
        }
    }

    /**
     * @method register
     * @description navigate user to the Registration screen
     */
    register = () => {
        this.props.navigation.navigate('Register');
    }

    /**
     * @method onInputValueChanged
     * @description called when input field value changes
     */
    onInputValueChanged = (key) => (value) => {
        this.changeValue(key, value);
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
     * @description Renders component
     */
    render() {
        const { name, password, loading } = this.state
        return (
            <Container>
                <HeaderComponent
                    title='Login'
                />
                <ActivityIndicator animating={loading} />
                <View style={styles.m20}>
                    <TextInput
                        placeholder='Username'
                        value={name}
                        onChangeText={this.onInputValueChanged('name')}
                    />
                    {this.isFieldInError('name') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('name')}</Text>}

                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={this.onInputValueChanged('password')}
                    />
                    {this.isFieldInError('password') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('password')}</Text>}

                    <Button
                        title='Login'
                        onPress={this.login}
                    />
                    <View style={{ marginTop: 20 }} />
                    <Button
                        title='Register'
                        onPress={this.register}
                    />

                </View>
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
        loginUser: (name, password, callback) => dispatch(loginUser(name, password, callback)),
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
)(Login);