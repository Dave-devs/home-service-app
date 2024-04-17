import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function businessCategoryDetail() {
    const params = useLocalSearchParams()
    const router = useRouter();

    useEffect(() => {
      console.log(businessDetail?.image[0]);
    })

    const [businessDetail, setBusinessDetail] = useState({...params});

  return (
    <View>
      <Image source={{uri: businessDetail?.image[0]}} style={{width: '100%', height: 200}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backBtn: {
    position: 'absolute',
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7
  },
  name: {
    fontFamily: 'outfitB',
    fontSize: 25
  },
  contactPerson: {
    fontFamily: 'outfitSB',
    fontSize: 20,
    color: Colors.primary
  }
})