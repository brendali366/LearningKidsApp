import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react'; 
import { View } from 'react-native'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameHubMainScreen from './gamehub/gamehub_mainscreen'; // Your GameHub main screen


import TreatFalls from './app/gamehub/treat_falls';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


export default function App() {
  return <TreatFalls />;
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="gamehub_mainscreen">
        <Stack.Screen 
          name="gamehub_mainscreen" 
          component={GameHubMainScreen} 
          options={{ headerShown: false }} // Hide header if needed
        />
        <Stack.Screen 
          name="treatfalls" 
          component={TreatFalls} 
          options={{ headerShown: false }} // Hide header if needed
        />
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