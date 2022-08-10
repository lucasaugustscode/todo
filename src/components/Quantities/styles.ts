import { StyleSheet } from 'react-native'

import { theme } from '@global/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 24,

    marginBottom: 20
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  created: {
    fontSize: theme.SIZES.sm,
    fontFamily: theme.FONTS.heading,
    color: theme.COLORS.blue_100,

    marginRight: 8
  },
  completed: {
    fontSize: theme.SIZES.sm,
    fontFamily: theme.FONTS.heading,
    color: theme.COLORS.purple_100,

    marginRight: 8
  },
  amount: {
    paddingVertical: 2,
    paddingHorizontal: 8,

    borderRadius: 50,

    backgroundColor: theme.COLORS.gray_400
  }
})
