import { StyleSheet, View , Image} from 'react-native'
import React , {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen';

export default function PreSplash({navigation}) {
    useEffect(() => {
        SplashScreen.hide();
      setTimeout(() => {
         navigation.navigate('Splash');
      }, 500);
    }, []);
  return (
    <View >
       <Image
        source={require('../Constants/Images/zoomGif.gif')}
      />
    </View>
  );
}

const styles = StyleSheet.create({})