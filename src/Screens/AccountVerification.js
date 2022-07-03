import { SafeAreaView, StyleSheet, Text, View , Alert ,Image , BackHandler, ActivityIndicator } from 'react-native'
import React , { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
export default function AccountVerification({route , navigation}) {
    const { result } = route?.params;
    const [ loading , setLoading] = useState(false)
    const [ data , setData ] = useState([]);

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

    useEffect(()=>{
        console.log("RESULT", result)
        const Id = result.map((i) =>{
            return i.Id;
        })
        console.log("t", Id[0])
        getAccountStatus(Id[0]);
    },[])  

    const getAccountStatus = async (Id ) =>{
        console.log("IIIIIII",JSON.stringify(Id))
        setLoading(true)
        try {
          const response = await fetch(`https://mchi.org.in/TPJ/api/accountUnderReview.php?actionName=CHECK&Id=${(Id)}`);
          const json = await response.json();
          console.log("SUCCESS RESULT 22",json)
          setData(json?.result)
          console.log(Alert.alert(json?.message))

        //   if ( json?.status == false) {
        //     console.log("FAIL RESULT", json)
        //     console.log(Alert.alert(json?.message))
        //   } else {
        //     console.log(Alert.alert(json?.message))
        //   }
    
        } catch (error) {
          Alert.alert(error);
        } finally {
            setLoading(false);
        }
    }
    
   console.log("WELCOME MESSAGE",JSON.stringify(result))
   const name = result.map((item)=>{
       return item?.firstName;
    })

   const welcome_message = data?.map((item)=>{
    return item?.messageDescription;
    }) 

    console.log("WMMMM", JSON.stringify(welcome_message))
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: '30%'}}>
        <Image
          style={styles.logo}
          source={require('../Constants/Images/tpjlogo.png')}
        />
      </View>
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.hi}>Hi , {name}</Text>
        )}
        <View style={styles.welcomeView}>
          <Text style={{fontSize: 18}}>{JSON.stringify(welcome_message)}</Text>
          <Image
            style={styles.aboutUs}
            source={require('../Constants/Images/aboutUs.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        fontSize: 25,
        fontFamily: 'Montserrat',
      },
      aboutUs: {
        marginTop: 20,
        alignSelf: 'center',
      },
      welcomeView: {
        flex: 1,
        margin: 15,
        marginTop: 15,
      },
      hi: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'black',
      },
      logo: {
        width: '100%',
        height: 50,
        marginTop: 20,
      },
      welcomeText: {
        alignSelf: 'center',
        fontSize: 20,
      },
})