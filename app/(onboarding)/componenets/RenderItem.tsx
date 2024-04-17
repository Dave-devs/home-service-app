import { View, StyleSheet, useWindowDimensions, Image, Text } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { OnboardingData } from '@/utils/interfaces/interfaces';

type Props = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingData;
}

const RenderItem = ({index, x, item}: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const illustrationAnimation = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value, 
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, 200],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{translateY: translateYAnimation}],
    }
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale: scale}],
    };
  })

  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <View style={styles.circleContainer}>
        <Animated.View
        style={[
          {
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            borderRadius: SCREEN_WIDTH /  2,
            backgroundColor: item.background,
          },
          circleAnimation,
        ]}
        />
      </View>
      <Animated.View style={illustrationAnimation}>
        <Image source={item.image} style={{width: SCREEN_WIDTH * 0.95, height: SCREEN_WIDTH * 1}} />
        <Text style={[styles.itemText, {color: item.textColor}]}>{item.title}</Text>
        <Text style={[styles.description, {color: Colors.white}]}>{item.description}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 100,
        // marginBottom: 130,
    },
    itemText: {
        textAlign: 'center',
        fontFamily: 'outfitSB',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        marginHorizontal: 18,
    },
    description: {
      textAlign: 'center',
        fontFamily: 'outfitSB',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    circleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})

export default RenderItem