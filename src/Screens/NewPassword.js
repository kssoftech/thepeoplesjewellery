
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

const NewPassword = ({route , navigation}) => {
    const { userDetails } =  route.params;

    const [nPassword, setNpassword] = useState("");
    const [nPasswordE, setNpasswordE] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [cPasswordE, setCpasswordE] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [email , setEmail ] = useState("");
    const [emailE , setEmailE ] = useState("");
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

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, []),
    );

  const handleSubmit = () => {  
    if ( nPassword.length === 0){
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
            console.log("USERDetails", userDetails)
            let Id = "";
            let token = "";
            const id = userDetails.map((i , index) =>{
               return i?.Id
            })
            const tkn = userDetails.map((i , index) =>{
                return i?.token
             })
            console.log(id[0] , tkn[0] )
            resetPasswordAPI(id[0] , tkn[0])
        }
      
      } 
  }

  const resetPasswordAPI = async (id , token ) =>{
    setLoading(true)
    try {
      const response = await fetch(`https://mchi.org.in/TPJ/api/resetPassword.php?actionName=RESETPASS&Id=${id}&newPassword=${cPassword}&token=${token}`);
      const json = await response.json();
      console.log("SUCCESS RESULT",json.result)
      if ( json?.status == false) {
        console.log("FAIL RESULT", json)
        console.log(Alert.alert(json?.message))
      } else {
        navigation.navigate('Login')
      }

    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: '30%'}}>
        <KeyboardAwareScrollView>
          <Image
            style={{
              width: '100%',
              height: 50,
            }}
            source={require('../Constants/Images/tpjlogo.png')}
          />
          <Text style={{color: 'black', fontSize: 22, alignSelf: 'center'}}>
            Create New Password
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15}}>
            Set your new password so you can{' '}
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 18}}>
            Login and access.
          </Text>
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
              style={{marginTop: 10 , marginBottom: 10}}
            />
          )}
          <TouchableOpacity onPress={() => handleSubmit()}>
          <Image
             style={{
                width: '100%',
                height: 50,
              }}
            source={require('../Constants/Images/resetPassword.png')}
          />
        </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

export default NewPassword

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        fontSize: 25,
        fontFamily: 'Montserrat',
      },
})