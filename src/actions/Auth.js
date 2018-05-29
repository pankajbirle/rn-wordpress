import axios from 'axios';
import {
    LOGIN_SUCCESS, LOGIN_FAILURE
} from '../constants';
import { API } from '../config';

/**
 * @method loginUser
 * @description get data from dummy api
 */
export function loginUser(username, password, callback) {
    return (dispatch) => {
        axios.post(API.login, {username, password})
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