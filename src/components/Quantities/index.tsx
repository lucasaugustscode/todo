import React from 'react'
import { View, Text } from 'react-native'

import Amount from 'react-native-animated-numbers'

import { theme } from '@global/theme'

import { styles } from './styles'

interface Props {
  quantityCreated?: number
  quantityCompleted?: number
}

const DURATION = 400

export const Quantities: React.FC<Props> = ({
  quantityCreated = 0,
  quantityCompleted = 0
}) => {
  const fontStyle = {
    fontSize: theme.SIZES.xs,
    fontFamily: theme.FONTS.heading,
    color: theme.COLORS.gray_100
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.created}>Criadas</Text>

        <View style={styles.amount}>
          <Amount
            includeComma
            animateToNumber={quantityCreated}
            animationDuration={DURATION}
            fontStyle={fontStyle}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.completed}>Concluídas</Text>

        <View style={styles.amount}>
          <Amount
            includeComma
            animateToNumber={quantityCompleted}
            animationDuration={DURATION}
            fontStyle={fontStyle}
          />
        </View>
      </View>
    </View>
  )
}
