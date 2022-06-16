import { StyleSheet, Image, View , TouchableOpacity , SafeAreaView , BackHandler} from 'react-native'
import React , { useEffect} from 'react'
import Title from '../Components/Title';
import TitleContent from '../Components/TitleContent';
import { NavigationContainer } from '@react-navigation/native';

export default function UserRole({navigation}) {

  return (
    <SafeAreaView>
      <Image
        style={{
          width: '100%',
          height: 50,
          marginTop: '40%',
        }}
        source={require('../Constants/Images/tpjlogo.png')}
      />
      <TitleContent
        style={styles.titleContent}
        content={`Before you Sign Up, we would \n like to know that`}
      />
      <Title style={styles.title} label="You are A?" />

      <TouchableOpacity onPress={() => navigation.navigate('Signup',{companyType: 1} )}>
          <Image style={styles.signIn} source={require('../Constants/Images/jeweller.png')}/>
        </TouchableOpacity>

        <Title style={styles.title} label="Or" />

        <TouchableOpacity onPress={() => navigation.navigate('Signup',{companyType: 2} )}>
          <Image style={styles.signIn} source={require('../Constants/Images/consumer.png')}/>
        </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 25,
    fontFamily:'Montserrat'
  },
  titleContent: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop:'10%',
    fontSize: 20,
    fontFamily:'Montserrat'
  },
  or:{
    marginTop: 20,
  },
});