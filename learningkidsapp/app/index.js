import React from 'react';
import { Pressable, Text, View, StyleSheet,Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

//Landing Screen is the Main Entry of the Application, index.js = landing screen
export default function landing_screen(clickButton) {

  {/*loading fonts here */}
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }

  //button to go to second landing page screen
  const {onPressLanding2} = clickButton;

  //frontend
  return (
   <View style={styles.container}>
    <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background}/>

    <Text style={styles.title}>Welcome to</Text>
    <Text style={styles.title}>Learning Kids</Text>
    
    <View style={styles.corgi}>
          <Image source={require('../assets/scale5doggo.png')}style={styles.dogHatImage} />
    </View>
   
    <Link href="/signup_login/landing_screen_2" asChild>
      <Pressable style={styles.button} onPressLanding2={onPressLanding2}>
        <Text style={styles.text}>START</Text>
       </Pressable>
    </Link>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',       
  ...StyleSheet.absoluteFillObject
},
background: {
  ...StyleSheet.absoluteFillObject,
  width: '100%',
  height: '100%',
},
button: {
  width: 150,
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  marginVertical: 10, 
  alignItems: 'center',
},
corgi: {
  marginBottom: 0,
  alignContent: 'center'
},
text: {
  color: '#000000',
  fontSize: 16,
  fontFamily: 'EBGaramond_800ExtraBold',
},
title: {
  fontSize: 30,
  textAlign: 'center',
  marginBottom: 20,
  fontFamily: 'EBGaramond_800ExtraBold',
},
});