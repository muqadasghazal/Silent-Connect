import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import FrontPage from './Components/FrontPage'
import FaqsPage from './Components/FaqsPage'

const App = () => {
  return (
    <SafeAreaView style={{height:"100%"}}>
      <FaqsPage />
    </SafeAreaView>
  )
}

export default App