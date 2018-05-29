import React, { Component } from 'react';
import Toast from 'react-native-root-toast';

class ToastComponent extends Component {

    render() {
        return (
            <Toast
                position={Toast.positions.BOTTOM}
                shadow={true}
                animation={true}
                hideOnPress={true}
                onShow={this.hideToast}
                {...this.props}
            >{this.props.message}</Toast>
        )
    }
}

export default ToastComponent;