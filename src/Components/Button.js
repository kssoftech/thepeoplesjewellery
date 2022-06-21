import { StyleSheet, Text, View , ImageBackground } from 'react-native'
import React from 'react'

export default function Button(props) {
  return (
    <View style={{ height: 45 , margin: 10 , alignItems:'center'}}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../Constants/Images/btnBackground.png')}>
        <Text
          style={styles.text}>
          {props.title}
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 7,
    color: '#fff',
    textAlign: 'center',
  },
  imageBackground: {
    height: 45,
    width: '100%',
    margin: 10,
    alignItems: 'center',
  },
});