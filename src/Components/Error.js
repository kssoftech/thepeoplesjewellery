import { StyleSheet , View , Text } from 'react-native'


export const Error = ({ display = false }) => {
  
    const viewStyles = [styles.error, { opacity: 0 }];
  
    if (display) {
      viewStyles.push({ opacity: 1 });
    }
  
    return (
      <View>
        <Text style={styles.errorText}>X</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    error: {
        backgroundColor: '#cc0011',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
    errorText: {
        color: 'red',
        fontSize: 10,
        fontWeight: 'bold',
      },
  })