import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { FontAwesome } from 'react-native-vector-icons'; 

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    fetch('http://172.23.0.137:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        age: parseInt(age),
        status,
      }),
    })
    
      .then(response => {
        console.log('Response status:', response.status); // Log the response status
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data); // Log the response data
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Status (Student or Particular)"
          value={status}
          onChangeText={setStatus}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="google" size={30} color="#DB4437" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  containerInput: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkButton: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF', 
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 30,
    marginTop: 20,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '50%',
  },
  iconButton: {
    padding: 5,
  },
});

export default SignupScreen;
