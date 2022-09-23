import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Dimensions,View, StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native"
import { LOGIN_BTN, BACKGROUND_COLOR, color_BLACK, color_white } from "../../rec/drawables"
import { query, collection, onSnapshot, getFirestore, getDoc, doc, addDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import app from "../../api";


const USERLOCATION = (props) => {
    const [email, setEmail] = useState(null)
    const [currentLatitude, setCurrentLatitude] = useState(null)
    const [currentLongitude, setcurrentLongitude] = useState(null)
    const auth = getAuth();
    const [check, setCheck] = useState(false)
    const db = getFirestore(app);
    //const currentEmail = auth.currentUser.email
    useEffect(() => {
    }, []);
    const getData = async () => {
        // if (Platform.OS === 'android' && !Device.isDevice) {
        //     setErrorMsg(
        //         'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        //     );
        //     return;
        // }
        // let { status } = await Location.requestForegroundPermissionsAsync();
        // if (status !== 'granted') {
        //     setErrorMsg('Permission to access location was denied');
        //     return;
        // }
        const q = query(collection(db, email))
        try {
            let keys = []
            let unsub = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    keys.push(doc.data())
                    setCurrentLatitude(doc.data().lat)
                    setcurrentLongitude(doc.data().long)
                    setCheck(true)
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" >
                <View style={{ ...styles.card, height: 40 }}>
                    <TextInput
                        style={{ margin: 10 }}
                        autoFocus={true}
                        placeholder={'Enter User Email'}
                        value={email}
                        autoCapitalize='none'
                        onChangeText={(t) => setEmail(t)}
                    />

                </View >
                <TouchableOpacity onPress={() => getData()} >
                    <View style={{ margin: 20 }}>
                        <Text style={styles.textStyle}>Search</Text>
                    </View>
                </TouchableOpacity>
                <View>
                   {check ? <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}>
                            <Marker
                                description='I am here'
                                title='hello'
                                styles={{ width: 10, height: 10 }}
                                coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}>
                                {/* <Image style={{ height: 50, width: 50 }} source={require('../../../assets/marker.jpeg')} /> */}
                            </Marker>
                    </MapView>:<Text>Map is comming</Text>}
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

    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

})
export default USERLOCATION;