import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, push, set } from 'firebase/database';
import { auth, database } from '../config/firebaseConfig';

export default function ChildSignup() {

  /*let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }*/

  const [email, setEmail] = useState(''); /*Inputs for the child name and user*/
  const [childfirstname, setchildFirstName] = useState('');
  const [childlastname, setchildLastName] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter(); // Initialize useRouter

  {/*1st landing screen button */}
  const navigation = useNavigation();
    const backButton = () => {
      navigation.navigate('signup_login/Screen1'); 
    };

  const handlechildSignup = async () => { 
    if (!childfirstname || !username || !childlastname) {
      Alert.alert('Error', 'All fields are required!');
      return;
    } 
    const parentId = auth.currentUser?.uid; // Get parent’s unique ID
  
      if (!parentId) {
        Alert.alert('Error', 'Parent not authenticated.');
        return;
      }
  
      try {
        // Reference to the parent's children node in Realtime Database
        const childrenRef = ref(database, `parents/${parentId}/children`);
        
        // Create a new child entry under this parent
        const newChildRef = push(childrenRef);
  
        // Save child's data under the new reference
        await set(newChildRef, {
          firstName: childfirstname,
          lastName: childlastname,
          username: username,
        });
  
        Alert.alert('Successful child sign up', `${childfirstname} registered successfully!`);
        
        // Reset form fields
        setchildFirstName('');
        setchildLastName('');
        setUsername('');
        
        // Navigate to next screen
        router.push('/signup_login/EmergencyContact');
      } catch (error) {
        Alert.alert('Error', error.message);
      }

  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background}/>

      <Pressable style={styles.back_arrow_img} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
      </Pressable>

      <Text style={styles.title}>Child Sign Up</Text>
      
      <Image
        source={require('../../assets/DogHouse.png')} 
        style={styles.image}
      />

      <View style={styles.inputView} asChild>
      <TextInput
        style={styles.input}
        placeholder="Child First Name"
        value={childfirstname}
        onChangeText={setchildFirstName}
        keyboardType="childFirstName"
      />

      <TextInput
        style={styles.input}
        placeholder="Child Last Name"
        value={childlastname}
        onChangeText={setchildLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={handlechildSignup}>
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
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },

  image: {
    width: 200,  
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  
  input: {
    width: 200,
    height : 40,
    paddingHorizontal : 8,
    borderWidth : 2,
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    paddingTop: 5,
    paddingBottom: 0,
    marginBottom  :5,
    alignItems: 'center',
  },
  back_arrow_img: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 75,
    height: 75,
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
});