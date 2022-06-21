import { StyleSheet, Text, View , SafeAreaView , ActivityIndicator ,TouchableOpacity 
  ,Alert , Image , BackHandler , Modal, TextInput, ScrollView , ImageBackground} from 'react-native'
import React , {useState , useEffect , useCallback , useRef } from 'react'
import Title from '../Components/Title.js'
import CustomInput from '../Components/CustomInput.js'
import CheckBox from '@react-native-community/checkbox';
const globalStyle = require('../Constants/Styles/Style.js')
import { useFocusEffect } from '@react-navigation/native';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from '../Components/Button.js';


export default function Login({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [email , setEmail ] = useState("");
  const [emailE , setEmailE ] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [cPasswordE, setCpasswordE] = useState("");
  const [pin ,setPin] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [modalVisible , setModalVisible] = useState(false)
  const [otpResult , setOTPResult]= useState([]);
  const [verifySuccessfull , setVerifySuccessfull] = useState(false);
  const [otpModal , setOtpModal] = useState(false);
  const [otpLoading , setOtpLoading] = useState(false);
  const [signInLoading , setSignInLoading] = useState(false);

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


  const handleValidEmail = text => {
    setSelection(false)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    
    if (text.length === 0) {
      setEmailE('enter email first');
    }  else if (reg.test(text) === true) {
      setEmailE('');
    }
    };

  const handleSubmit = () => {
    if ( email.length === 0){
      setEmailE("Enter email first!")
    }
    else if ( cPassword.length === 0){
      setCpasswordE("Enter password")
    }  else{
      LoginAPI()
    }
  }

  const LoginAPI = async () => {
    setSignInLoading(true)
    try {
      const response = await fetch(`https://mchi.org.in/TPJ/api/customerSignin.php?token=3d30b5a19f5e1291c5e1959d00e40029&actionName=LOGIN&emailId=${email}&password=${cPassword}`);
      const json = await response.json();
      console.log("SUCCESS RESULT",json.result)
      if ( json?.status == false) {
        console.log("FAIL RESULT", json)
        console.log(Alert.alert(json?.message))
      } else {
        navigation.navigate('Verify' , {result : json.result})
      }

    } catch (error) {
      Alert.alert(error);
    } finally {
      setSignInLoading(false);
    }
  }

  const otpSend = async () =>{
    setLoading(true)
      try {
        const response = await fetch(`https://mchi.org.in/TPJ/api/customerSigninOTP.php?actionName=LOGINOTP&emailId=${email}`);
        const json = await response.json();
        setSelection(false)
        console.log("SUCCESS RESULT",json.result)
        setOTPResult(json?.result)
        if ( json?.status == false) {
          console.log("FAIL RESULT", json)
          console.log(Alert.alert(json?.message))
        } else {
          setModalVisible(true)
          setOtpModal(true)
        }

      } catch (error) {
        Alert.alert(error);
      } finally {
        setLoading(false);
      }
  }

  const loginOTPHandler = () =>{
   if (email.length === 0) {
    setEmailE('Enter email first');
   } else{
     otpSend()
   }
  }

  const submitOTPHandler = async () => {
    const Id = otpResult?.map((i , index) =>{
      return i?.Id;
    })
    console.log("ID",pin ,  Id[0])
    setLoading(true)
    setOtpLoading(true)
    try {
      const response = await fetch(`https://mchi.org.in/TPJ/api/customerSigninOTP_verification.php?actionName=VERIOTP&otp=${pin}&Id=${Id[0]}`);
      const json = await response.json();
      //console.log(Alert.alert(json?.message))
      if ( json?.status == true) {
        //console.log(Alert.alert(json?.message))
        setOtpModal(false)
        setVerifySuccessfull(true)
      } else {
        setModalVisible(true)
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOtpLoading(false);
    }
  }

  const forgotHandler = () => {
    navigation.navigate('ForgotPassword')
  }
  return (
    <SafeAreaView
      style={
        !modalVisible
          ? {flex: 1, backgroundColor: 'white'}
          : {flex: 1, backgroundColor: '#131212'}
      }>
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
              setEmail(text);
              handleValidEmail(text);
            }}
            placeholder={'Enter Email Id or Mobile No.'}
          />
          {emailE ? <Text style={styles.error}>{emailE}</Text> : null}
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
        <Text style={styles.forgotPassword} onPress={()=>{forgotHandler()}}>Forgot Your Password?</Text>

        <Modal
          transparent={true}
          visible={modalVisible}
          backdropColor={'red'}
          backdropOpacity={1}>
          {modalVisible && (
            <KeyboardAwareScrollView style={{alignSelf: 'center'}}>
              {otpModal && (
                <View style={styles.modal}>
                  <CloseIcon
                    name="close"
                    size={30}
                    style={styles.closeIcon}
                    onPress={() => {
                      setModalVisible(false);
                      setSelection(false);
                    }}
                  />
                  <Image
                    style={{alignSelf: 'center'}}
                    source={require('../Constants/Images/mobileIcon.png')}
                  />
                  <Title style={styles.title} label="OTP Verification" />
                  <Text
                    style={{alignSelf: 'center', fontSize: 15, color: 'green'}}>
                    OTP is sent to your register emailId
                  </Text>
                  <Text
                    style={{alignSelf: 'center', fontSize: 15, marginTop: 10}}>
                    Please enter OTP code
                  </Text>
                  <View>
                    <OTPInputView
                      style={styles.otpView}
                      pinCount={4}
                      autoFocusOnLoad
                      codeInputFieldStyle={styles.underlineStyleBase}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      onCodeFilled={code => {
                        setPin(code);
                      }}
                    />
                  </View>
                  <Text style={styles.receiveOTP}>
                    Didn't receive OTP code ?
                  </Text>
                  <Text style={styles.resendOTP}>Resend Code</Text>
                  {otpLoading && <ActivityIndicator color="#663297" style={styles.loading}/>}
                  <TouchableOpacity onPress={() => submitOTPHandler()}>
                    <Image
                      style={styles.signIn}
                      source={require('../Constants/Images/verify.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {verifySuccessfull && (
                <View style={styles.modal2}>
                  <View>
                    <ImageBackground
                      style={{
                        position: 'absolute',
                        width: 55,
                        height: 55,
                        alignSelf: 'center',
                      }}
                      source={require('../Constants/Images/done.png')}>
                      <Image
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 15,
                        }}
                        source={require('../Constants/Images/done2.png')}
                      />
                    </ImageBackground>
                    <Text
                      style={{
                        marginTop: 60,
                        color: 'green',
                        alignSelf: 'center',
                        fontSize: 20,
                      }}>
                      
                      Verification Successfully
                    </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                    <Image
                      style={{marginTop: 20, alignSelf: 'center'}}
                      source={require('../Constants/Images/ok.png')}
                    />
                    </TouchableOpacity>
                    
                  </View>
                </View>
              )}
            </KeyboardAwareScrollView>
          )}
        </Modal>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={value => setSelection(value)}
            style={styles.checkbox}
            onChange={() => loginOTPHandler()}
          />
          <Text style={styles.label}>Login with OTP</Text>
          {isLoading && (
            <ActivityIndicator color="#663297" style={styles.loading} />
          )}
        </View>
        <View> 
          <TouchableOpacity onPress={() => handleSubmit()}>
          <Button title="Sign In"/>
          </TouchableOpacity>
        </View>
        
      </View>
      {signInLoading && <ActivityIndicator size={30} color="#663297" style={{ marginTop: 20}}/>}
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
    color: 'red',
  },
  title: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 25,
    fontFamily: 'Montserrat',
  },
  titleContainer: {},
  forgotPassword: {
    textAlign: 'right',
    marginTop: 15,
    right: 10,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Montserrat',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 15,
  },
  checkbox: {
    alignSelf: 'center',
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    marginTop: 5,
  },
  label: {
    margin: 8,
    fontSize: 17,
    color: '#333333',
    fontFamily: 'Montserrat',
  },
  signIn: {
    marginTop: 20,
   alignSelf: 'center',
   width: '100%',
   backgroundColor: 'yellow',
   borderRadius: 10
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
    position:'absolute',
    bottom: 10,
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
    fontFamily: 'Montserrat',
  },
  signUpText: {
    color: '#663297',
    fontSize: 18,
    fontFamily: 'Montserrat',
    marginLeft: 3
  },
  modal: {
    backgroundColor: '#fff',
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 80,
    height: 450,
    marginBottom: 80,
    borderRadius: 30
  },
  modal2:{
    backgroundColor: '#fff',
    flex: 1,
    width: 320,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 80,
    height: 450,
    marginBottom: 80,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  closeIcon:{
    alignSelf:'flex-end' ,
    margin: 10
  },
  otpBox:{
    alignSelf: 'center',
    padding: 10,
    height: 50,
    width: '15%',
    borderRadius: 6,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderColor:"white",
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    padding: 5,
    fontSize: 20,
    fontFamily:'Montserrat'
  },
  receiveOTP:{
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20
  },
  resendOTP:{
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center',
    color:'#663297',
    textDecorationLine:'underline'
  }, 
  otpView: {
    marginTop: 15,
    width: '60%',
    height: 50,
    color: 'black',
    alignSelf:'center',
    fontFamily:'Montserrat'
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderColor:"white",
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    padding: 5,
    fontSize: 20,
    color: 'black'
  },
  loading:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }

});