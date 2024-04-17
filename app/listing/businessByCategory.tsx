import { View, Text, StyleSheet, Pressable, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '@/utils/GlobalApi';
import BusinessListItem from '@/components/BusinessListItem';
import { BusinessList } from '@/utils/interfaces/interfaces';

export default function BusinessByCategory() {
    const params = useLocalSearchParams()
    const router = useRouter();

    const [businessLists, setBusinessLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       getBusinessByCategory();
    })

    const getBusinessByCategory = () => {
      GlobalApi.getBusinessListByCategory(params.category)
      .then((resp: any) => {setBusinessLists(resp.businessLists)})
      .catch((err) => console.error('Error', err))
      .finally(() => setLoading(false))
    }

    const businessData: ListRenderItem<BusinessList> = ({item, index}) => (
      <BusinessListItem business={item}/>
    )
    

  return (
    <TouchableOpacity 
    style={styles.container}
    
    >
      {/* Bac Icon & Header */}
      <View style={styles.navContainer}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='chevron-back' size={20} color={Colors.black} />
        </Pressable>
        <Text style={styles.navText}>{params.category}</Text>
      </View>
      {/* Business List Component */}
      {businessLists?.length > 0 ? 
        <FlatList
          data={businessLists}
          renderItem={businessData}
          keyExtractor={(item) => item.id}
        />
        : 
        <Text style={styles.placeHolderText}>No BusinessList</Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
    paddingTop: 45,
  },
  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  navText: {
    fontFamily: 'outfitSB',
    fontSize: 20,
    fontWeight: '200',
  },
  placeHolderText: {
    fontFamily: 'outfitSB',
    fontSize: 20,
    fontWeight: '200',
    color: Colors.light_black,
    marginTop: '20%',
    textAlign: 'center',
  },
})