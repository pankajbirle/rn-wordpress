/**
 * Do not modify the code inside this file until or unless required
 */

import { createStore, applyMiddleware } from 'redux'
import app from './reducers'
import thunk from 'redux-thunk'

/**
 * @method configureStore
 * @description Create store and return it
 */
export default function configureStore() {
  let store = createStore(app, applyMiddleware(thunk))
  return store
}