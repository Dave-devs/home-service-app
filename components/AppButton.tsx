import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

type Props = {
    text: string,
    onClick: () => void
}
export default function AppButton({text, onClick}: Props) {
  return (
    <TouchableOpacity 
    style={defaultStyles.btnStyle}
    onPress={onClick}
    >
        <Text style={defaultStyles.btnText}>{text}</Text>
    </TouchableOpacity>
  )
}