// // screens/ProfileScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AppBar from '../components/AppBar';

// const ProfileScreen = ({ navigation }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Remplacez par votre logique pour obtenir l'ID de l'utilisateur connecté
//     const userId = 1; // Remplacez ceci par l'ID de l'utilisateur authentifié

//     // Fonction pour obtenir les informations de l'utilisateur
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch ('http://192.168.207.253:3001/profile/$UserId');
//         if (!response.ok) {
//           throw new Error('Failed to fetch user profile');
//         }
//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Vérifiez si l'utilisateur est encore en cours de chargement
//   if (!user) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   const menuItems = [
//     { label: 'Edit Profile', icon: 'person', action: () => navigation.navigate('EditProfile', { user }) },
//     { label: 'My Orders', icon: 'shopping-cart', action: () => navigation.navigate('MyOrders') },
//     { label: 'My annonces', icon: 'article', action: () => navigation.navigate('Announcements') },
//     { label: 'Logout', icon: 'exit-to-app', action: () => console.log('Logging out...') },
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.menuItem} onPress={item.action}>
//       <View style={styles.iconContainer}>
//         <Icon name={item.icon} size={24} color="#007BFF" />
//       </View>
//       <Text style={styles.label}>{item.label}</Text>
//       <Icon name="chevron-right" size={24} color="#666" style={styles.arrow} />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <AppBar title="Profile" />
//       <View style={styles.profileContainer}>
//         <Image source={{ uri: user.profileImage || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
//         <Text style={styles.userName}>{user.name}</Text>
//         <Text style={styles.userEmail}>{user.email}</Text>
//       </View>
//       <FlatList
//         data={menuItems}
//         keyExtractor={(item) => item.label}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f4f8',
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     padding: 30,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     marginBottom: 40,
//     marginTop: 20,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: '#007BFF',
//     marginBottom: 15,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   userEmail: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   listContent: {
//     flexGrow: 1,
//     paddingBottom: 20,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginVertical: 5,
//     elevation: 2,
//   },
//   iconContainer: {
//     marginRight: 10,
//   },
//   label: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   arrow: {
//     marginLeft: 10,
//   },
// });
// export default ProfileScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      Alert.alert('Erreur', 'Vous devez vous connecter');
      navigation.navigate('LoginScreen');
      return;
    }

    try {
      const response = await axios.get('http://192.168.1.16:3001/profile', {
        headers: { Authorization: token },
      });
      setProfile(response.data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer le profil');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  const menuItems = [
    { label: 'Modifier le profil', icon: 'person', action: () => navigation.navigate('EditProfile', { profile }) },
    { label: 'Mes commandes', icon: 'shopping-cart', action: () => navigation.navigate('MyOrders') },
    { label: 'Mes annonces', icon: 'article', action: () => navigation.navigate('UserProducts') },
    { label: 'Déconnexion', icon: 'exit-to-app', action: async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('LoginScreen');
      }
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.action}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#007BFF" />
      </View>
      <Text style={styles.label}>{item.label}</Text>
      <Icon name="chevron-right" size={24} color="#666" style={styles.arrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profile.profileImage || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.userEmail}>{profile.email}</Text>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 40,
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007BFF',
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    marginLeft: 10,
  },
});

export default ProfileScreen;
