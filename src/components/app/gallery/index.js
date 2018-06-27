import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableNativeFeedback } from 'react-native';

import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, List, ListItem } from "native-base";
import styles from '../../../assets/styles';
import { HeaderComponent, ToastComponent, Spinner, Confirm } from '../../common';
import { fetchImagesFromAPI } from '../../../actions/Gallery';
import { ImageGallery } from '@nlabs/react-native-image-gallery';

class Gallery extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.fetchImagesFromAPI();
    }

    render() {
        const { images, fetchingAllImages } = this.props.images;
        let imageUrls = {};
        if (images) {
            imageUrls = images.map((img) => ({
                url: img._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url,
                id: img.id,
                // title: img.title.rendered,
                // description: img.content.rendered
            })
            );
        }
        return (
            <Container>
                <HeaderComponent
                    title='Gallery'
                    leftButton='menu'
                />
                <Content>
                    {imageUrls && (
                        <ImageGallery images={imageUrls} />
                    )}
                    {!imageUrls && (
                        <Text style={styles.noDataStyle}>No Record Found</Text>
                    )}
                </Content>
                {fetchingAllImages && (
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
    console.log(JSON.stringify(store.images));
    return {
        images: store.images
    }
}

/**
 * @method mapDispatchToProps
 * @description dispatch actions
* @param {*} dispatch
                        */
function mapDispatchToProps(dispatch) {
    return {
        fetchImagesFromAPI: () => dispatch(fetchImagesFromAPI()),
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
)(Gallery);
