import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'


type Props = {
    text: string,
    btnText: string,
    onClick: () => void
}

export default function FooterText({text, btnText, onClick}: Props) {
  return (
    <View style={styles.footerContainer}>
        <Text style={styles.license}>{text} <Text style={[styles.licenseBtn]} onPress={onClick}>{btnText}</Text> </Text>
    </View>
  )
}

const styles = StyleSheet.create({
footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
},
license: {
    fontFamily: 'outfit',
    fontSize: 12.5,
    color: Colors.black,
    textAlign: 'left',
    marginBottom: -5
  },
  licenseBtn: {
    fontFamily: 'outfit',
    fontSize: 12.5,
    textAlign: 'left',
    color: Colors.primary,
  },
})