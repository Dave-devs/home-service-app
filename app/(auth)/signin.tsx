import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import AppButton from '@/components/AppButton';
import FooterText from '@/components/FooterText';
import HeaderText from '@/components/HeaderText';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthTextInput from './components/AuthTextInput';
import SocialButton from './components/SocialButton';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useRouter } from 'expo-router';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  useWarmUpBrowser();
  
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: "oauth_facebook" });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('');

   const onSelectAuth = async (strategy: Strategy) => {
    // It select a strategy from these listed here
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    } [strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      //  If SignIn/SignUp is truE, we create a SessionId and pass it sessionId
      if(createdSessionId) {
        setActive!({ session: createdSessionId });
        router.navigate('(tabs)');
      }
       
    } catch (err) {
      console.error('OAuth error: ', err);
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView style={defaultStyles.container} behavior='padding'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 , justifyContent: 'center'}}>
        {/* Header Texts */}
        <HeaderText header='Sign In' subheader='Hi! Welcome back, login to continue.'/>

        {/* Text Inputs */}
        <View>
          <AuthTextInput 
          value={email}
          onChangeText={setEmail}
          label='Email' 
          placeholder='example@gmail.com' 
          />
          <View style={{marginBottom: 20,}}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInput}>
              <TextInput 
              value={password}
              onChangeText={setPassword}
              style={styles.textInput} 
              placeholder='Enter your password' 
              secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => togglePasswordVisibility()}>
              <Feather name={passwordVisible ? "eye-off" : "eye"} size={20} color={Colors.light_black} />
            </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Forget Password */}
        <View style={styles.forgetPasswordContainer}>
          <Text style={styles.forgetPasswordBtn} onPress={() => console.log('Forget Password Clicked!')}>Forget Password</Text>
        </View>

        {/* Button */}
        <AppButton text={'Sign In'} onClick={function (): void {
          router.navigate('(auth)/verifycode')
          console.log('Sign Up Button Clicked!')
        } }/>

        {/* Or Row */}
        <View style={styles.separatorView}>
          <View style={{ flex: 1, borderBottomColor:Colors.light_black, borderBottomWidth: StyleSheet.hairlineWidth, }} />
          <Text style={styles.separator}>or sign in with</Text>
          <View style={{ flex:1, borderBottomColor:Colors.light_black, borderBottomWidth: StyleSheet.hairlineWidth, }} />
        </View>

        {/* Social Login Buttons */}
        <View style={defaultStyles.socialBtnContainer}>
          <SocialButton 
          image={require('@/assets/images/apple-logo.png')} 
          onPress={() => onSelectAuth(Strategy.Apple)}/>
          <SocialButton 
          image={require('@/assets/images/google.png')} 
          onPress={() =>  onSelectAuth(Strategy.Google)}/>
          <SocialButton 
          image={require('@/assets/images/facebook-logo.png')}
          onPress={() => onSelectAuth(Strategy.Facebook)}/>
        </View>

         {/* Footer Text */}
        <FooterText text={"Don't have an account? "} btnText={'Sign Up'} onClick={() => router.navigate('(auth)/signup')}/>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  label: {
    color: Colors.black,
    textAlign: 'left',
    fontFamily: 'outfit',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 5,
  },
  textInput: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 40,
  },
  forgetPasswordBtn: {
    fontFamily: 'outfit',
    fontSize: 12,
    textAlign: 'left',
    color: Colors.primary
  },
  forgetPasswordContainer: {
    alignItems: 'flex-end',
  },
  separatorView: {
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    margin: 5,
    paddingHorizontal: 15,
  },
  separator: {
    fontFamily: 'outfit',
    color: Colors.grey
  },
})

export default SignIn