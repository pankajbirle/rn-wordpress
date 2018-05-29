import axios from 'axios'
import { FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE } from '../constants'
import { API } from '../config'

/**
 * @method fetchPeopleFromAPI
 * @description get data from dummy api
 */
export function fetchPeopleFromAPI() {
    return (dispatch) => {
        dispatch(getPeople())
        axios.get(API.getPeople)
            .then((response) => {
                dispatch(getPeopleSuccess(response.data.results))
            })
            .catch((error) => {
                dispatch(getPeopleSuccess(json.results))
            });
    }
}

/**
 * @method getPeople
 * @description return object containing action type
 */
export function getPeople() {
    return {
        type: FETCHING_PEOPLE
    }
}

/**
 * @method getPeopleSuccess
 * @description return object containing action type
 */
export function getPeopleSuccess(data) {
    return {
        type: FETCHING_PEOPLE_SUCCESS,
        data,
    }
}
/**
 * @method getPeopleFailure
 * @description return object containing action type
 */
export function getPeopleFailure() {
    return {
        type: FETCHING_PEOPLE_FAILURE
    }
}