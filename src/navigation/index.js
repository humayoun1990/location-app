import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SIGNUP from '../screens/signup'
import MAIN from '../screens/main'
import LOGIN from '../screens/login'
import USERLOCATION from '../userLocation'

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false, orientation: 'all' }}
                    name="LOGIN" component={LOGIN}
                />
                <Stack.Screen
                    options={{ headerShown: false, orientation: 'all' }}
                    name="SIGNUP" component={SIGNUP}
                />
                <Stack.Screen
                    options={{ headerShown: false, orientation: 'all' }}
                    name="MAIN" component={MAIN}
                />
                <Stack.Screen
                    options={{ headerShown: false, orientation: 'all' }}
                    name="USERLOCATION" component={USERLOCATION}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;