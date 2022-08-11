import React, { useEffect } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  TouchableOpacity
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  Easing,
  FadeInLeft,
  FadeOutRight,
  Layout
} from 'react-native-reanimated'

import { Checkbox } from '@components/Checkbox'

import { styles } from './styles'
import { theme } from '@global/theme'

interface Props extends TouchableWithoutFeedbackProps {
  taskName: string
  completed?: boolean
  onDelete(): void
  delay: number
}

const DURATION = 200
const DELAY = 100

export const TaskCard: React.FC<Props> = ({
  taskName,
  completed,
  onDelete,
  delay,
  ...rest
}) => {
  const taskSituation = useSharedValue(0)

  const containerAnimationStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        taskSituation.value,
        [0, 1],
        [theme.COLORS.gray_400, 'transparent']
      )
    }
  })

  const taskNameAnimationStyle = useAnimatedStyle(() => {
    return {
      textDecorationLine: completed ? 'line-through' : 'none',
      color: interpolateColor(
        taskSituation.value,
        [0, 1],
        [theme.COLORS.gray_100, theme.COLORS.gray_300]
      )
    }
  })

  useEffect(() => {
    taskSituation.value = withTiming(completed ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease)
    })
  }, [completed])

  return (
    <TouchableWithoutFeedback {...rest}>
      <Animated.View
        style={[styles.container, containerAnimationStyle]}
        entering={FadeInLeft.delay(delay * DELAY)}
        exiting={FadeOutRight.duration(DURATION / 2)}
        layout={Layout.duration(DURATION).delay(DELAY)}
      >
        <View style={styles.content}>
          <Checkbox checked={completed} />

          <Animated.Text
            style={[styles.taskName, taskNameAnimationStyle]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {taskName}
          </Animated.Text>
        </View>

        <TouchableOpacity
          style={styles.remove}
          activeOpacity={0.7}
          onPress={onDelete}
        >
          <Feather name="trash-2" color={theme.COLORS.danger} size={20} />
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
