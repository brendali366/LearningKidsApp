import React from 'react';
import { Text, View, StyleSheet, Image,Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';

export default function Screen1_5(clickButton) {

  {/*loading fonts here */}
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }
  //Hooks we need to call all the time:
  const route = useRoute();

  //to be able to pull parent first and last name and selected corgi later
  const { parent_first_name} = route.params; 
  //back arrow to go back to the previous screen
  const navigation = useNavigation();
  const backButton = () => {
    navigation.navigate('signup_login/Screen1');
  };

  //button to go to child sign up
  const {onpressChildSignUp} = clickButton;
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />

      <Pressable style={styles.back_arrow_img} onPress={backButton}>
        <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
      </Pressable>
      
      {/* Display the first name OF PARENT THAT SIGNED UP */}
      <Text style={styles.title}>Welcome, {parent_first_name}!</Text>
      <Text style={styles.title}>Now it's time to add your child's account.</Text>

      <View style={styles.corgiInHatContainer}>
        <Image source={require('../../assets/DogHouse.png')} style={styles.dogHouseImg} />
      </View>

      <Link href="/signup_login/Screen2" asChild>
      <Pressable style={styles.button} onpressChildSignUp={onpressChildSignUp}>
        <Text style={styles.text}>Continue</Text>
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
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  dogHouseImg: {
    width: 175,
    height: 175,
  },
  button: {
    width: 150,
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center',
  },
  back_arrow_img: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 75,
    height: 75,
  },
});
