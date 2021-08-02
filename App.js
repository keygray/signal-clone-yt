import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import AddChatScreen from './Screens/AddChatScreen';
import ChatScreen from './Screens/ChatScreen';
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: "#0c6157",
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTintColor: "#fff",
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      //initialRouteName="Home" 
      screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
