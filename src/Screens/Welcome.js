import { StyleSheet, Image, View , Text , BackHandler, SafeAreaView} from 'react-native'
import React , {useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Title from '../Components/Title';

export default function Welcome({ route , navigation}) {
    const { result } = route.params;
  
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
    
   console.log("WELCOME MESSAGE",JSON.stringify(result))
   const name = result.map((item)=>{
       return item?.firstName;
   }) 
   const welcome_message = result.map((item)=>{
    return item?.welcome_message;
}) 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: '30%'}}>
        <Text style={styles.welcomeText}>Welcome To</Text>
        <Image
          style={styles.logo}
          source={require('../Constants/Images/tpjlogo.png')}
        />
      </View>
      <Text style={styles.hi}>
        Hi , {name}
      </Text>
      <View
        style={styles.welcomeView}>
        <Text style={{fontSize: 18}}>{welcome_message}</Text>
        <Image
          style={styles.aboutUs}
          source={require('../Constants/Images/aboutUs.png')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 25,
    fontFamily: 'Montserrat',
  },
  aboutUs: {
    marginTop: 20,
    alignSelf: 'center',
  },
  welcomeView: {
    flex: 1,
    margin: 15,
    marginTop: 15,
  },
  hi: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
  },
  logo: {
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  welcomeText: {
    alignSelf: 'center',
    fontSize: 20,
  },
});