import { StyleSheet } from 'react-native'

import { theme } from '@global/theme'

export const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,

    borderWidth: 2,
    borderRadius: 9
  },
  marker: {
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50,

    backgroundColor: theme.COLORS.purple_100
  }
})
