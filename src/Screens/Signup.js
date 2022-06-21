import { StyleSheet, Keyboard, View ,Image,Text,
   Alert, SafeAreaView , TouchableOpacity  , Modal , BackHandler , ScrollView, TouchableWithoutFeedback , ActivityIndicator} from 'react-native'
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        //navigation.navigate('Login');
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return false;
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
    setModalVisible(true)
  }

  const renderProductList = () => {
    return productDetails.map((product) => {
      return <Picker.Item label={product.companyType} value={product.Id} key={product.Id}/>
    })
  }

  useEffect(()=>{
   getCompanyTypes()
  }, [])

  const getCompanyTypes = async () =>{
    try {
      const response = await fetch('https://mchi.org.in/TPJ/api/customerType.php?action=GET');
      const json = await response.json();
      console.log(json.result)
      setproductDetails(json?.result);
    } catch (error) {
      console.error(error);
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
    setLoading(true)
      try {
        const response = await fetch(`https://mchi.org.in/TPJ/api/customerSignup.php?token=3d30b5a19f5e1291c5e1959d00e40029&actionName=INSERT&customerType=${userRole}&firstName=${firstName}&lastName=${lastName}&mobileNo=${mobNo}&what${whatsAppNO}&companyName=${companyName}&emaiIId=${email}&companyType=${selectedValue}&pincode=${pincode}&state=${state}&city=${city}&confirmPassword=${cPassword}&fcmToken=0`);
        const jsonS = await response.json();
        console.log(jsonS.result)
        //console.log(Alert.alert(json.message))
        if (jsonS.status == true) {
          navigation.navigate('Welcome' , { result: jsonS?.result})
        } else{
          Alert.alert(jsonS?.message)
        }
       
      } catch (error) {
        Alert.alert(error.message)
      } finally {
        setLoading(false);
      } 
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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

        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
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
            {
              <Modal
                transparent={true}
                visible={modalVisible}
                backdropColor={'red'}
                backdropOpacity={1}>
                {modalVisible && 
                <View style={styles.modal}>
                
                </View>}
              </Modal>
            }
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

            {/* <TouchableOpacity onPress={() => handleSubmit()}>
              <Image
                style={styles.signIn}
                source={require('../Constants/Images/signup.png')}
              />
            </TouchableOpacity> */}
            <View>
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
            <Text style={styles.welcome}></Text>
            <Text style={styles.welcome}></Text>
            <Text style={styles.welcome}></Text>
            <Text style={styles.welcome}></Text>
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
    height: 450,
    marginBottom: 80,
    borderRadius: 30
  },
})