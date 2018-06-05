import * as CONSTANTS from '../constants';

/** Always define initialState in reducer so that we don't get undefined values */
const initialState = {
	isFetching: false,
	error: false,
	services: null,
	fetchingAllServices: false,
}

/**
 * @method servicesReducer
 * @description Takes previous state and returns the new state
 * @param {*} state 
 * @param {*} action 
 */
export default function servicesReducer(state = initialState, action) {
	switch (action.type) {
		case CONSTANTS.FETCHING_SERVICE:
			return {
				...state,
				services: null,
				fetchingAllServices: true
			}
		case CONSTANTS.FETCHING_SERVICE_SUCCESS:
			return {
				...state,
				services: action.data
			}
		case CONSTANTS.FETCHING_SERVICE_END:
			return {
				...state,
				fetchingAllServices: false,
			}
		case CONSTANTS.FETCHING_SERVICE_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			}
		default:
			return state
	}
}