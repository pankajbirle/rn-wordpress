import {
	FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE,
} from '../constants';

/** Always define initialState in reducer so that we don't get undefined values */
const initialState = {
	people: [],
	isFetching: false,
	error: false,
}

/**
 * @method peopleReducer
 * @description Takes previous state and returns the new state
 * @param {*} state 
 * @param {*} action 
 */
export default function peopleReducer(state = initialState, action) {

	switch (action.type) {
		case FETCHING_PEOPLE:
			return {
				...state,
				people: [],
				isFetching: true
			}
		case FETCHING_PEOPLE_SUCCESS:
			return {
				...state,
				isFetching: false,
				people: action.data
			}
		case FETCHING_PEOPLE_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			}
		default:
			return state
	}
}