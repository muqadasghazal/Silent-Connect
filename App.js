import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import FrontPage from './Components/FrontPage'
import FaqsPage from './Components/FaqsPage'
import Accounts from './Components/Accounts'
import FAQScreen from './Components/FaqsPage';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{height:"100%"}}>
      <NavigationContainer>
        <stack.Navigator initialRouteName="Accounts">
        <stack.Screen name="FaqPage" component={FAQScreen}/>
        <stack.Screen name="Accounts" component={Accounts}/>
          </stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App