import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import HomeHeader from '../../components/homeHeader'
import Slider from '@/components/Slider'
import Category from '@/components/Category'
import BusinessList from '@/components/BusinessList'

const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdVgSoJ_6jouY4v5cmPt2mlTY7nS7gjMzng&s';

const Home = () => {
  return (
    <View style={defaultStyles.mainContainer}>
      {/* Header Component */}
      <View style={styles.hearderContainer}>
        <HomeHeader userImage={placeholder} userName={'Davedevs'} />
      </View>
      <ScrollView style={{padding: 10}}>
        {/* Offer For You Slider Component */}
        <Slider/>
        {/* Category Component */}
        <Category/>
        {/* Business Component */}
        <BusinessList/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  hearderContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 45,
    backgroundColor: Colors.primary
  },
})

export default Home
