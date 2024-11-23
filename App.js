import React from 'react'
import FrontPage from './Components/FrontPage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Feedback from './Components/Feedback';
import FAQScreen from './Components/FaqsPage';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FrontPage">
        <Stack.Screen
          name="FrontPage"
          component={FrontPage}
          options={{ headerShown: false }} // Hide header for splash screen
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }} // Hide header for signup screen if needed
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }} // Hide header for signup screen if needed
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }} // Hide header for signup screen if needed
        />
        <Stack.Screen
          name="Faqs"
          component={FAQScreen}
          options={{ headerShown: false }} // Hide header for signup screen if needed
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App