import { combineReducers } from 'redux';
import people from './People';
import posts from './Posts';
import auth from './Auth';
/** Combine all the reducers and export */
const rootReducer = combineReducers({
    people,
    posts,
    auth
})

export default rootReducer;