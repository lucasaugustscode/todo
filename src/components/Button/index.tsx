import React from 'react'
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ActivityIndicator
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  withTiming,
  Easing
} from 'react-native-reanimated'

import { theme } from '@global/theme'

import { styles } from './styles'

interface Props extends TouchableWithoutFeedbackProps {
  loading?: boolean
}

export const Button: React.FC<Props> = ({ loading, ...rest }) => {
  const activated = useSharedValue(0)

  const containerAnimationStyle = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(activated.value, [0, 1], [6, 8]),
      backgroundColor: interpolateColor(
        activated.value,
        [0, 1],
        [theme.COLORS.blue_200, theme.COLORS.blue_100]
      )
    }
  })

  const containerAnimationConfig = {
    duration: 200,
    easing: Easing.inOut(Easing.ease)
  }

  function handlePressIn() {
    activated.value = withTiming(1, containerAnimationConfig)
  }

  function handlePressOut() {
    activated.value = withTiming(0, containerAnimationConfig)
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={loading}
      {...rest}
    >
      <Animated.View style={[styles.container, containerAnimationStyle]}>
        {loading ? (
          <ActivityIndicator color={theme.COLORS.gray_100} size="small" />
        ) : (
          <Feather name="plus-circle" color={theme.COLORS.gray_100} size={20} />
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
