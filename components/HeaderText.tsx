import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'


type Props = {
    header: string,
    subheader: string,
}

export default function HeaderText({header, subheader}: Props) {
  return (
    <View style={{paddingHorizontal: 10, paddingBottom: 30}}>
        <Text style={styles.headerStyle}>{header}</Text>
        <Text style={styles.subheaderStyle} numberOfLines={2}>{subheader}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    headerStyle: {
        fontFamily: 'outfitSB',
        fontSize: 20,
        fontWeight: '200',
        color: Colors.light_black,
        textAlign: 'center'
    },
    subheaderStyle: {
        fontFamily: 'outfit',
        fontSize: 14,
        fontWeight: '200',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.grey,
        textAlign: 'center',
    }
})