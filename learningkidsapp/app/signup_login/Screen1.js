import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function ParentSignup() {
  const [email, setEmail] = useState('');
  const [parentfirstname, setParentFirstName] = useState('');
  const [parentlastname, setParentLastName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const navigation = useNavigation();
  const backButton = () => {
    navigation.navigate('signup_login/landing_screen_2');
  };

  const handleParentSignup = async () => {
    if (!email || !parentfirstname || !password || !parentlastname) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Show success alert
      Alert.alert('Successful sign up', `Welcome ${parentfirstname}!`);

      // Reset the form fields everytime submit button is hit
      setEmail('');
      setParentFirstName('');
      setParentLastName('');
      setPassword('');

      // Navigate to Screen1.5 and pass the first name of the parent to show on screen
      router.push({
        pathname: '/signup_login/Screen1.5',
        //will be useful later to allow database info to show up on screens
        params: { parent_first_name: parentfirstname }

      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background} />
      
      <Pressable style={styles.back_arrow_img} onPress={backButton}>
        <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
      </Pressable>

      <View style={styles.space} />

      <Text style={styles.title}>Parent Sign Up</Text>
      
      <Image
        source={require('../../assets/scale5doggo.png')} 
        style={styles.image}
      />

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Parent First Name"
          value={parentfirstname}
          onChangeText={setParentFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Parent Last Name"
          value={parentlastname}
          onChangeText={setParentLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleParentSignup}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',       
    backgroundColor: '#A7C7E7',
    ...StyleSheet.absoluteFillObject
  },
  space: {
    height: 50,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  back_arrow_img: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 75,
    height: 75,
  },
  image: {
    width: 200,  
    height: 200,
    marginBottom: 20, 
    alignSelf: 'center',
  },
  input: {
    width: 200,
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    width: 150,
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    paddingTop: 5,
    paddingBottom: 0,
    marginBottom: 5,
    alignItems: 'center',
  },
});
