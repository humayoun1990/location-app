import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from '../locationApp/src/navigation/index';
export default function App() {
  return (
   <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
