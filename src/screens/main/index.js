import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Image, Button, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import app from '../../../api';
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { query, collection, onSnapshot, getFirestore, getDoc, doc, addDoc, setDoc } from "firebase/firestore";

export default function App(props) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const auth = getAuth();
    const email = auth.currentUser.email
    const db = getFirestore(app);
    useEffect(() => {
        fetchLocation();
        getData();
        getDate();
    }, []);
    //-------------------------use effect--------------------------------
    const getDate = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(
            date + '/' + month + '/' + year
            + ' ' + hours + ':' + min + ':' + sec
        );
        console.log("new one" + currentDate)
    }
    const fetchLocation = async () => {
        if (Platform.OS === 'android' && !Device.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
            );
            return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let foregroundSubscrition = Location.watchPositionAsync(
            {
                // Tracking options
                accuracy: Location.Accuracy.High,
                //distanceInterval: 100,
                timeInterval: 1000
            },
            (location) => {
                setLocation(location);
                setData();
            }
        )

    }
    const setData = async () => {
        if (location) {
            try {
                let time = location.timestamp;
                const docRef = await setDoc(doc(db, email, "CurrentLocation"), {
                    Time: currentDate,
                    lat: location.coords.latitude,
                    long: location.coords.longitude
                })
                // const docRef = await addDoc(collection(db, email), {
                //     lat: location.coords.latitude,
                //     long: location.coords.longitude
                // })
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            console.log('waiting....')
        }
    }
    const getData = async () => {
        const q = query(collection(db, email))
        try {
            let keys = []
            let unsub = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    keys.push(doc.data())
                    console.log("lat is" + doc.data().lat)
                })
            })
        } catch (e) {
            console.log(e)
        }
    }
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    console.log(text)
    //------------------------------------------------------------------
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" >
                <View>
                    <Button title='search User' onPress={() => props.navigation.navigate("USERLOCATION")} />
                </View>
                <View>
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}>
                        {location ?
                            <Marker
                                description='I am here'
                                title='hello'
                                styles={{ width: 10, height: 10 }}
                                coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
                                <Image style={{ height: 50, width: 50 }} source={require('../../../assets/marker.jpeg')} />
                            </Marker> : null}
                    </MapView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 2
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});