import { StyleSheet, View, Animated} from 'react-native'
import React ,{useEffect}from 'react'
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

export default function Splash({navigation}) {

const centerLogoAnimation = new Animated.Value(600);
const tpjLogoAnimation = new Animated.Value(600);

useEffect(() => {
    Animated.sequence([
      Animated.timing(centerLogoAnimation, {
        toValue: 0,
        delay: 500,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(tpjLogoAnimation, {
        toValue: -150,
        delay: 800,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
}, []);


useEffect(()=>{
    SplashScreen.hide()
    setTimeout(() => {
      navigation.navigate('Login')
    }, 3500);
},[])


  return (
    <LinearGradient colors={['#C489FF', '#B2D7F9']}>
      <View style={styles.container}>
        <View style={styles.gifView}>
          <Animated.Image
            style={{
              width: 250,
              height: 250,
              transform: [{translateY: centerLogoAnimation}],
            }}
            source={require('../Constants/Images/gif3.gif')}
          />
        </View>
        <Animated.Image
          style={{
            height: 50,
            width: '100%',
            transform: [{translateY: tpjLogoAnimation}],
          }}
          source={require('../Constants/Images/tpjlogo.png')}></Animated.Image>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifView:{
    marginBottom: '40%'
  }
});