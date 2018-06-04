/**
 * Inside this file we define all the necessary configurations
 * Like the base url and endpoints, file configuration, etc
 * Export the required settings and import them wherever required
 */

/** Define base url only once and use it everywhere */
const BASE_URL = 'https://swapi.co/api';
const BASE_URL_WP = 'http://183.182.84.84/restapi/wp-json/wp/v2';
const BASE_URL_WP_NEW = 'http://183.182.84.84/restapi/wp-json';

/** Export API */
export const API = {
    getPeople: `${BASE_URL}/people/`, /** Define even the endpoints */
    uploadFile: 'http://183.182.84.29/MahycoApi/ImageUpload',
    getPost: `${BASE_URL_WP}/posts`,
    login: `${BASE_URL_WP_NEW}/jwt-auth/v1/token`,
    register : `${BASE_URL_WP}/users/register`,
    gallery : `${BASE_URL_WP}/gallery`,
    pages : `${BASE_URL_WP}/pages`,
}

/** Export FILE_CONFIG */
export const FILE_CONFIG = {
    MAX_NUMBER_OF_FILES: 5,
    MAX_FILE_SIZE: 1024 /** In KBs */
}