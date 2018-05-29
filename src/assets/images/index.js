/**
 * Inside our images folder we are going to keep an file named index.js
 * Inside this file we are going to require the images and export as shown below
 * Wherever we require any of the images we can simply import it and use it without requiring anymore
 * for example: 
 * import { juice, shake } from '../path/to/assets/images'
 * <Image source={juice} />
 */

export const juice = require('./juice.jpg');
export const product = require('./product.jpg');
export const shake = require('./shake.jpg');