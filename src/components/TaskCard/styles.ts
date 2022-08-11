import { StyleSheet } from 'react-native'

import { theme } from '@global/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 8,

    paddingLeft: 12,
    paddingRight: 8,

    marginBottom: 8,

    backgroundColor: theme.COLORS.gray_500
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskName: {
    fontSize: theme.SIZES.sm,
    fontFamily: theme.FONTS.body,

    marginLeft: 12
  },
  remove: {
    width: 32,
    height: 32,

    justifyContent: 'center',
    alignItems: 'center'
  }
})
