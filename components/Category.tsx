import { View, Text, StyleSheet, ActivityIndicator, FlatList, ListRenderItem, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TitleText from './TitleText'
import { useRouter } from 'expo-router';
import GlobalApi from '@/utils/GlobalApi'
import Colors from '@/constants/Colors'
import { Categories } from '@/utils/interfaces/interfaces';

export default function Category() {
    const router = useRouter();
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        GlobalApi.getCategory()
        .then((resp: any) => setCategory(resp.categories))
        .catch((err) => console.error('Error', err))
        .finally(() => setLoading(false))
    }
    const categoryData: ListRenderItem<Categories> = ({item, index}) => (
        <View style={[styles.mainContainer]}>
            <TouchableOpacity 
            style={styles.iconContainer}
            onPress={() => router.push({pathname: '/listing/businessByCategory', params: {category: item.name}})}
            >
                <Image source={{uri: item.icon?.url}} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
            <Text style={{fontFamily: 'outfitSB', marginTop: 5, fontSize: 10, overflow: 'hidden'}}>{item?.name}</Text>
        </View>
    )

  return (
    <View style={{marginTop: 10}}>
        <View style={styles.container}>
            <TitleText text='Categories'/>
            <Text>View All</Text>
        </View>
        {loading && !category ?
            <ActivityIndicator></ActivityIndicator> : 
            <FlatList
            data={category}
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
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 15,
        marginVertical: 10,
        alignContent: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        backgroundColor: Colors.light_grey,
        padding: 17,
        borderRadius: 99
    },
})