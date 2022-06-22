import { SafeAreaView, StyleSheet, Alert, Text, View , Modal  , Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import React , { useState} from 'react'
import LeftArrowIcon from 'react-native-vector-icons/AntDesign'
import CustomInput from '../Components/CustomInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const globalStyle = require('../Constants/Styles/Style.js')
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import Title from '../Components/Title'
import Button from '../Components/Button'

const ForgotPassword = ({navigation}) => {
const [email , setEmail ] = useState("");
const [emailE , setEmailE ] = useState("");
const [isLoading, setLoading] = useState(false);
const [modalVisible , setModalVisible] = useState(false)
const [otpResult , setOTPResult]= useState([]);
const [pin ,setPin] = useState("");
const [verifySuccessfull , setVerifySuccessfull] = useState(false);
const [otpModal , setOtpModal] = useState(false);
const [otpLoading , setOtpLoading] = useState(false);
const [signInLoading , setSignInLoading] = useState(false);
const [isMessageVisible ,setIsMessageVisible] = useState(false)
const [message , setMessage ] = useState("");
const [validMessage , isValidMessage] = useState(false)


const sendButtonHandler = () =>{
  isValidMessage(false)
    if (email.length === 0) {
      setEmailE('enter email address');
    } else{
        forgotAPI()
    }  
}

const resendOTPHandler = () =>{
  setIsMessageVisible(false);
  isValidMessage(false)
  forgotAPI();
}

const forgotAPI = async () =>{
   // isMessageVisible(false)
   setIsMessageVisible(false)
    setLoading(true)
    try {
      const response = await fetch(`https://mchi.org.in/TPJ/api/customerSigninOTP.php?actionName=LOGINOTP&emailId=${email}`);
      const json = await response.json();
      //setSelection(false)
      console.log("SUCCESS RESULT",json.result)
      setOTPResult(json?.result)
      if ( json?.status == false) {
        console.log("FAIL RESULT", json)
        console.log(Alert.alert(json?.message))
      } else {
         setModalVisible(true)
         setIsMessageVisible(true)
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
}

const submitOTPHandler = async () =>{
  isValidMessage(false)
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
          navigation.navigate('NewPassword' , {userDetails : json?.result})
        } else {
            //console.log(Alert.alert(json?.message))
            setModalVisible(true)
            setMessage(json.message)
            isValidMessage(true)
        }
  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setOtpLoading(false);
      }
}


return (
  <SafeAreaView
    style={
      !modalVisible
        ? {flex: 1, backgroundColor: 'white'}
        : {flex: 1, backgroundColor: '#131212' , opacity: 0.5}
    }>
    <KeyboardAwareScrollView>
      <View style={styles.leftView}>
        <LeftArrowIcon
          name="left"
          size={25}
          style={styles.leftArrow}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
      <View>
        <Image
          style={styles.email}
          source={require('../Constants/Images/email.png')}
        />
        <Modal
          transparent={true}
          visible={modalVisible}
          backdropColor={'red'}
          backdropOpacity={1}>
          {modalVisible && (
            <KeyboardAwareScrollView style={{alignSelf: 'center'}}>
              <View style={styles.modal}>
                <CloseIcon
                  name="close"
                  size={30}
                  style={styles.closeIcon}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../Constants/Images/mobileIcon.png')}
                />
                <Title style={styles.title} label="OTP Verification" />
                {isMessageVisible && (
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 15,
                        color: 'green',
                      }}>
                      OTP is sent to your register emailId
                    </Text>
                  )}
                {!isMessageVisible && (
                    <ActivityIndicator color="#663297" style={styles.loading} />
                  )}
                <Text
                  style={{alignSelf: 'center', fontSize: 15, marginTop: 10 }}>
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
                {validMessage && (
                    <Text style={{alignSelf: 'center', color: 'red'}}>
                      {message}
                    </Text>
                  )}
                <Text style={styles.receiveOTP}>Didn't receive OTP code ?</Text>
                <Text style={styles.resendOTP} onPress={() => resendOTPHandler()}>Resend Code</Text>
                {otpLoading && (
                  <ActivityIndicator color="#663297" style={styles.loading} />
                )}
                <View >
                  <TouchableOpacity onPress={() => submitOTPHandler()}>
                    <Button title="Verify & Proceed" />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          )}
        </Modal>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            marginTop: 20,
            color: '#000',
          }}>
          {'Enter the email address'}{' '}
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 18, color: '#000'}}>
          {'Associated with your account'}{' '}
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 16, marginTop: 15}}>
          {'We will email you an'}{' '}
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 16}}>
          {'OTP to your email address'}{' '}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <CustomInput
          style={globalStyle.customInput}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Enter Email Id'}
        />
        {emailE ? <Text style={styles.error}>{emailE}</Text> : null}
        {isLoading && (
          <ActivityIndicator color="#663297" style={{alignSelf: 'center'}} />
        )}
        <View>
          <TouchableOpacity onPress={() => sendButtonHandler()}>
            <Button title="Send" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  </SafeAreaView>
);
}

export default ForgotPassword

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 25,
    fontFamily: 'Montserrat',
  },
  leftView: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: '#663297',
    marginTop: 25,
    marginLeft: 15,
  },
  leftArrow: {
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: 6,
  },
  email: {
    alignSelf: 'center',
    marginTop: 70,
  },
  error: {
    marginLeft: 15,
    color: 'red',
  },
  modal: {
    backgroundColor: '#fff',
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 80,
    marginBottom: 80,
    borderRadius: 30,
    padding: 20,
   
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  otpBox: {
    alignSelf: 'center',
    padding: 10,
    height: 50,
    width: '15%',
    borderRadius: 6,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderColor: 'white',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    padding: 5,
    fontSize: 20,
    fontFamily: 'Montserrat',
  },
  receiveOTP: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
  },
  resendOTP: {
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center',
    color: '#663297',
    textDecorationLine: 'underline',
  },
  otpView: {
    width: '80%',
    height: 50,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'Montserrat',
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderColor: 'white',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    padding: 5,
    fontSize: 20,
    color: 'black',
  },
  loading: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});