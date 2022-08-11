import React from 'react'
import { View, StatusBar } from 'react-native'

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold
} from '@expo-google-fonts/inter'

import { Home } from '@screens/Home'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {fontsLoaded ? <Home /> : <View />}
    </>
  )
}

export default App
