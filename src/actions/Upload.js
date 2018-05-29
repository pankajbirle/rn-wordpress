import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import { FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE } from '../constants';
import { API } from '../config';

/**
 * @method uploadFile
 * @description upload file to the server
 */
export function uploadFile(file, callback) {
    return (dispatch) => {
        RNFetchBlob.fetch('POST', API.uploadFile, {
            'Content-Type': 'multipart/form-data',
        }, [
                { name: 'File', filename: file.fileName, data: RNFetchBlob.wrap(file.uri) },
            ]).then((res) => {
                callback(res);
            }).catch((err) => {
                callback('error');
            })
    }
}