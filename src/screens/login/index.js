import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Button } from "react-native"
import { LOGIN_BTN, BACKGROUND_COLOR, color_BLACK, color_white } from "../../../rec/drawables"
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const LoginClass = (props) => {
    const auth = getAuth();
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    useEffect(() => {
    }, []);
    const onLoginPressed = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                props.navigation.navigate("MAIN")

            } catch (error) {
                alert(error.message)
            }
        } else {
            alert('Enter email and password')

        }
    }
    const onForgetPasswordPressed = () => {
        if (email) {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Password send to your email')
                })
                .catch((error) => {
                    const errorMessage = error.message;
                });
        } else {
            alert('Enter email')
        }

    }
    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" >
                <View style={styles.logo}>
                    <Image style={{ height: 350, width: 500  }}
                        source={require('../../../assets/logo.png')}
                    />
                </View>
                <View style={{ ...styles.card, height: '8%' }}>
                    <TextInput
                        style={{ margin: 10 }}
                        autoFocus={true}
                        placeholder={'Enter Email'}
                        value={email}
                        autoCapitalize='none'
                        onChangeText={(t) => setEmail(t)}
                    />

                </View >
                <View style={{ ...styles.card, height: '8%' }}>
                    <TextInput
                        style={{ margin: 10 }}
                        value={password}
                        secureTextEntry={true}
                        placeholder={'Enter Password'}
                        onChangeText={(t) => setPassword(t)}
                    />
                </View>
                <TouchableOpacity onPress={() => onLoginPressed()} >
                    <View style={{ margin: 20 }}>
                        <Image
                            style={styles.BTN}
                            source={LOGIN_BTN}
                        />
                        <Text style={styles.textStyle}>Login</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <View><Button title="Forget Password" onPress={() => onForgetPasswordPressed()} /></View>
                    <View><Text>|</Text></View>
                    <View><Button title="Register Now" onPress={() => props.navigation.navigate("SIGNUP")} /></View>
                </View>


            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: Platform.OS === 'android' ? 30 : 2
    }, card: {
        backgroundColor: color_white,
        borderRadius: 20,
        margin: 10,
        shadowColor: '#781E77',
        borderColor: color_BLACK,
        borderWidth: 0.5,
        elevation: 10,
        // add shadows for iOS only
        shadowColor: 'black',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 0.4
    }, textStyle: {
        alignSelf: "center",
        fontWeight: "bold",
        width: 80,
        textAlign: 'center',
        color: '#781E77',
        //textAlign: 'center',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 6, height: 2 },
        shadowOpacity: 0.2
    }, BTN: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 0.4,

    }, logo: {
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 8, height: 7 },
        shadowOpacity: 0.4,

    }

})
export default LoginClass;