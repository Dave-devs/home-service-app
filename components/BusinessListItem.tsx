import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { BusinessList } from '@/utils/interfaces/interfaces'

// type Props = {
//   business: any
// }

export default function BusinessListItem({business}: any) {
  const router = useRouter();
  const data = {
    id: business.id,
    name: business.name,
    email: business.email,
    address: business.address,
    contactPerson: business.contactPerson,
    category: business.category.name,
    about: business.about,
    image: business.images
  }

  return (
    <TouchableOpacity 
    style={styles.container}
    onPress={() => router.push(
      {
        pathname: '/listing/businessCategoryDetail', 
        params: {...data}
      }
    )}
    >
      <Image source={{uri: business?.images[0].url}} style={styles.image}/>

      <View>
        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
        <Text style={styles.name}>{business?.name}</Text>
        <Text style={styles.address}> <Ionicons name='location-sharp' size={16} color={Colors.primary}/> {business?.address}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: Colors.white,
      borderRadius: 10,
      marginBottom: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8
    },
    contactPerson: {
      fontFamily: 'outfit',
      color: Colors.primary,
      fontSize: 15,
    },
    name: {
      fontFamily: 'outfitSB',
      fontSize: 17,
    },
    address: {
      fontFamily: 'outfit',
      color: Colors.grey,
      fontSize: 12,
      textAlign: 'center',
      overflow: 'hidden',
    },
})