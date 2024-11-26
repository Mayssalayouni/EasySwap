// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AppBar = ({ title }) => {
//   const [isSearching, setIsSearching] = useState(false); // État pour afficher ou cacher la barre de recherche
//   const [searchQuery, setSearchQuery] = useState(''); // État pour stocker la requête de recherche
//   const navigation = useNavigation();

//   const toggleSearchBar = () => {
//     setIsSearching(!isSearching); // Basculer entre le mode recherche et le mode titre
//     setSearchQuery(''); // Réinitialise la barre de recherche à vide à chaque ouverture
//   };

//   return (
//     <View style={styles.container}>
//        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.cartButton}>
//           <Icon name="cart" size={30} color="#fff" />
//         </TouchableOpacity> 
//       <Text style={styles.TitleLogo}>
//         EasySwap
//       </Text>
//       {/* Affiche la barre de recherche si isSearching est vrai, sinon le titre */}
//       {isSearching ? (
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           placeholderTextColor="#fff"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           autoFocus={true} // Focus automatique lorsque la recherche est activée
//         />
//       ) : (
//         <Text style={styles.title}>{title}</Text>
//       )}

//       <View style={styles.rightContainer}>
//         <TouchableOpacity onPress={toggleSearchBar}>
//           <Icon name={isSearching ? "close" : "search"} size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute', // Fixe en haut
//     top: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#007BFF',
//     height: Platform.OS === 'ios' ? 60 : 50,
//     paddingHorizontal: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     zIndex: 1000, // Assure que l'AppBar est au-dessus des autres éléments
//   },
//   TitleLogo:{
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//     paddingLeft:10,

//   },
//   title: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     flex: 1,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#fff',
//     fontSize: 18,
//     paddingHorizontal: 10,
//   },
//   backButton: {
//     padding: 10,
//   },
//   rightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

// export default AppBar;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppBar = ({ title }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const toggleSearchBar = () => {
    setIsSearching(!isSearching);
    setSearchQuery('');
  };

  const searchCategory = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await fetch(`http://192.168.1.190:3001/api/categories/search?title=${searchQuery}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        // Naviguer vers un écran avec les résultats de la recherche
        navigation.navigate('CategorySearchResults', { categories: data });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.cartButton}>
        <Icon name="cart" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.TitleLogo}>EasySwap</Text>

      {isSearching ? (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#fff"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchCategory} // Lance la recherche quand l'utilisateur appuie sur "Enter"
          autoFocus={true}
        />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={toggleSearchBar}>
          <Icon name={isSearching ? "close" : "search"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    height: Platform.OS === 'ios' ? 60 : 50,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1000,
  },
  TitleLogo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppBar;
