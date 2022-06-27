import { View, Text } from 'react-native'
import React from 'react'

import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator , cardStyleInterpolator} from '@react-navigation/native-stack';
import PreSplash from '../Screens/PreSplash';
import UserRole from '../Screens/UserRole';
import Welcome from '../Screens/Welcome';
import ForgotPassword from '../Screens/ForgotPassword';
import NewPassword from '../Screens/NewPassword';
import AccountVerification from '../Screens/AccountVerification';
import TabNavigator from '../Navigations/TabNavigator';

const Stack =  createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='PreSplash'>
    <Stack.Screen
      name='PreSplash'
      component={PreSplash}
      options={{ headerShown: false , animation: 'none'}}
   />
    <Stack.Screen
      name='Splash'
      component={Splash}
      options={{ headerShown: false , animation: 'none'}}
   />
    <Stack.Screen
      name='Login'
      component={Login}
      options={{
        headerShown: false,
        getstureDirection: '' 

      }}
    />
    <Stack.Screen
      name='ForgotPassword'
      component={ForgotPassword}
      options={{ headerShown: false, gestureEnabled: false}}
    />
    <Stack.Screen
      name='NewPassword'
      component={NewPassword}
      options={{ headerShown: false, gestureEnabled: false}}
    />
    <Stack.Screen
      name='UserRole'
      component={UserRole}
      options={{headerShown: false , gestureEnabled: false }}
    />
    <Stack.Screen
      name='Signup'
      component={Signup}
      options={{headerShown: false }}
    />
    <Stack.Screen
      name='Verify'
      component={AccountVerification}
      options={{ headerShown: false, gestureEnabled: false}}
    />
    <Stack.Screen
      name='Welcome'
      component={Welcome}
      options={{ headerShown: false, gestureEnabled: false}}
    />
    <Stack.Screen
      name='Home'
      component={TabNavigator}
      options={{ headerShown: false, gestureEnabled: false}}
    />

  </Stack.Navigator>  
  )
}

export default AuthStack