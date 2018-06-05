import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../assets/styles';
import { fetchPagesFromAPI } from '../../../actions/Pages';
import { HeaderComponent, ToastComponent, Spinner, Confirm } from '../../common';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Alert,
    WebView
} from 'react-native';
import {
    Header, Body, Container, Content, Icon, Card, Footer, Button, CardItem, Left, Right
} from 'native-base';

class Pages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            visible: false,
            toastBgColor: 'green',
            url: ''
        }
    }

    /**
     * @method componentDidMount
     * @description Code some necessary actions to be taken as soon as component mounts
     */
    componentDidMount() {
        /** Action method called to load the api as soon as the component is mounted */
        this.props.fetchPagesFromAPI();
    }

    onPagePress(link) {
        this.setState({
            url: link
        });
    }

    pagesList(pages) {

        return pages.map((res) => {
            return (
                <View>
                    <Text onPress={() => this.onPagePress(res.link)}>{res.title.rendered}</Text>
                </View>
            )
        })

    }

    /**
     * @method render
     * @description Renders the component
     */
    render() {
        const { pages, fetchingAllPages } = this.props.pages;
        return (
            <Container>
                <HeaderComponent
                    title='Pages'
                    leftButton='menu'
                />
                <Content style={styles.contentStyle}>
                    {pages && this.pagesList(pages)}
                    {this.state.url != '' && (
                        <WebView
                            style={styles.webView}
                            source={{ uri: this.state.url }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true} />
                    )}
                </Content>
                {fetchingAllPages && (
                    <Spinner />
                )}
            </Container>
        )
    }
}

/**
* @method mapStateToProps
* @description return state to component as props
* @param {*} state
*/
function mapStateToProps(store) {
    return {
        pages: store.pages
    }
}

/**
 * @method mapDispatchToProps
 * @description dispatch actions
* @param {*} dispatch
                        */
function mapDispatchToProps(dispatch) {
    return {
        fetchPagesFromAPI: () => dispatch(fetchPagesFromAPI()),
    }
}

/**
 * @method connect
 * @description connect with redux
* @param {function} mapStateToProps
* @param {function} mapDispatchToProps
                        */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pages);