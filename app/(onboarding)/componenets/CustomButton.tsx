import { StyleSheet, FlatList, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Animated, { AnimatedRef, interpolateColor, SharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { OnboardingData } from '@/utils/interfaces/interfaces';
import { useRouter } from 'expo-router';

type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
}

const CustomButton = ({flatListRef, flatListIndex, dataLength, x}: Props) => {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const buttonAmimatedStyle = useAnimatedStyle(() => {
    return {
      width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX: flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0),
        }
      ]
    }
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(-100),
        }
      ]
    }
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#005B4F', '#1e2169', '#F15937'],
    );
    return {
      backgroundColor: backgroundColor,
    }
  })

  return (
    <TouchableWithoutFeedback
    onPress={() => {
      if(flatListIndex.value < dataLength - 1) {
        flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1, animated: true }) //animated isn't in doc code
      } else {
        router.navigate('(auth)/signup')
      }
    }}
    >
      <Animated.View style={[styles.container, buttonAmimatedStyle, animatedColor]}>
        <Animated.Text style={[styles.textButton, textAnimatedStyle]}>Get Started  <FontAwesome name="angle-right" size={18} color={Colors.white} /> </Animated.Text>
        <Animated.Image source={require('@/assets/images/arrow.png')} style={[styles.arrow, arrowAnimatedStyle, ]}/>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1e2169',
      paddingHorizontal: 5,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    arrow: {
      position: 'absolute',
      color: Colors.white,
      fontFamily: 'outfitB',
      fontSize: 14,
    },
    textButton: {
        color: Colors.white,
        fontFamily: 'outfitB',
        fontSize: 14,
        position: 'absolute',
    },
    textArrow: {
      color: Colors.white,
      position: 'absolute',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center' 
    }
})

export default CustomButton