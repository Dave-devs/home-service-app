import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import AppButton from '@/components/AppButton';
import FooterText from '@/components/FooterText';
import HeaderText from '@/components/HeaderText';
import { useOAuth } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthTextInput from './components/AuthTextInput';
import CheckBox from './components/CheckBox';
import SocialButton from './components/SocialButton';
import { defaultStyles } from '@/constants/Styles';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

WebBrowser.maybeCompleteAuthSession();
const SignUp = () => {
  useWarmUpBrowser();

  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: "oauth_facebook" });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [username, setUserName] = useState<string>('');
  const [emailAddress, setEmailAddress ] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 , justifyContent: 'center'}}>
        {/* Header Texts */}
        <HeaderText header='Create Account' subheader='Fill your information below or register with your social account.'/>

        {/* Text Inputs */}
        <View>
          <AuthTextInput 
          value={username}
          onChangeText={setUserName}
          label='Username'
          placeholder='Enter your name' 
          />

          <AuthTextInput 
          value={emailAddress}
          onChangeText={setEmailAddress}
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

        {/* Checkbox with Terms & Condition */}
        <View style={styles.termsContainer}>
          <CheckBox 
          onChange={function (isChecked: boolean): void {
            console.log(isChecked)
          }}
          />
          <Text style={styles.terms}>Agree with <Text style={styles.termsBtn} onPress={() => console.log('Term & Conditions')}>Terms & Conditions</Text> </Text>
        </View>

        {/* Button */}
        <AppButton text={'Sign Up'} onClick={() => {router.navigate('(auth)/verifycode')}} />

        {/* Or Row */}
        <View style={styles.separatorView}>
          <View style={{ flex: 1, borderBottomColor:Colors.light_black, borderBottomWidth: StyleSheet.hairlineWidth, }} />
          <Text style={styles.separator}>or sign up with</Text>
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
        <FooterText text={'Already have an account? '} btnText={'Sign In'} onClick={() => router.navigate('(auth)/signin')} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: 60
  },
  label: {
    color: Colors.black,
    textAlign: 'left',
    fontFamily: 'outfit',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 1,
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
  terms: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: Colors.black,
    textAlign: 'left',
  },
  termsBtn: {
    fontFamily: 'outfit',
    fontSize: 12,
    textAlign: 'left',
    color: Colors.primary
  },
  termsContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
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

export default SignUp