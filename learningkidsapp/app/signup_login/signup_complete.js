import React from 'react';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function SignupComplete() {
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold,
        EBGaramond_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }
    const route = useRoute();
    const { child_username } = route.params;

    const navigation = useNavigation();
    const backButton = () => {
        navigation.navigate('home/home', { child_username });
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />

            <Text style={styles.title}>Sign Up Successful! Click the Arrow to go to Home.</Text>

            <View style={styles.corgiInHatContainer}>
                <Image source={require('../../assets/DoggoDogHouse.png')} style={styles.dogHouseImg} />
            </View>

            {/* Space container for layout */}
            <View style={styles.space}>
                <Pressable style={styles.backButton} onPress={backButton}>
                    <Image 
                        source={require('../../assets/back_arrow.png')} 
                        style={styles.backArrow} 
                    />
                </Pressable>
            </View>
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
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'EBGaramond_800ExtraBold',
    },
    corgiInHatContainer: {
        marginBottom: 0,
        alignContent: 'center',
    },
    dogHouseImg: {
        width: 175,
        height: 175,
    },
    backButton: {
        justifyContent: 'center', // Center the button
        alignItems: 'center', // Center the content
        marginTop: 20, // Optional: add some top margin
    },
    backArrow: {
        width: 75,
        height: 75,
        transform: [{ scaleX: -1 }], // Flip horizontally
    },
    space: {
        height: 50,
    },
});
