import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base'
import { withNavigation } from 'react-navigation';
import styles from '../../assets/styles'

/**
 * This is the common header component that we are going to use
 * It uses Native base header internally and thus you can pass all the props Native Base Header supports
 * 
 * To pass Native base header props
 * <HeaderComponent
 *     headerProps={{
 *          span: true,
 *          noShadow: true
 *     }}
 * />
 * 
 * Other props
 * 
 * leftButton: back | menu | custom
 * if leftButton is custom use renderLeftComponent prop to provide it a custom component
 * example
 * <HeaderComponent
 *     renderLeftComponent={() => (
 *         <Text onPress={this.myCustomPressFunction}>ABCD</Text>
 *     )}
 * />
 * 
 * title: string
 * renderRightComponent: custom component to be rendered at the right of header(same as renderLeftComponent)
 */

class HeaderComponent extends Component {

    render() {
        const props = this.props;
        return (
            <Header {...props.headerProps}>
                <Left style={styles.flexOne}>
                    {props.leftButton == 'menu' && (
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    )}
                    {props.leftButton == 'back' && (
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    )}
                    {props.leftButton == 'custom' && props.renderLeftComponent && (
                        props.renderLeftComponent()
                    )}
                </Left>
                <Body style={styles.homeBody}>
                    <Title>{props.title}</Title>
                </Body>
                <Right style={styles.flexOne}>
                    {props.renderRightComponent && (
                        props.renderRightComponent()
                    )}
                </Right>
            </Header>
        )
    }
}

HeaderComponent.propTypes = {
    title: PropTypes.string.isRequired,
    leftButton: PropTypes.string
}

export default withNavigation(HeaderComponent)