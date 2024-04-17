import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';


type Props = {
  label: string,
  placeholder: string,
  trailingIcon?: JSX.Element,
  value: string,
  onChangeText: (text: string) => void
}
export default function AuthTextInput({label, placeholder, value, onChangeText}: Props) {
  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput 
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput} 
        placeholder={placeholder} 
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textInputContainer: {
       marginBottom: 20,
    },
    label: {
        color: Colors.black,
        textAlign: 'left',
        fontFamily: 'outfit',
        fontSize: 14,
        fontWeight: '300',
    },
    textInput: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 8,
    },
})