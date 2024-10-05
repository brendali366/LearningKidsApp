import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../config/firebaseConfig';

export default function Profile() {
    // Loading fonts here
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold, EBGaramond_800ExtraBold
    });

    const navigation = useNavigation();
    const route = useRoute(); // Hook to access route params
    const { child_username } = route.params; // Extracting child_username

    // Function to navigate back to the home screen
    const backButton = () => {
        navigation.navigate('home/home', {child_username}); 
    };

    if (!fontsLoaded) {
        return null; 
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />
            <Pressable style={styles.back_arrow_img} onPress={backButton}>
                <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
            </Pressable>

            <Text style={styles.profileHeadingText}> {child_username} Profile</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A7C7E7',
        ...StyleSheet.absoluteFillObject,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'EBGaramond_800ExtraBold'
    },
    profileHeadingText: {
        fontSize: 30,
        fontFamily: 'EBGaramond_600SemiBold'
    },
    userProfilePictureContainer: {
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        position: 'relative', 
        alignItems: 'center',
    },
    doggoImage: {
        width: 200,
        height: 200,
    },
    expImage: {
        width: 330,
        height: 100,
    },
    xpLevelText: {
        fontSize: 16,
        textAlign: 'center'
    },
    expAndexpText: {
        flexDirection: 'column', 
        alignItems: 'center',
        marginBottom: 10,
    },
    back_arrow_img: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 75,
        height: 75,
    },
});