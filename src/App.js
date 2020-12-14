import React, { Component } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/loginForm';


class App1 extends Component {
    state = { loggedIn: null };

    UNSAFE_componentWillMount() {
        firebase.initializeApp(
            {
                apiKey: 'AIzaSyAVUJcTYgHbwX5jEeL5-n0-brfy2ja6T5w',
                authDomain: 'auth-aa7d8.firebaseapp.com',
                databaseURL: 'https://auth-aa7d8.firebaseio.com',
                projectId: 'auth-aa7d8',
                storageBucket: 'auth-aa7d8.appspot.com',
                messagingSenderId: '652344270245',
                appId: '1:652344270245:web:75bd1adae80dd3f27b9c4c',
                measurementId: 'G-6NQD2NVWML'
            });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            }
            else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
            return(
                <Card>
                <CardSection>
             <Button  
             onPress={() => firebase.auth().signOut()} >
                 Log Out</Button>
                </CardSection>
                 </Card>
            );
            case false: 
               return <LoginForm />;
            
               default:
                //return <Spinner  size="Large"/>;
               return<Text>Loading!!</Text>
                 
        }
}

    render() {
        return (
            <View>
                <Header headerText="Authenticaton" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ButttonStyle:{
        paddingTop: 100,
        marginTop:100
    }
})

export default App1;
