import {
	LOGIN_SUCCESS, LOGIN_FAILURE, 
} from '../constants';

/** Always define initialState in reducer so that we don't get undefined values */
const initialState = {
	error: false,
}

/**
 * @method postsReducer
 * @description Takes previous state and returns the new state
 * @param {*} state 
 * @param {*} action 
 */
export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isFetching: true
			}
		case LOGIN_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			}
		default:
			return state
	}
}