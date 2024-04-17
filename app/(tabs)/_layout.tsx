import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

const Layout = () => {
  return (
    <Tabs 
    screenOptions={{ 
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.grey,
      tabBarLabelStyle: {
        fontFamily: 'outfitSB'
      },
      headerShown: false,
    }}
    >
      {/* Tab Navigation Screens */}
      <Tabs.Screen 
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name='home' size={size} color={color} />
        }}
      />
      <Tabs.Screen 
        name="booking" 
        options={{
          tabBarLabel: 'Booking',
          tabBarIcon: ({ color, size }) => <Ionicons name='bookmark' size={size} color={color} />
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarLabel: 'Profile', 
          tabBarIcon: ({ color, size }) => <FontAwesome name='user' size={size} color={color} />
        }}
      />
    </Tabs>
  )
}

export default Layout