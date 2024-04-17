import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import Colors from '@/constants/Colors';

export default function TextField() {
  return (
    <View style={{marginBottom: 20,}}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.phoneInput}>
            <TextInput 
            value='12345678'
            style={styles.textInput} 
            placeholder='Enter your phone number' 
            />
            <TouchableOpacity onPress={() => console.log('Pressed')}>
            <Feather name='chevron-down' size={20} color={Colors.light_black} />
        </TouchableOpacity>
        </View>
    </View>
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
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 40,
  },
})