import React, { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { theme } from '@global/theme'

import { styles } from './styles'

interface Props extends TextInputProps {}

export const Input: React.FC<Props> = ({ ...rest }) => {
  const [isFocused, setIsFocused] = useState(false)

  function handleFocus() {
    setIsFocused(true)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  return (
    <TextInput
      style={[
        styles.container,
        { borderColor: isFocused ? theme.COLORS.purple_200 : 'transparent' }
      ]}
      selectionColor={theme.COLORS.gray_100}
      placeholderTextColor={theme.COLORS.gray_300}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  )
}
