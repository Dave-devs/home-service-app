import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

type Props = {
    image: ImageSourcePropType,
    onPress: () => void
}
export default function SocialButton({ image, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.socialContainer} onPress={onPress}>
        <Image source={image} style={styles.social}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    socialContainer: {
    borderRadius: 99,
    height: 50,
    width: 50,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  social: {
    height: 25,
    width: 25,
    resizeMode:'contain'
  }
})