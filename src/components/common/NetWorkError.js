import React from 'react';
import { View, Image } from 'react-native';
import { Content, CardItem, Text, Container, Form, Card } from 'native-base';

const NetWorkError = ({ message = 'No Internet Connection', subMessage= "Please Check your Internet Settings" }) => {
    return (
        <Container style={styles.containerBackgroundColor} >
            <Content bounces={false}>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerText}>Wordpress React Native App</Text>
                    <Image source={{ uri: 'data:image/png;base64,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' }}
                        style={styles.logoStyle}
                    ></Image>
                </View>
                <Form>
                    <Card style={{ margin: 15 }}>
                        <CardItem header style={styles.headerStyle}>
                            <Text style={styles.textStyle}>{message}</Text>
                        </CardItem>
                        <CardItem style={styles.headerStyle}>
                            <Text note>{subMessage}
                                </Text>
                        </CardItem>
                    </Card>
                </Form>
            </Content>
        </Container>
    );
}

const styles = {
    containerBackgroundColor: {
        backgroundColor: '#fbfbfe',
    },
    headerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    headerText: {
        color: '#fa6a6d',
        fontSize: 18,
        marginTop: 10,
    },
    logoStyle: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 30
    },
    loginTextStyle: {
        fontSize: 15,
        marginTop: 30,
    },
    textStyle: {
        color: 'black',
    }
}

export { NetWorkError };
