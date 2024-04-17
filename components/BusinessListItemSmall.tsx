import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

type Props = {
  business: any
}

export default function BusinessListItemSmall({business}: Props) {
  return (
    <View style={{backgroundColor: Colors.white, borderRadius: 10, marginRight: 10, padding: 8}}> 
      <Image source={{uri: business.images[0].url}} style={styles.image}/>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{business?.name}</Text>
        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
        <Text style={styles.categoryName}>{business?.category.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10, 
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  infoContainer: {
    paddingVertical: 7,
    display: 'flex',
    gap: 3,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 4,
  },
  name: {
    fontFamily: 'outfitSB', 
    fontSize: 17,
  },
  contactPerson: {
    fontFamily: 'outfit', 
    fontSize: 13,
    color: Colors.grey,
  },
  categoryName: {
    fontFamily: 'outfit', 
    fontSize: 10, 
    padding: 3, 
    color: Colors.primary, 
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
  },
})