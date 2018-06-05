import { combineReducers } from 'redux';
import people from './People';
import posts from './Posts';
import auth from './Auth';
import images from './Gallery';
import pages from './Pages';
import services from './Services';

/** Combine all the reducers and export */
const rootReducer = combineReducers({
    people,
    posts,
    auth,
    images,
    pages,
    services
})

export default rootReducer;