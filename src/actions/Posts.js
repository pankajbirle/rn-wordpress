import axios from 'axios';
import { AsyncStorage } from 'react-native'

var headers = {
    'Content-Type': 'application/json',
}

AsyncStorage.getItem('userResponse')
    .then((value) => {
        if (value != null) {
            value = JSON.parse(value)
            headers['Authorization'] = 'Bearer ' + value.token
        }
    })


import {
    FETCHING_POST, FETCHING_POST_SUCCESS,
    UPDATING_POST, UPDATING_POST_SUCCESS,
    GET_POST, GET_POST_SUCCESS, FAILURE,
    DELETING_POST_SUCCESS
} from '../constants';
import { API } from '../config';

/**
 * @method fetchPostsFromAPI
 * @description get data from dummy api
 */
export function fetchPostsFromAPI() {
    return (dispatch) => {
        dispatch(getPost())
        axios.get(API.getPost, { headers })
            .then((response) => {
                dispatch(getPostSuccess(response.data))
            })
            .catch((error) => {
                dispatch(getFailure(error))
            });
    }
}

/**
 * @method getPost
 * @description return object containing action type
 */
export function getPost() {
    return {
        type: FETCHING_POST
    }
}

/**
 * @method getPostSuccess
 * @description return object containing action type
 */
export function getPostSuccess(data) {
    return {
        type: FETCHING_POST_SUCCESS,
        data,
    }
}

/**
 * @method getDataById
 * @description get data from dummy api
 */
export function getDataById(id, callback) {
    return (dispatch) => {
        dispatch(getSinglePost())
        axios.get(`${API.getPost}/${id}`)
            .then((response) => {
                callback(response);
                dispatch(getSinglePostSuccess(response.data))
            })
            .catch((error) => {
                callback(error);
                dispatch(getFailure(error))
            });
    }
}

/**
 * @method getSinglePost
 * @description return object containing action type
 */
export function getSinglePost() {
    return {
        type: GET_POST
    }
}

/**
 * @method getSinglePostSuccess
 * @description return object containing action type
 */
export function getSinglePostSuccess(data) {
    return {
        type: GET_POST_SUCCESS,
        data,
    }
}

/**
 * @method updateDataById
 * @description post data from dummy api
 */
export function updateDataById(id, callback) {
    return (dispatch) => {
        axios.put(`${API.getPost}/${id}`, { headers })
            .then((response) => {
                alert(JSON.stringify(response))
                callback(response);
                dispatch(getUpdatePostSuccess(response.data))
            })
            .catch((error) => {
                callback(error);
                dispatch(getFailure(error.response.status))
            });
    }
}

/**
 * @method getUpdatePostSuccess
 * @description return object containing action type
 */
export function getUpdatePostSuccess(data) {
    return {
        type: UPDATING_POST_SUCCESS,
        data,
    }
}

/**
 * @method deleteDataById
 * @description delete data from dummy api
 */
export function deleteDataById(id, callback) {
    return (dispatch) => {
        axios.delete(`${API.getPost}/${id}`)
            .then((response) => {
                callback(response);
                dispatch(getDeletePostSuccess(response.data))
            })
            .catch((error) => {
                callback(error);
                dispatch(getFailure(error))
            });
    }
}

/**
 * @method getDeletePostSuccess
 * @description return object containing action type
 */
export function getDeletePostSuccess(data) {
    return {
        type: DELETING_POST_SUCCESS,
        data,
    }
}

/**
 * @method getFailure
 * @description return object containing action type
 */
export function getFailure() {
    return {
        type: FAILURE
    }
}