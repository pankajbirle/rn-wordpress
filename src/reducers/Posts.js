import {
	FETCHING_POST, FETCHING_POST_SUCCESS,
	UPDATING_POST, UPDATING_POST_SUCCESS,
	GET_POST, GET_POST_SUCCESS, FAILURE, 
	DELETING_POST_SUCCESS
} from '../constants';

/** Always define initialState in reducer so that we don't get undefined values */
const initialState = {
	isFetching: false,
	error: false,
	posts: [],
	singlePost: []
}

/**
 * @method postsReducer
 * @description Takes previous state and returns the new state
 * @param {*} state 
 * @param {*} action 
 */
export default function postsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCHING_POST:
			return {
				...state,
				posts: [],
				isFetching: true
			}
		case FETCHING_POST_SUCCESS:
			return {
				...state,
				isFetching: false,
				posts: action.data
			}
		case GET_POST:
			return {
				...state,
				singlePost: [],
				isFetching: true
			}
		case GET_POST_SUCCESS:
			return {
				...state,
				isFetching: false,
				singlePost: action.data
			}
		case UPDATING_POST:
			return {
				...state,
				isFetching: true
			}
		case UPDATING_POST_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		case FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			}
		case DELETING_POST_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		default:
			return state
	}
}