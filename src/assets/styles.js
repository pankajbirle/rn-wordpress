/**
 * This is the one and only styles.js that will be maintained for the project
 * Any changes to related to the themes can be done here
 * We can define all the necessary variables like primaryColor, deviceHeight etc in this file
 * To make our style more clear, we can use module prefixes in style name.
 */

import { StyleSheet, Platform, Dimensions } from 'react-native';

var headerHeight = Platform.OS === 'ios' ? 108 : 100;
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height) - headerHeight;

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    textWrap: {
        margin: 20
    },
    para: {
        textAlign: 'center'
    },
    link: {
        textDecorationLine: 'underline',
        color: 'blue',
    },
    listSeparator: {
        height: 1,
        backgroundColor: 'blue',
        marginBottom: 10,
        marginTop: 10
    },
    myList: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        marginTop: 20,
    },
    myListHeader: {
        backgroundColor: 'grey',
        marginBottom: 10
    },
    headerText: {
        color: 'white',
        fontSize: 12,
        fontStyle: 'italic'
    },
    homeBody: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    flexOne: {
        flex: 1
    },
    m20: {
        margin: 20
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    errorTextStyle: {
        fontSize: 13,
        marginLeft: 3,
        color: 'red',
    },
    buttonText: {
        color: 'white'
    },
    confirmContainer: {
        flex: 1,
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#fa6a6d",
    },
    text: {
        color: '#fff',
        fontSize: 15
    },
    title: {
        fontSize: 16,
        color: '#f26568',
        fontFamily: 'Helvetica'
    },
    post: {
        fontSize: 14,
        fontFamily: 'Helvetica'
    },
    flexDirectionStyle: {
        flexDirection: 'row'
    },
    actionButtons: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    editIcon: {
        color: '#017F4B',
        fontSize: 20
    },
    deleteIcon: {
        color: '#F95534',
        fontSize: 20
    },
    viewTitle: {
        alignSelf: 'flex-start',
        flex: 1
    },
    contentStyle: {
        backgroundColor: '#e7e5e5'
    },
    cardStyle: {
        padding: 10
    }
})