import React, { Component } from 'react';
import { View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from '../../assets/styles';

class Confirm extends Component {

    render() {
        return (
            <AwesomeAlert
                showProgress={false}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                confirmButtonColor="#67a9ef"
                cancelButtonColor="#919ba7"
                {...this.props}
            />
        )
    }
}

export default Confirm;