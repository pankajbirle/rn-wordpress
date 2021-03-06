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
var actualDeviceHeight = (Dimensions.get('window').height)

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
        fontFamily: 'Helvetica'
    },
    listItemTitle: {
        fontSize: 16,
        fontFamily: 'Helvetica',
        color: '#f26568'
    },
    post: {
        fontSize: 16,
        fontFamily: 'Helvetica'
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        // alignItems: 'flex-start'
    },
    actionButtons: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    postActionButtonWrap: {
        alignSelf: 'flex-end',
        paddingRight: 3,
        marginTop: 5
    },
    editIcon: {
        color: '#017F4B',
        fontSize: 20
    },
    deleteIcon: {
        color: '#F95534',
        fontSize: 20
    },
    viewIcon: {
        color: '#000',
        fontSize: 20
    },
    viewTitle: {
        // alignSelf: 'flex-start',
        // flex: 1
    },
    contentStyle: {
        backgroundColor: '#e7e5e5',
        paddingLeft: 5,
        paddingRight: 5
    },
    cardStyle: {
        padding: 10,
    },
    loaderWrap: {
        position: 'absolute',
        width: deviceWidth,
        height: actualDeviceHeight,
        zIndex: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        top: 0,
        justifyContent: 'center'
    },
    loader: {
        // position: 'absolute',
        alignSelf: 'center',
        zIndex: 999
    },
    headerPostButton: {
        color: '#fff'
    },
    author: {
        fontSize: 12,
        marginTop: 4
    },
    webView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: deviceHeight,
        marginTop: 10
    },
    imageStyle: {
        height: 200,
        width: null,
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    activeTextStyle: {
        color: '#000',
        fontWeight: 'normal',
    },
    activeTabStyle: {
        backgroundColor: 'white',
    },
    activeTextStyle: {
        color: '#1f66d1',
        fontWeight: 'bold',
    },
    tabStyle: {
        backgroundColor: 'white',
        justifyContent: 'center',
        fontWeight: 'normal',
    },
    textStyle: {
        color: '#fa6a6d'
    },
    noDataStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 15,
        color: "#5A606C"
    },
})