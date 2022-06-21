import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Picker() {

const renderProductList = () => {
    return productDetails.map((product) => {
       return <Picker.Item label={product.productName} value={product} />
    })
}

return (
    <View>
      <Picker
        selectedValue={selectedValue}
        style={{height: 40, width: 150}}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
        }}
      >
        {renderProductList()}

      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({})