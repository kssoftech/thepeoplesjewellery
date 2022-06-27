import { StyleSheet, Text, View  , BackHandler} from 'react-native'
import React , {useCallback}from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Home() {

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };
   
      BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );
   
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress
        );
    }, [])
  );

  return (
    <View style={{ flex: 1 , alignSelf: 'center', justifyContent: 'center'}}>
      <Text style={{ fontSize: 30}}>Home</Text>
      <Text>Coming Soon</Text>
    </View>
  )
}

const styles = StyleSheet.create({})