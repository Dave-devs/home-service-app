import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import TitleText from './TitleText'
import GlobalApi from '@/utils/GlobalApi'
import { Sliders } from '@/utils/interfaces/interfaces'

export default function Slider() {
    const [slider, setSlider] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSliders();
    }, []);

    const getSliders = () => {
        GlobalApi.getSlider()
        .then((resp: any) => setSlider(resp.sliders))
        .catch((err) => console.error('Error', err))
        .finally(() => setLoading(false))
    }

    const sliderData: ListRenderItem<Sliders> = ({item, index}) => (
        <View style={{marginRight: 10, marginTop: 10}}>
            <Image source={{uri: item.image?.url}} style={styles.sliderImage}/>
        </View>
    )

  return (
    <View >
        <TitleText text='Offers For You'/>
        {loading && !slider ?
            <ActivityIndicator></ActivityIndicator> : 
            <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={slider}
            renderItem={sliderData}
            keyExtractor={(item) => item.id}
            />
        }
    </View>
  )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: 270,
        height: 150,
        borderRadius: 8,
        objectFit: 'fill'
    }
})