import {
	FETCHING_POST, FETCHING_POST_SUCCESS,
	UPDATING_POST, UPDATING_POST_SUCCESS,
	GET_POST, GET_POST_SUCCESS, FAILURE,
	DELETING_POST_SUCCESS,
	DELETE_START, DELETE_END, FETCHING_POST_END, POST_EDIT_BEGIN, POST_EDIT_END, ADDING_POST_START, ADDING_POST_END
} from '../constants';

/** Always define initialState in reducer so that we don't get undefined values */
const initialState = {
	isFetching: false,
	error: false,
	posts: null,
	singlePost: [],
	fetchingAllPosts: false,
	isDeleting: false,
	isEditing: false,
	isAdding: false
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
				posts: null,
				fetchingAllPosts: true
			}
		case FETCHING_POST_SUCCESS:
			return {
				...state,
				posts: action.data
			}
		case FETCHING_POST_END:
			return {
				...state,
				fetchingAllPosts: false,
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
		case POST_EDIT_BEGIN:
			return {
				...state,
				isEditing: true
			}
		case POST_EDIT_END:
			return {
				...state,
				isEditing: false
			}
		case UPDATING_POST_SUCCESS:
			return {
				...state,
				isEditing: false,
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
				isDeleting: false
			}
		case DELETE_START:
			return {
				...state,
				isDeleting: true
			}
		case DELETE_END:
			return {
				...state,
				isDeleting: false
			}

		case ADDING_POST_START:
			return {
				...state,
				isAdding: true
			}
		case ADDING_POST_END:
			return {
				...state,
				isAdding: false
			}
		default:
			return state
	}
}