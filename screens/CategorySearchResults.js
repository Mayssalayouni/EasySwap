import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

const CategorySearchResults = ({ route, navigation }) => {
  const { categories } = route.params;

  // Vérifier si aucune catégorie n'est trouvée
  if (categories.length === 0) {
    Alert.alert('Aucune catégorie trouvée', 'Il n\'y a pas de catégorie correspondant à votre recherche.');
    return (
      <View style={styles.container}>
        <Text style={styles.noResults}>Aucune catégorie trouvée.</Text>
      </View>
    );
  }

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CategoryDetails', { categoryId: item.id, category: item.title })}>
      <ImageBackground source={{ uri: item.image }} style={styles.imageBackground} imageStyle={styles.image}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: '50%',
    //maxHeight :'100%'

  },
  imageBackground: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f8f8f8', // Fond de carte
    elevation: 2,
    marginBottom: 10,
    height: 200, // Hauteur de l'image d'arrière-plan
    justifyContent: 'flex-end', // Aligner le texte en bas
  },
  image: {
    borderRadius: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Couleur du texte
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    padding: 5, // Espacement autour du texte
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default CategorySearchResults;
