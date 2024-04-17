import { View, Text, StyleSheet, ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/utils/GlobalApi';
import TitleText from './TitleText';
import BusinessListItemSmall from './BusinessListItemSmall';

interface BusinessList {
    id: string,
    name: string,
    email: string,
    address: string,
    contactPerson: string,
    category: {
        name: string,
    },
    images: {
        url: string,
    },
    about: string
}

export default function BusinessList() {
  const [businessLists, setBusinessLists] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBusinessLists();
  }, []);

  const getBusinessLists = () => {
    GlobalApi.getBusinessList()
    .then((resp: any) => {
      setBusinessLists(resp.businessLists) 
    })
    .catch((err) => console.error('Error', err))
    .finally(() => setLoading(false))
  }

  const categoryData: ListRenderItem<BusinessList> = ({item, index}) => (
    <View>
      <BusinessListItemSmall business={item}/>
    </View>
  )
  return (
    <View style={{marginTop: 10}}>
        <View style={styles.container}>
            <TitleText text='Latest Business'/>
            <Text>View All</Text>
        </View>
        {loading && !businessLists ?
            <ActivityIndicator></ActivityIndicator> : 
            <FlatList
            data={businessLists}
            renderItem={categoryData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            />
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})
