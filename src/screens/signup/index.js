import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView, Button, Alert } from "react-native"
import { SIGNUP_BTN, BACKGROUND_COLOR, color_BLACK, color_white } from "../../../rec/drawables"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import app from '../../../api/index'

const SIGNUP = (props) => {
    const db = getFirestore(app);
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordAgain, setPasswordAgain] = useState(null)
    const onSignupPressed = async () => {
        const auth = getAuth();
        if ((email && password && passwordAgain) != null) {
            if (password == passwordAgain) {
                try {
                    const docRef = await addDoc(collection(db, email), {
                    });
                    let res = await createUserWithEmailAndPassword(auth, email, password)
                    props.navigation.navigate("LOGIN")
                    alert('USER CREATED')
                } catch (error) {
                    alert(error.message)

                };

            } else {
                alert('Both passwords should be same')
            }
        } else {
            alert('enter email and password')
        }

    }
   
    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" >
                <View style={styles.logo}>
                    <Image style={{ height: 350, width: 500 }}
                        source={require('../../../assets/logo.png')}
                    />
                </View>
                <View style={{ ...styles.card, height: '8%' }}>
                    <TextInput
                        style={{ margin: 10 }}
                        autoFocus={true}
                        autoCapitalize='none'
                        placeholder={'Enter Email'}
                        value={email}
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
                <View style={{ ...styles.card, height: '8%' }}>
                    <TextInput
                        style={{ margin: 10 }}
                        value={passwordAgain}
                        secureTextEntry={true}
                        placeholder={'Enter Password again'}
                        onChangeText={(t) => setPasswordAgain(t)}
                    />
                </View>
                <TouchableOpacity onPress={() => { onSignupPressed() }} >
                    <View style={{ margin: 20 }}>
                        <Image
                            style={styles.BTN}
                            source={SIGNUP_BTN}
                        />
                        <Text style={styles.textStyle}>SIGNUP</Text>
                    </View>
                </TouchableOpacity>
                <Button title="Already Have Account" onPress={() => props.navigation.navigate("LOGIN")} />
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
        paddingBottom: 30
    }

})
export default SIGNUP;