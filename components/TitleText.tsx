import { View, Text } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

type Props = {
    text: string,
}
export default function TitleText({text}: Props) {
  return (
    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.black}}>{text}</Text>
    </View>
  )
}