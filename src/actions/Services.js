import axios from 'axios';
import { AsyncStorage } from 'react-native'

var headers = {
    'Content-Type': 'application/json',
}

AsyncStorage.getItem('userResponse')
    .then((value) => {
        if (value != null) {
            value = JSON.parse(value)
            headers['authorization'] = 'Bearer ' + value.token
        }
    })

import * as CONSTANTS from '../constants';
import { API } from '../config';

/**
 * @method fetchServicesFromAPI
 * @description get data from dummy api
 */
export function fetchServicesFromAPI() {
    return (dispatch) => {
        dispatch(getService());
        axios.get(`${API.services}?_embed`, { headers })
            .then((response) => {
                // alert(JSON.stringify(response))
                dispatch(getServiceSuccess(response.data))
                dispatch({ type: CONSTANTS.FETCHING_SERVICE_END })
            })
            .catch((error) => {
                dispatch(getFailure(error))
                dispatch({ type: CONSTANTS.FETCHING_SERVICE_END })
            });
    }
}

/**
 * @method getService
 * @description return object containing action type
 */
export function getService() {
    return {
        type: CONSTANTS.FETCHING_SERVICE
    }
}

/**
 * @method getServiceSuccess
 * @description return object containing action type
 */
export function getServiceSuccess(data) {
    return {
        type: CONSTANTS.FETCHING_SERVICE_SUCCESS,
        data,
    }
}

/**
 * @method getFailure
 * @description return object containing action type
 */
export function getFailure() {
    return {
        type: CONSTANTS.FETCHING_SERVICE_FAILURE
    }
}