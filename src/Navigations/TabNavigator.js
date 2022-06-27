import * as React from 'react';
import {Text, View, Image} from 'react-native';
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
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
        name="Home2"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
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
