import React, { useEffect } from 'react'

import { Feather } from '@expo/vector-icons'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  Easing
} from 'react-native-reanimated'

import { theme } from '@global/theme'

import { styles } from './styles'

interface Props {
  checked?: boolean
}

export const Checkbox: React.FC<Props> = ({ checked }) => {
  const markerOpacity = useSharedValue(0)

  const containerAnimationStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        markerOpacity.value,
        [0, 1],
        [theme.COLORS.blue_100, theme.COLORS.purple_100]
      )
    }
  })

  const markerAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: markerOpacity.value
    }
  })

  useEffect(() => {
    markerOpacity.value = withTiming(checked ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease)
    })
  }, [checked])

  return (
    <Animated.View style={[styles.container, containerAnimationStyle]}>
      <Animated.View style={[styles.marker, markerAnimationStyle]}>
        <Feather name="check" color={theme.COLORS.gray_100} />
      </Animated.View>
    </Animated.View>
  )
}
