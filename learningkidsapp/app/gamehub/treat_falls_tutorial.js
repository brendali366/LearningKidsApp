import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';



export default function Button(clickButton) {

    {/*loading fonts here */}
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold,EBGaramond_800ExtraBold
    });
    if (!fontsLoaded) {
        return null;
      }

    {/*Buttons for screens*/}
    const { onPressIndex, indexScreenBtn = 'Index.Js' } = clickButton;

  return (
    <View style={styles.container}>

            <Text>Treat Falls Tutorial Screen</Text>

            {/*Linking back to index.js page*/}
            <Link href="/" asChild>
                <Pressable style={styles.indexButton} onPressIndex={onPressIndex}>
                    <Text style={styles.text}>{indexScreenBtn}</Text>
                </Pressable>
            </Link>

    </View>

  );
}

const styles = StyleSheet.create({
container: {
  justifyContent: 'center',
  alignItems: 'center',       
  backgroundColor: '#A7C7E7',
},
indexButton:{
  backgroundColor: '#FAC898',
  width: 200, 
  padding: 10,
  borderRadius: 5,
  marginVertical: 10, 
  alignItems: 'center'
},
});