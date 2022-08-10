import React from 'react'
import { View } from 'react-native'

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold
} from '@expo-google-fonts/inter'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

  return fontsLoaded ? <View /> : <View />
}

export default App
