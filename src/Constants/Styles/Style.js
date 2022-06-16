'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    customInput: {
        height: 40,
        margin: 10,
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
});