import { StyleSheet } from 'react-native'

import { theme } from '@global/theme'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 175,
    alignItems: 'center',

    paddingTop: getStatusBarHeight() + 32,

    backgroundColor: theme.COLORS.gray_700
  },
  content: {
    flex: 1,

    paddingTop: 55,
    // paddingHorizontal: 24,

    backgroundColor: theme.COLORS.gray_600
  },
  form: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 24,

    position: 'absolute',
    top: -32
  },
  board: {
    paddingHorizontal: 24
  },
  tasksList: {
    flexGrow: 1,
    paddingHorizontal: 24
  },
  empty: {
    flex: 1,
    paddingHorizontal: 24
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',

    borderTopWidth: 1,
    borderColor: theme.COLORS.gray_400,

    paddingTop: 48
  },
  emptyImg: {
    fontSize: 100,
    color: theme.COLORS.gray_400,

    marginBottom: 16
  },
  emptyTitle: {
    fontSize: theme.SIZES.sm,
    fontFamily: theme.FONTS.heading,
    color: theme.COLORS.gray_300,

    marginBottom: 2
  },
  emptysubTitle: {
    fontSize: theme.SIZES.sm,
    fontFamily: theme.FONTS.body,
    color: theme.COLORS.gray_300
  },
  loading: {
    marginTop: 48
  }
})
