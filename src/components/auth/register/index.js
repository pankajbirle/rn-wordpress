/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Title, Button, Radio, ListItem, Picker, Content, CheckBox } from 'native-base';
import { ValidationComponent } from '../../../helper';
import { HeaderComponent } from '../../common'
import styles from '../../../assets/styles'

export default class Register extends ValidationComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            number: "",
            error: false,
            password: "",
            gender: "",
            language: "",
            checked: false,
            isSubmitted: false
        };
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
                minlength: 3,
                maxlength: 7,
            },
            email: {
                required: true,
                email: true,
            },
            number: {
                required: true,
                numbers: true,
                minlength: 10,
                maxlength: 10,
            },
            password: {
                required: true,
                password: true,
            },
            gender: {
                required: true
            },
            language: {
                required: true
            },
            checked: {
                checkRequired: true
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
        this.setState({ isSubmitted: true });
        this.checkValidation();
        if (this.getErrorMessages()) {

        } else {
            alert("You are successfully registered!");
            AsyncStorage.setItem('isLoggedIn', 'true')
            this.props.navigation.navigate('AuthLoading')
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
                    <TextInput placeholder="Name" onChangeText={this.onInputValueChanged('name')} value={this.state.name} />
                    {this.isFieldInError('name') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('name')}</Text>}

                    <TextInput placeholder="Email" onChangeText={this.onInputValueChanged('email')} value={this.state.email} />
                    {this.isFieldInError('email') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('email')}</Text>}

                    <TextInput placeholder="Phone Number" onChangeText={this.onInputValueChanged('number')} value={this.state.number} />
                    {this.isFieldInError('number') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('number')}</Text>}

                    <TextInput secureTextEntry placeholder="Password" onChangeText={this.onInputValueChanged('password')} value={this.state.password} />
                    {this.isFieldInError('password') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('password')}</Text>}

                    <Text>Gender:</Text>
                    <ListItem>
                        <Text>Male</Text>
                        <Right>
                            <Radio onPress={this.onValueChanged('gender', 'male')}
                                selected={this.state.gender == "male"} />
                        </Right>
                    </ListItem>

                    <ListItem>
                        <Text>Female</Text>
                        <Right>
                            <Radio onPress={this.onValueChanged('gender', 'female')}
                                selected={this.state.gender == "female"} />
                        </Right>
                    </ListItem>
                    {this.isFieldInError('gender') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('gender')}</Text>}

                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 100 }}
                        onValueChange={this.onInputValueChanged('language')}>
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>

                    {this.isFieldInError('language') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('language')}</Text>}

                    <ListItem>
                        <CheckBox checked={this.state.checked}
                            onPress={this.onValueChanged('checked', !this.state.checked)} />
                        <Body>
                            <Text> Terms & Conditions</Text>
                        </Body>
                    </ListItem>

                    {this.isFieldInError('checked') && <Text style={styles.errorTextStyle}>{this.getErrorsInField('checked')}</Text>}

                    <Button success block style={{ marginTop: 20 }}
                        onPress={this.onPressRegisterButton}
                    >
                        <Text>Register</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}