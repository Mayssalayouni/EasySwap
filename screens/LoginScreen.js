// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Pour l'icône de flèche de retour
// import { FontAwesome } from 'react-native-vector-icons'; // Pour les icônes de médias sociaux

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Fonction pour gérer la connexion
//   const handleLogin = () => {
//     // Validation simple des champs
//     if (!email || !password) {
//       Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
//       return;
//     }

//     fetch('http://192.168.207.253:3001/login', { // Remplacez par l'URL de votre API
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Erreur de réseau');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data.error) {
//           Alert.alert('Erreur', data.error); // Afficher le message d'erreur
//         } else {
//           Alert.alert('Succès', data.message); // Afficher le message de succès

//           // Stockage des données utilisateur dans le stockage local ou l'état
//           const user = {
//             id:data.user.id,
//             name: data.user.name,
//             email: data.user.email,
//             profileImage: data.user.profileImage,
//           };

//           // Navigation vers l'accueil et passage des données utilisateur
//           navigation.navigate('Home', { user });
//         }
//       })
//       .catch(error => {
//         console.error('Erreur:', error);
//         Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.'); // Message d'erreur générique
//       });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Bouton de flèche de retour */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
//         <Icon name="arrow-back" size={24} color="#333" />
//       </TouchableOpacity>

//       <Image source={require('../assets/logo.png')} style={styles.logo} />

//       <View style={styles.containerInput}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           placeholderTextColor="#aaa"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Mot de passe"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholderTextColor="#aaa"
//         />
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Connexion</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.linkButton}
//           onPress={() => navigation.navigate('Signup')}
//         >
//           <Text style={styles.linkText}>Vous n'avez pas de compte ? Inscrivez-vous</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Icônes des réseaux sociaux */}
//       <View style={styles.socialIconsContainer}>
//         <TouchableOpacity style={styles.iconButton}>
//           <FontAwesome name="facebook" size={30} color="#3b5998" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <FontAwesome name="google" size={30} color="#DB4437" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#f8f8f8',
//     alignItems: 'center',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 20,
//   },
//   containerInput: {
//     width: '80%',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     borderRadius: 20,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   linkButton: {
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#007BFF',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   logo: {
//     width: 250,
//     height: 200,
//     marginBottom: 30,
//     marginTop: 20,
//   },
//   socialIconsContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     justifyContent: 'space-between',
//     width: '40%',
//   },
//   iconButton: {
//     padding: 20,
//   },
// });
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { FontAwesome } from 'react-native-vector-icons';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Fonction pour gérer la connexion
//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://192.168.1.16:3001/login', { email, password });
//       const { token, user } = response.data;
      
//       await AsyncStorage.setItem('token', token);

//       Alert.alert('Succès', 'Connexion réussie');
//       navigation.navigate('Home', { user });
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message); // Affiche l'erreur complète
//       Alert.alert('Erreur', 'Email ou mot de passe incorrect');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Bouton de flèche de retour */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
//         <Icon name="arrow-back" size={24} color="#333" />
//       </TouchableOpacity>

//       {/* Logo */}
//       <Image source={require('../assets/logo.png')} style={styles.logo} />

//       <View style={styles.containerInput}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           placeholderTextColor="#aaa"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Mot de passe"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholderTextColor="#aaa"
//         />
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Connexion</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.linkButton}
//           onPress={() => navigation.navigate('Signup')}
//         >
//           <Text style={styles.linkText}>Vous n'avez pas de compte ? Inscrivez-vous</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Icônes des réseaux sociaux */}
//       <View style={styles.socialIconsContainer}>
//         <TouchableOpacity style={styles.iconButton}>
//           <FontAwesome name="facebook" size={30} color="#3b5998" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <FontAwesome name="google" size={30} color="#DB4437" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#f8f8f8',
//     alignItems: 'center',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 20,
//   },
//   containerInput: {
//     width: '80%',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     borderRadius: 20,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   linkButton: {
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#007BFF',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   logo: {
//     width: 250,
//     height: 200,
//     marginBottom: 30,
//     marginTop: 20,
//   },
//   socialIconsContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     justifyContent: 'space-between',
//     width: '40%',
//   },
//   iconButton: {
//     padding: 20,
//   },
// });

// export default LoginScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from 'react-native-vector-icons';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.16:3001/login', { email, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token); // Stockage du token
      await AsyncStorage.setItem('userId', user.id.toString()); // Stockage de l'ID utilisateur

      Alert.alert('Succès', 'Connexion réussie');
      navigation.navigate('Home', { user }); // Navigation vers l'écran Home avec l'utilisateur
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
    }
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
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.linkText}>Vous n'avez pas de compte ? Inscrivez-vous</Text>
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
};

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
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
    marginTop: 20,
    justifyContent: 'space-between',
    width: '40%',
  },
  iconButton: {
    padding: 20,
  },
});

export default LoginScreen;
