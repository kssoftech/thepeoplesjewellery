import { StyleSheet, Text, View , SafeAreaView , TouchableOpacity ,Alert , Image , BackHandler } from 'react-native'
import React , {useState , useEffect , useCallback } from 'react'
import Title from '../Components/Title.js'
import CustomInput from '../Components/CustomInput.js'
import CheckBox from '@react-native-community/checkbox';
const globalStyle = require('../Constants/Styles/Style.js')
import { useFocusEffect } from '@react-navigation/native';


export default function Login({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [email , setEmail ] = useState("");
  const [emailE , setEmailE ] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [cPasswordE, setCpasswordE] = useState("");

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

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    
    if (val.length === 0) {
      setEmailE('email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailE('enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailE('');
    }
    };

  const handleSubmit = () => {
    if ( email.length === 0){
      setEmailE("required")
    }
    else if ( cPassword.length === 0){
      setCpasswordE("required")
    }  else{
      LoginAPI()
    }
  }

  const LoginAPI = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=0f37081b22fd307d243c642112a6be87");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://mchi.org.in/TPJ/api/customerSignin.php?token=3d30b5a19f5e1291c5e1959d00e40029&actionName=LOGIN&emailId=${email}&password=${cPassword}`, requestOptions)
      .then(response => response.json())
      .then(result => Alert.alert(result.message))
      .catch(error => Alert.alert(error));
  }

  return (
    <SafeAreaView style={globalStyle.container}>
      <View style={{marginTop: '30%'}}>
      <Image
           style={{
            width: '100%',
            height: 50,
          }}
          source={require('../Constants/Images/tpjlogo.png')}
        />
      </View>
      <View style={styles.titleContainer}>
        <Title style={styles.title} label="Sign In" />
      </View>
      <View style={styles.container}>
        <View>
          <CustomInput
            style={globalStyle.customInput}
            value={email}
            onChangeText={text => {
              setEmail(text)
              handleValidEmail(text)
            }
            }
            placeholder={'Enter Email Id or Mobile No.'}
          />
          {emailE.length > 0 && email.length === 0 && (
            <Text style={styles.error}>{emailE}</Text>
          )}
        </View>
        <View>
          <CustomInput
            style={globalStyle.customInput}
            value={cPassword}
            onChangeText={text => setCpassword(text)}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          {cPasswordE.length > 0 && cPassword.length === 0 && (
            <Text style={styles.error}>{cPasswordE}</Text>
          )}
        </View>
        <Text style={styles.forgotPassword}>Forgot Your Password?</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Login with OTP</Text>
        </View>
        <TouchableOpacity onPress={() => handleSubmit()}>
          <Image style={styles.signIn} source={require('../Constants/Images/signIn.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCenter}>
        <View style={styles.bottomContent1}>
          <Text style={styles.accountText}>Don't have an account ?</Text>
        </View>
        <View style={styles.bottomContent2}>
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('UserRole')}>
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    marginLeft: 15, 
    color: 'red'},
  title: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 25,
    fontFamily:'Montserrat'
  },
  titleContainer: {
    
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 15,
    right: 10,
    fontSize: 16,
    color: '#333333',
    fontFamily:'Montserrat'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 15,

  },
  checkbox: {
    alignSelf: 'center',
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginTop: 5
  },
  label: {
    margin: 8,
    fontSize: 17,
    color: '#333333',
    fontFamily:'Montserrat'
  },
  signIn:{
    marginTop: 20,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    marginTop: 20,
    height: 50,
    
  },
  bottomCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    fontSize: 20,
  },
  bottomContent1: {
    marginLeft: '5%',
    alignItems: 'flex-end',
    width: '60%',
  },
  bottomContent2: {
    width: '40%',
  },
  accountText: {
    fontSize: 18,
    fontFamily:'Montserrat'
  },
  signUpText: {
    color: '#663297',
    fontSize: 18,
    fontFamily:'Montserrat'
  },
});