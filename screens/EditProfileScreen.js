import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Importer axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Pour stocker le token

const UpdateProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Load the user's current profile data when the component mounts
    const loadProfileData = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedAge = await AsyncStorage.getItem('age');
      
      if (storedEmail) setEmail(storedEmail);
      if (storedAge) setAge(storedAge);
    };

    loadProfileData();
  }, []);

  const updateProfile = async () => {
    if (!email || !age) {
      Alert.alert('Erreur', 'L\'email et l\'âge sont obligatoires.');
      return;
    }

    try {
      // Get the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      
      // Remplacement de fetch par axios
      const response = await axios.post('http:/192.168.1.16:3001/update-profile', {
        email,
        age,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajout du token dans les headers
        },
      });

      if (response.status === 200) {
        Alert.alert('Succès', response.data.message);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erreur', response.data.error);
      }
    } catch (error) {
      Alert.alert('Erreur', `Une erreur s'est produite : ${error.message}`);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Âge</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Âge"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Mot de passe (facultatif)</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
      />
      <Button title="Mettre à jour" onPress={updateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default UpdateProfileScreen;
