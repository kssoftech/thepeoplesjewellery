import { StyleSheet, Keyboard, View ,Image,Text,
   Alert, SafeAreaView , TouchableOpacity  , Modal , BackHandler , ImageBackground, TouchableWithoutFeedback , ActivityIndicator} from 'react-native'
import React ,{ useEffect, useState}from 'react'
import CustomInput from '../Components/CustomInput'
import Title from '../Components/Title';
import TitleContent from '../Components/TitleContent';
import CheckBox from '@react-native-community/checkbox';
const globalStyle = require('../Constants/Styles/Style.js')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Components/Button';
import DangerIcon from 'react-native-vector-icons/AntDesign';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import OTPInputView from '@twotalltotems/react-native-otp-input';


export default function Signup({route , navigation}) { 
  const { userRole } = route.params;
  const [ firstName, setFirstName] = useState("");
  const [ firstNameE, setFirstNameE] = useState("");
  const [ lastName, setLastName] = useState("");
  const [ lastNameE, setLastNameE] = useState("");
  const [mobNo , setMobNo] = useState("");
  const [mobNoE , setMobNoE] = useState("");
  const [ whatsAppNO , setWhatsAppNo] = useState("");
  const [ whatsAppNOE , setWhatsAppNoE] = useState("");
  const [email , setEmail ] = useState("");
  const [emailE , setEmailE ] = useState("");
  const [companyName , setCompanyName] = useState("");
  const [companyNameE , setCompanyNameE] = useState("");
  const [companyTypes , setCompanyTypes] = useState([]);
  const [pincode, setPincode] = useState("");
  const [pincodeE, setPincodeE] = useState("");
  const [state , setState] = useState("");
  const [stateE , setStateE] = useState("");
  const [city , setCity]= useState("");
  const [cityE , setCityE]= useState("");
  const [nPassword, setNpassword] = useState("");
  const [nPasswordE, setNpasswordE] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [cPasswordE, setCpasswordE] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [productDetails , setproductDetails] = useState([]);
  const [modalVisible , setModalVisible] = useState(false);
  const [isLoadingIndicator , setIsLoadingIndicator] = useState(true)
  const [policymodalVisible , setPolicyModalVisible] = useState(false);
  const [isMessageVisible ,setIsMessageVisible] = useState(false)
  const [message , setMessage ] = useState("");
  const [validMessage , isValidMessage] = useState(false);
  const [otpResult , setOTPResult]= useState([]);
  const [verifySuccessfull , setVerifySuccessfull] = useState(false);
  const [otpModal , setOtpModal] = useState(false);
  const [otpLoading , setOtpLoading] = useState(false);
  const [pin ,setPin] = useState("");
  const [ welcomeResult , setWelcomeResult ] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        //navigation.navigate('Login');
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        setPolicyModalVisible(true)
        return true;
      };
 
      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
 
      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );

  const onPrivacyHandler = () =>{
   // setPolicyModalVisible(true)
 
  }

  const renderProductList = () => {
    return productDetails.map((product) => {
      return <Picker.Item label={product.companyType} value={product.Id} key={product.Id}/>
    })
  }

  useEffect(()=>{
   getCompanyTypes()
  }, [userRole])

  const getCompanyTypes = async () =>{
    try {
      const response = await fetch('https://mchi.org.in/TPJ/api/customerType.php?action=GET');
      const json = await response.json();
      console.log(json.result)
      setproductDetails(json?.result);
      setIsLoadingIndicator(false);
    } catch (error) {
      Alert.alert(error.message);
      setIsLoadingIndicator(false);
    }
  }

  const submitOTPHandler = async () => {
    const Id = otpResult?.map((i , index) =>{
      return i?.insertId;
    })

    console.log("ID",pin ,  Id[0])
    setLoading(true)
    setOtpLoading(true)
    try {
      const response = await fetch(`https://mchi.org.in/TPJ/api/customerSigninOTP_verification.php?actionName=VERIOTP&otp=${pin}&Id=${Id[0]}`);
      const json = await response.json();
      console.log((json))

      if ( json?.status == true) {
        //console.log(Alert.alert(json?.message))
        console.log("SUBMIT OTP " , json.result)
        setWelcomeResult(json?.result)
        setOtpModal(false)
        setVerifySuccessfull(true)
        setModalVisible(true)
      } else {
        setModalVisible(true)
        setMessage(json.message)
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOtpLoading(false);
    }
  }

  const resendOTPHandler = () =>{
    setIsMessageVisible(false);
    isValidMessage(false)
    otpSend(email);
  }

  const otpSend = async () =>{
    console.log("EmAIL" , email)
   // setLoading(false)
    isValidMessage(false)
    //setLoading(true)
      try {
        const response = await fetch(`https://mchi.org.in/TPJ/api/customerSigninOTP.php?actionName=LOGINOTP&emailId=${email}`);
        const json = await response.json();
        setSelection(false)
        console.log("SUCCESS RESULT",json.result)
        setOTPResult(json?.result)
        if ( json?.status == false) {
          console.log("FAIL RESULT", json)
          //console.log(Alert.alert(json?.message))
        } else {
          setModalVisible(true)
          setOtpModal(true)
          setIsMessageVisible(true)
          isValidMessage(true)
        }

      } catch (error) {
        Alert.alert(error);
      } finally {
        setLoading(false);
      }
  }


  const handleSubmit = () =>{
    console.log( firstName , lastName , mobNo , whatsAppNO , email , pincode ,companyName , state , city , cPassword , selectedValue )
    if (firstName.length === 0 || lastName.length === 0 || 
      mobNo.length === 0  || whatsAppNO.length === 0 || 
      email.length === 0 || pincode.length === 0 ||
      state.length === 0 || city.length === 0 || nPassword.length === 0 ||
      cPassword.length === 0
      ) {
      setFirstNameE("required")
      setLastNameE("required")
      setMobNoE("required")
      setWhatsAppNoE("required")
      setEmailE("required")
      setCompanyNameE("required")
      setPincodeE("required")
      setStateE("required")
      setCityE("required")
      setNpasswordE("required")
      setCpasswordE("required")
    } 
    else if ( lastName.length === 0){
      setLastNameE("required")
    }
    else if ( mobNo.length === 0){
      setMobNoE("required")
    }
    else if ( whatsAppNO.length === 0){
      setWhatsAppNoE("required")
    }
    else if ( email.length === 0){
      setEmailE("required")
    }
    else if ( pincode.length === 0){
      setPincodeE("required")
    }
    else if ( state.length === 0){
      setStateE("required")
    }
    else if ( city.length === 0){
      setCityE("required")
    }
    else if ( nPassword.length === 0){
      setNpasswordE("required")
    }
    else if ( cPassword.length === 0){
      setCpasswordE("required")
    } 
    else {
      if (nPassword !== cPassword ) {
        setNpasswordE("New Password and Confirm Password are not same.")
        setCpasswordE("New Password and Confirm Password are not same.")
      } else {
          SignupAPI()
      }
    
    } 
  }

  const SignupAPI = async () =>{
    setLoading(true)
      try {
        const response = await fetch(`https://mchi.org.in/TPJ/api/customerSignup.php?token=3d30b5a19f5e1291c5e1959d00e40029&actionName=INSERT&customerType=${userRole}&firstName=${firstName}&lastName=${lastName}&mobileNo=${mobNo}&what${whatsAppNO}&companyName=${companyName}&emaiIId=${email}&companyType=${selectedValue}&pincode=${pincode}&state=${state}&city=${city}&confirmPassword=${cPassword}&fcmToken=0`);
        const jsonS = await response.json();
        console.log("RESULT--",jsonS)
        //console.log(Alert.alert(json.message))
        if (jsonS?.status == true) {
          setOTPResult(jsonS?.result)
          setModalVisible(true)
          setOtpModal(true)
          setIsMessageVisible(true)
          isValidMessage(true)
          //navigation.navigate('Welcome' , { result: jsonS?.result})
        } else{
          Alert.alert(jsonS?.message)
        }
       
      } catch (error) {
        Alert.alert(error.message)
      } finally {
        setLoading(false);
      } 

      setFirstName("")
      setLastName("")
      setMobNo("")
      setWhatsAppNo("")
      setEmail("")
      setCompanyName("")
      setCompanyTypes("")
      setPincode("")
      setState("")
      setPincode("")
      setCity("")
      setNpassword("")
      setCpassword("")
  }

  return (
    <SafeAreaView
      style={
        !modalVisible
          ? {flex: 1, backgroundColor: 'white'}
          : {flex: 1, backgroundColor: '#131212', opacity: 0.8}
      }>
      <View>
        <View style={{marginTop: '10%'}}>
          <Image
            style={{
              width: '100%',
              height: 50,
            }}
            source={require('../Constants/Images/tpjlogo.png')}
          />
        </View>
        <View style={styles.titleContainer}>
          <Title style={styles.title} label="Sign Up" />
        </View>
        <TitleContent
          style={styles.titleContent}
          content={`Before you Sign Up, we would \n like to know that`}
        />

        <View
          style={
            !modalVisible
              ? {height: '100%', width: '100%', backgroundColor: 'white'}
              : {
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#131212',
                  opacity: 0.8,
                }
          }>
          <KeyboardAwareScrollView>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={firstName}
                onChangeText={text => setFirstName(text)}
                placeholder={'First Name'}
              />
              {firstNameE.length > 0 && firstName.length === 0 && (
                <Text style={styles.error}>{firstNameE}</Text>
              )}
            </View>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={lastName}
                onChangeText={text => setLastName(text)}
                placeholder={'Last Name'}
              />
              {lastNameE.length > 0 && lastName.length === 0 && (
                <Text style={styles.error}>{lastNameE}</Text>
              )}
            </View>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={mobNo}
                onChangeText={text => setMobNo(text)}
                placeholder={'Mobile No.'}
                keyboardType="number-pad"
              />
              {mobNoE.length > 0 && mobNo.length === 0 && (
                <Text style={styles.error}>{mobNoE}</Text>
              )}
            </View>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={whatsAppNO}
                onChangeText={text => setWhatsAppNo(text)}
                placeholder={'Whats App Mobile No.'}
                keyboardType="number-pad"
              />
              {whatsAppNOE.length > 0 && whatsAppNO.length === 0 && (
                <Text style={styles.error}>{whatsAppNOE}</Text>
              )}
            </View>
            {/* <Modal
              transparent={true}
              visible={policymodalVisible}
              backdropColor={'red'}
              backdropOpacity={1}>
              {policymodalVisible && (
                <KeyboardAwareScrollView style={{alignSelf: 'center'}}>
                  <View style={styles.modal}>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        alignSelf: 'center',
                        marginTop: '10%',
                        backgroundColor: 'red',
                      }}>
                      <DangerIcon
                        name="warning"
                        size={40}
                        style={{
                          alignSelf: 'center',
                          marginTop: 5,
                          color: '#fff',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 22,
                        alignSelf: 'center',
                        color: 'black',
                      }}>
                      Data Loss warning
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: 'center',
                        padding: 5,
                      }}>
                      {
                        'All form fields are not filled up and your \n data will be lost if you leave this screen.'
                      }
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      {'Do you still wish to leave the'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {'Sign Up screen ?'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          width: '40%',
                          borderRadius: 6,
                         // backgroundColor: 'black',
                          alignSelf: 'center',
                          height: 45,
                          marginTop: 20,
                          marginRight: 20,
                          marginBottom: 20,
                        }}>
                        
                        <ImageBackground
                          source={require('../Constants/Images/btnBackground.png')}
                          imageStyle={{borderRadius: 6}}
                          resizeMode="cover"
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            borderRadius: 6,
                          }}>
                          <TouchableOpacity onPress={() =>{   BackHandler.exitApp();}}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#fff',
                              alignSelf: 'center',
                            }}>
                            Ok
                          </Text>

                          </TouchableOpacity>
                        </ImageBackground>
                       
                        
                      </View>
                      <View
                        style={{
                          width: '40%',
                          borderRadius: 6,
                          backgroundColor: 'black',
                          alignSelf: 'center',
                          height: 45,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setPolicyModalVisible(false);
                            setSelection(false);
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 18,
                              alignSelf: 'center',
                              marginTop: 7,
                            }}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              )}
            </Modal> */}
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
                        <ActivityIndicator
                          color="#663297"
                          style={styles.loading}
                        />
                      )}

                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 15,
                          marginTop: 10,
                        }}>
                        Please enter OTP code
                      </Text>
                      <View>
                        <OTPInputView
                          style={styles.otpView}
                          pinCount={4}
                          autoFocusOnLoad
                          codeInputFieldStyle={styles.underlineStyleBase}
                          codeInputHighlightStyle={
                            styles.underlineStyleHighLighted
                          }
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

                      <Text style={styles.receiveOTP}>
                        Didn't receive OTP code ?
                      </Text>
                      <Text
                        style={styles.resendOTP}
                        onPress={() => resendOTPHandler()}>
                        Resend Code
                      </Text>
                      {otpLoading && (
                        <ActivityIndicator
                          color="#663297"
                          style={styles.loading}
                        />
                      )}
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
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Welcome' , { result : welcomeResult})}>
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

            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder={'Email Id'}
              />
              {emailE.length > 0 && email.length === 0 && (
                <Text style={styles.error}>{emailE}</Text>
              )}
            </View>
            {userRole === 1 && (
              <View>
                <CustomInput
                  style={globalStyle.customInput}
                  value={companyName}
                  onChangeText={text => setCompanyName(text)}
                  placeholder={'Company Name'}
                />
                {companyNameE.length > 0 && companyName.length === 0 && (
                  <Text style={styles.error}>{companyNameE}</Text>
                )}
              </View>
            )}
            {userRole === 1 && (
              <View
                style={{
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: 'gray',
                  backgroundColor: '#fff',
                  margin: 10,
                  height: 45,
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: 1},
                  shadowOpacity: 0.2,
                }}>
                {isLoadingIndicator && (
                  <ActivityIndicator
                    size={30}
                    color="#663297"
                    style={{marginTop: 40}}
                  />
                )}
                <Picker
                  selectedValue={selectedValue}
                  //style={{ }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                  }}>
                  {renderProductList()}
                </Picker>
              </View>
            )}
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={pincode}
                onChangeText={text => setPincode(text)}
                placeholder={'Pincode'}
                keyboardType="number-pad"
              />
              {pincodeE.length > 0 && pincode.length === 0 && (
                <Text style={styles.error}>{pincodeE}</Text>
              )}
            </View>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={state}
                onChangeText={text => setState(text)}
                placeholder={'State'}
              />
              {stateE.length > 0 && state.length === 0 && (
                <Text style={styles.error}>{stateE}</Text>
              )}
            </View>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={city}
                onChangeText={text => setCity(text)}
                placeholder={'City'}
              />
              {cityE.length > 0 && city.length === 0 && (
                <Text style={styles.error}>{cityE}</Text>
              )}
            </View>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={nPassword}
                onChangeText={text => setNpassword(text)}
                placeholder={'New Password'}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
              {nPasswordE.length > 0 && nPassword.length === 0 && (
                <Text style={styles.error}>{nPasswordE}</Text>
              )}
            </View>
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={cPassword}
                onChangeText={text => setCpassword(text)}
                placeholder={'Confirm Password'}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
              {cPasswordE.length > 0 && cPassword.length === 0 && (
                <Text style={styles.error}>{cPasswordE}</Text>
              )}
            </View>
            {isLoading && (
              <ActivityIndicator
                size={30}
                color="#663297"
                style={{marginTop: 20}}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                onChange={() => onPrivacyHandler()}
              />
              <Text style={styles.label}>
                I accept the Terms of Use & Privacy policy
              </Text>
            </View>
            <View style={modalVisible ? {opacity: 0.3} : {opacity: 1}}>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Button title="Sign Up" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.accountText}>
                  Already have an account ?
                </Text>
                <Text
                  style={styles.signUpText}
                  onPress={() => navigation.navigate('Login')}>
                  Sign In
                </Text>
              </View>
            </View>
            <View
              style={
                !modalVisible
                  ? {flex: 1, backgroundColor: 'white'}
                  : {
                      flex: 1,
                      backgroundColor: '#131212',
                      opacity: 0.8,
                      marginTop: 45,
                    }
              }>
              <Text style={styles.welcome}></Text>
              <Text style={styles.welcome}></Text>
              <Text style={styles.welcome}></Text>
              <Text style={styles.welcome}></Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  },
  error: {
    marginLeft: 15, 
    color: 'red'},
  scroll: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
  },
  titleContent: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop:'2%',
    fontSize: 20,
    fontFamily:'Montserrat'
  },
  input: {
    height: 45,
    margin: 10,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderColor:"white",
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    padding: 10,
    fontSize: 20,
    elevation:3
  },
  inputSelect: {
    height: 45,
    margin:10
  }, 
  signIn:{
    marginBottom: 5,
    marginTop: 15
  },
  checkbox: {
    alignSelf: 'center',
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginTop: 5
  },
  label: {
    margin: 8,
    fontSize: 16,
    color: '#333333',
    fontFamily:'Montserrat'
  },
  bottomCenter: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    bottom: 20,
    fontSize: 20,
    alignItems: 'center',
    height: '16%',
    width: '100%'
  },
  bottomCenter2: {
    backgroundColor:'yellow',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '10%',
    fontSize: 20,
    alignItems: 'center'
  },
  bottomCenter3: {
    backgroundColor:'red',
    position: 'absolute',
    bottom: '5%',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContent1: {
    marginLeft: '7%',
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
  modal: {
    backgroundColor: '#fff',
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 80,
    marginBottom: 60,
    borderRadius: 30,
    paddingBottom: 30
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
    fontFamily:'Montserrat',
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
})