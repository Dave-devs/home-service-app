import { View, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useRouter } from 'expo-router';
import AppButton from '@/components/AppButton';
import FooterText from '@/components/FooterText';
import HeaderText from '@/components/HeaderText';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const VerifyCode = () => {
  const router = useRouter();
  const [code, setCode] = useState<Array<string>>(Array(5).fill(''));

  const handleChange = (text: string, index: number) => {
    let otpValues = [...code];
    otpValues[index] = text;
    setCode(otpValues);
  };

  const handleVerifyOtp = () => {
    // Here you can implement the logic to verify the OTP
    router.navigate('(auth)/completeprofile');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 , justifyContent: 'flex-start'}}>
        {/* Header Texts */}
        <HeaderText header='Verify Code' subheader='Please enter the verification code sent to your email example@gmail.com'/>

        {/* OTP TextInput */}
        <View style={styles.otpContainer}>
          {Array(5).fill('').map((_, i) => (
            <TextInput
              key={i}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => handleChange(text, i)}
              value={code[i]}
            />
          ))}
        </View>

        {/* Don't receive code */}
        <FooterText text={'Don\'t receive OTP? '} btnText={'Resend code'} onClick={() => console.log('Resend Code Clicked!')}/>

        {/* Button */}
        <AppButton text={'Verify'} onClick={() => handleVerifyOtp()}/>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingTop: 100,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignSelf: 'center',
    paddingBottom: 20,
    borderRadius: 4,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '15%',
    height: 50,
    fontSize: 20,
    textAlign: 'center',
  },
})

export default VerifyCode