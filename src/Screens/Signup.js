import { StyleSheet,Button, Keyboard, View ,Image,Text,
   Alert, SafeAreaView , TouchableOpacity  , KeyboardAvoidingView , BackHandler , Picker, ScrollView, TouchableWithoutFeedback} from 'react-native'
import React ,{ useState}from 'react'
import CustomInput from '../Components/CustomInput'
import Title from '../Components/Title';
import TitleContent from '../Components/TitleContent';
import CheckBox from '@react-native-community/checkbox';
const globalStyle = require('../Constants/Styles/Style.js')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDown from 'react-native-paper-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';
import InputScrollView from 'react-native-input-scroll-view';

export default function Signup({route , navigation}) { 
  const { companyType } = route.params;
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
  const [companyTypes , setCompanyTypes] = useState("");
  const [companyTypesE , setCompanyTypesE] = useState("");
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
  const [drop , setDrop ] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState();

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


  const handleSubmit = () =>{
    if (firstName.length === 0) {
      setFirstNameE("required");
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
    else if ( companyName.length === 0){
      setCompanyNameE("required")
    }
    else if ( companyTypes.length === 0){
      setCompanyTypesE("required")
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
        Alert.alert("Password Doesn't Match")
      } else {
          SignupAPI()
      }
    
    } 
  }


  const SignupAPI = () =>{
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
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://mchi.org.in/TPJ/api/customerSignup.php?token=3d30b5a19f5e1291c5e1959d00e40029&actionName=INSERT&customerType=${companyType}&firstName=${firstName}&lastName=${lastName}&mobileNo=${mobNo}&what${whatsAppNO}&companyName=${companyName}&emaiIId=${email}&companyType=${companyType}&pincode=${pincode}&state=${state}&city=${city}&confirmPassword=${cPassword}&fcmToken=0`, requestOptions)
      .then(response => response.json())
      .then(result => Alert.alert(result.message))
      .catch(error => Alert.alert(error.message));
  }


  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>   
      <ScrollView >

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
          {companyType === 1 && (
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
          {companyType === 1 && (
            <View>
              <CustomInput
                style={globalStyle.customInput}
                value={companyTypes}
                onChangeText={text => setCompanyTypes(text)}
                placeholder={'Company Type'}
              />
              {companyTypesE.length > 0 && companyTypes.length === 0 && (
                <Text style={styles.error}>{companyTypesE}</Text>
              )}
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
            {cityE.length > 0 && setCity.length === 0 && (
              <Text style={styles.error}>{setCityE}</Text>
            )}
          </View>
          <View>
            <CustomInput
              style={globalStyle.customInput}
              value={nPassword}
              onChangeText={text => setNpassword(text)}
              placeholder={'New Password'}
              
              blurOnSubmit={false}
            />
          </View>
          <View style={{ marginBottom: 20}}>
            <CustomInput
              style={globalStyle.customInput}
              value={cPassword}
              onChangeText={text => setCpassword(text)}
              placeholder={'Confirm Password'}
              
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.bottomCenter}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>
                I accept the Terms of Use & Privacy policy
              </Text>
            </View>

            <TouchableOpacity onPress={() => handleSubmit()}>
              <Image
                style={styles.signIn}
                source={require('../Constants/Images/signup.png')}
              />
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
              }}>
              <View style={styles.bottomContent1}>
                <Text style={styles.accountText}>Already account ?</Text>
              </View>
              <View style={styles.bottomContent2}>
                <Text
                  style={styles.signUpText}
                  onPress={() => navigation.navigate('Login')}>
                  Sign In
                </Text>
              </View>
            </View>
          </View>
          
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
})