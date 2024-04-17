import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

type Props = {
  userImage: string,
  userName: string,
}

export default function HomeHeader({userImage, userName}: Props) {
  return (
    <View> 
      <View style={styles.container}>
        {/* User name, image componenet */}
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Image source={{uri: userImage}} style={styles.userImage}/>
          <View style={{flexDirection: 'column',}}>
            <Text style={styles.welcome}>Welcome,</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Ionicons name='bookmark-outline' size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search Bar & Search Icon */}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
        <View style={styles.searchBarConatiner}>
          <Text style={{fontFamily: 'outfit', color: Colors.light_grey}}>Search</Text>
        </View>
        <View style={styles.searchIcon}>
          <Ionicons name='search' size={20} color={Colors.primary} />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.white,
  },
  welcome: {
    fontFamily: 'outfit',
    fontSize: 12,
    fontWeight: '200',
    color: Colors.white
  },
  userName: {
    fontFamily: 'outfitSB',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white
  },
  searchBarConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    height: 40,
    width: 40,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.white,
  }
})