import  React , { useCallback} from 'react';
import {Text, View, Image , BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  cardStyleInterpolator,
} from '@react-navigation/native-stack';
import Wallet from '../Screens/Wallet';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Favourite from '../Screens/Favourite';
import Cart from '../Screens/Cart';
import Search from '../Screens/Search';
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: 'yellow'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const TabNavigator = () => {

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#663297',

        },
      }}>
      <Tab.Screen
        name="The Peoples Jewellery"
        component={HomeStack}
        options={{
          headerShown: true,
          
          tabBarIcon: () => (
            <Image
              source={require('../Constants/Images/homeIcon.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="wallet"
        component={Wallet}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../Constants/Images/walletIcon.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="favourite"
        component={Favourite}
        options={{
          tabBarBadgeStyle: {backgroundColor: '#6AB4F9', color: 'white'},
          tabBarBadge: 11,
          tabBarIcon: () => (
            <Image
              source={require('../Constants/Images/favIcon.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarBadgeStyle: {backgroundColor: '#6AB4F9', color: 'white'},
          tabBarBadge: 7,
          tabBarIcon: () => (
            <Image
              source={require('../Constants/Images/cartIcon.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../Constants/Images/searchIcon.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="x">
      <Stack.Screen
        name="x"
        component={HomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default TabNavigator;
