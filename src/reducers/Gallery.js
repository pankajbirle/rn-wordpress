import * as CONSTANTS from '../constants';

/** Always define initialState in reducer so that we don't get undefined values */
const initialState = {
	error: false,
	images: null,
	fetchingAllImages: false,
}

/**
 * @method imagesReducer
 * @description Takes previous state and returns the new state
 * @param {*} state 
 * @param {*} action
 */
export default function imagesReducer(state = initialState, action) {
	switch (action.type) {
		case CONSTANTS.GET_IMAGES:
			return {
				...state,
				images: null,
				fetchingAllImages: true
			}
		case CONSTANTS.FETCHING_IMAGES_SUCCESS:
			return {
				...state,
				images: action.data,
			}
		case CONSTANTS.FETCHING_IMAGES_END:
			return {
				...state,
				fetchingAllImages: false,
			}

		case CONSTANTS.FETCHING_IMAGES_FAILURE:
			return {
				...state,
				fetchingAllImages: false,
				error: true
			}
		default:
			return state
	}
}