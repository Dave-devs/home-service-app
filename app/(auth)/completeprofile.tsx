import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity, ImageComponent } from 'react-native'
import React, { useState } from 'react'
import { Entypo, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import AppButton from '@/components/AppButton';
import HeaderText from '@/components/HeaderText';
import AuthTextInput from './components/AuthTextInput';
import Colors from '@/constants/Colors';

const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdVgSoJ_6jouY4v5cmPt2mlTY7nS7gjMzng&s';

const CompleteProfile = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [image, setImage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView style={defaultStyles.container} behavior='padding'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 , justifyContent: 'flex-start'}}>
        {/* Header Texts */}
        <HeaderText header='Complete Your Profile' subheader="Don't worry, only you can see your personal data. No one else will be able to see it."/>

        {/* Profile Image */}
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {
              image ? 
              <Image source={{ uri: image  }} style={styles.image} /> : 
              <Image source={{uri: placeholder}} style={styles.image}/>
            }
          </View>
          <TouchableOpacity 
          onPress={pickImage}
          style={styles.pick}
          >
            <Entypo name="pencil" size={14} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Text Inputs */}
        <View>
          <AuthTextInput 
          value={name}
          onChangeText={setName}
          label='Name' 
          placeholder='John Doe' 
          />
          {/* Phone Number */}
          <View style={{marginBottom: 20,}}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInput}>
              <TouchableOpacity onPress={() => console.log('Pressed')}>
                <Text style={{fontFamily: 'outfit', fontSize: 16}}>+1</Text>
              </TouchableOpacity>
              <TextInput 
              value={phone}
              onChangeText={setPhone}
              style={styles.textInput} 
              placeholder='Enter phone number' 
              />
            </View>
          </View>
          {/* Gender */}
          <View style={{marginBottom: 20,}}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.phoneInput}>
              <TextInput 
              value={gender}
              onChangeText={setGender}
              style={styles.textInput} 
              placeholder='Enter your gender' 
              />
              <TouchableOpacity onPress={() => console.log('Pressed')}>
                <Feather name='chevron-down' size={20} color={Colors.light_black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Button */}
        <AppButton 
        text={'Complete Profile'} 
        onClick={() => {
          router.navigate('(tabs)');
        }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  imageContainer: {
    height: 110,
    width: 110,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.light_grey
  },
  image: {
    height: 110,
    width: 110,
    borderRadius: 100,
  },
  pick: {
    backgroundColor: Colors.primary, 
    borderRadius: 99, 
    height: 25, 
    width: 25, 
    padding:5,
    justifyContent: 'center', 
    alignItems: 'center', 
    right:30,
    top: 80
  },
  label: {
    color: Colors.black,
    textAlign: 'left',
    fontFamily: 'outfit',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 40,
  },
  drop: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
})

export default CompleteProfile