import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false })
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button
                onPress={this.onButtonPress.bind(this)}>
                Login Form
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={{ height: 20, width: 100 }}></Input>
                </CardSection>

                <CardSection >
                    <Input
                        placeholder="password"
                        label="Password"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        style={{ height: 20, width: 100 }}
                    >
                    </Input>
                </CardSection>

                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
                <CardSection >
                    {this.renderButton()}
                </CardSection>


            </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
})

export default LoginForm;