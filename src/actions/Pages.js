import axios from 'axios';
import { AsyncStorage } from 'react-native';

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
 * @method fetchPagesFromAPI
 * @description get data from dummy api
 */
export function fetchPagesFromAPI() {
    return (dispatch) => {
        dispatch(getPages());
        axios.get(`${API.pages}`, { headers })
            .then((response) => {
                // alert(JSON.stringify(response))
                dispatch(getPagesSuccess(response.data))
                dispatch({ type: CONSTANTS.FETCHING_PAGES_END })
            })
            .catch((error) => {
                dispatch(getPagesFailure(error))
                dispatch({ type: CONSTANTS.FETCHING_PAGES_END })
            });
    }
}

/**
 * @method getPages
 * @description return object containing action type
 */
export function getPages() {
    return {
        type: CONSTANTS.GET_PAGES
    }
}

/**
 * @method getPagesSuccess
 * @description return object containing action type
 */
export function getPagesSuccess(data) {
    return {
        type: CONSTANTS.FETCHING_PAGES_SUCCESS,
        data,
    }
}

/**
 * @method getPagesFailure
 * @description return object containing action type
 */
export function getPagesFailure() {
    return {
        type: CONSTANTS.FETCHING_PAGES_FAILURE
    }
}