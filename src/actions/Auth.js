import axios from 'axios';
import {
    LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE
} from '../constants';
import { API } from '../config';

var headers = {
    'Content-Type': 'application/json',
}

/**
 * @method loginUser
 * @description get data from dummy api
 */
export function loginUser(username, password, callback) {
    return (dispatch) => {
        axios.post(API.login, { username, password }, { headers })
            .then((response) => {
                callback(response)
                dispatch(getLoginSuccess(response))
            })
            .catch((error) => {
                callback(error)
                dispatch(getFailure(error))
            });
    }
}

/**
 * @method getLoginSuccess
 * @description return object containing action type
 */
export function getLoginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data,
    }
}

/**
 * @method getFailure
 * @description return object containing action type
 */
export function getFailure() {
    return {
        type: LOGIN_FAILURE
    }
}

/**
 * @method registerUser
 * @description get data from dummy api
 */
export function registerUser(username, email, password, callback) {
    return (dispatch) => {
        axios.post(API.register, { username, email, password }, { headers })
            .then((response) => {
                callback(response);
                dispatch(getRegisterSuccess(response));
            })
            .catch((error) => {
                callback(error);
                dispatch(getRegisterFailure(error));
            });
    }
}

/**
 * @method getRegisterSuccess
 * @description return object containing action type
 */
export function getRegisterSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        data,
    }
}

/**
 * @method getRegisterFailure
 * @description return object containing action type
 */
export function getRegisterFailure() {
    return {
        type: REGISTER_FAILURE
    }
}