import * as CONSTANTS from '../constants';

/** Always define initialState in reducer so that we don't get undefined values */
const initialState = {
	error: false,
	pages: null,
	fetchingAllPages: false,
}

/**
 * @method pagesReducer
 * @description Takes previous state and returns the new state
 * @param {*} state 
 * @param {*} action
 */
export default function pagesReducer(state = initialState, action) {
	switch (action.type) {
		case CONSTANTS.GET_PAGES:
			return {
				...state,
				pages: null,
				fetchingAllPages: true
			}
		case CONSTANTS.FETCHING_PAGES_SUCCESS:
			return {
				...state,
				pages: action.data,
			}
		case CONSTANTS.FETCHING_PAGES_END:
			return {
				...state,
				fetchingAllPages: false,
			}

		case CONSTANTS.FETCHING_PAGES_FAILURE:
			return {
				...state,
				fetchingAllPages: false,
				error: true
			}
		default:
			return state
	}
}