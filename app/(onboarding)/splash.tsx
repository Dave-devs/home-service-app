import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Splash = () => {
    const router = useRouter();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.navigate('(onboarding)/onboarding');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.splashLogoContainer}>
        <Image source={require('@/assets/images/logo.png')} style={styles.splashLogo}/>
      <Text style={styles.text}>HOME HERO</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  splashLogo: {
    width: 100,
    height: 100,
  },
  text: {
    color: Colors.white,
    fontFamily: 'outfitB',
    fontWeight: '700',
    fontSize:18,
  }
})

export default Splash