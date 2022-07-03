/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Splash from './src/Screens/Splash';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator , cardStyleInterpolator} from '@react-navigation/native-stack';
import PreSplash from './src/Screens/PreSplash';
import UserRole from './src/Screens/UserRole';
import Home from './src/Screens/Home';
import Welcome from './src/Screens/Welcome';
import ForgotPassword from './src/Screens/ForgotPassword';
import NewPassword from './src/Screens/NewPassword';
import AccountVerification from './src/Screens/AccountVerification';
import TabNavigator from './src/Navigations/TabNavigator';
import Wallet from './src/Screens/Wallet';


const Stack =  createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>


  );
};

const styles = StyleSheet.create({});

export default App;
