
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/welcome.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to EasySwap</Text>

      <Text style={styles.sloganText}>Buy & sell on your local second-hand EasySwap</Text>
      <Text style={styles.joinus}>Be part of the community </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.loginButton]} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonTextlog}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.signupButton]} 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonTexts}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
    marginTop: -50,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', 
  },
  sloganText:{
    fontSize: 15,
    marginBottom: 150,
    color: '#6f6c6c', 
  },
  joinus:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6f6c6c', 
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    //flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 30, 
    borderWidth: 1,
    borderColor: "#007BFF",

  },
  loginButton: {
    backgroundColor: '#007BFF', 
  },
  signupButton: {
    backgroundColor: '#f8f8f8', 
  },
  buttonTextlog: {
    color: '#ffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTexts: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
