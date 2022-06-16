import { StyleSheet, Text, View , TextInput } from 'react-native'
import React from 'react'

export default function CustomInput(props) {
  return (
    <View>
      <TextInput
        style={props.style} 
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor="#666666"
        blurOnSubmit={props.blurOnSubmit}
         
      />
    </View>
  )
}

const styles = StyleSheet.create({})