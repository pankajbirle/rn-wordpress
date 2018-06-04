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
 * @method fetchImagesFromAPI
 * @description get data from dummy api
 */
export function fetchImagesFromAPI() {
    return (dispatch) => {
        dispatch(getImages());
        axios.get(`${API.gallery}?_embed`, { headers })
            .then((response) => {
                // alert(JSON.stringify(response))
                dispatch(getImagesSuccess(response.data))
                dispatch({ type: CONSTANTS.FETCHING_IMAGES_END })
            })
            .catch((error) => {
                dispatch(getImagesFailure(error))
                dispatch({ type: CONSTANTS.FETCHING_IMAGES_END })
            });
    }
}

/**
 * @method getImages
 * @description return object containing action type
 */
export function getImages() {
    return {
        type: CONSTANTS.GET_IMAGES
    }
}

/**
 * @method getImagesSuccess
 * @description return object containing action type
 */
export function getImagesSuccess(data) {
    return {
        type: CONSTANTS.FETCHING_IMAGES_SUCCESS,
        data,
    }
}

/**
 * @method getImagesFailure
 * @description return object containing action type
 */
export function getImagesFailure() {
    return {
        type: CONSTANTS.FETCHING_IMAGES_FAILURE
    }
}