import { StyleSheet } from 'react-native'

import { theme } from '@global/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 54,

    paddingHorizontal: 16,
    marginRight: 4,

    borderWidth: 1,
    borderRadius: 5,

    fontSize: theme.SIZES.md,
    fontFamily: theme.FONTS.body,
    color: theme.COLORS.gray_100,

    backgroundColor: theme.COLORS.gray_500
  }
})
