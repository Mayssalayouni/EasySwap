import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AppBar from '../components/AppBar';

const CategoryDetails = ({ route, navigation }) => {
  const { categoryId, category } = route.params; // 'categoryId' est déjà récupéré ici
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`http://192.168.1.16:3001/api/products?category_id=${categoryId}`);
        if (!response.ok) throw new Error(`Failed to fetch ads: ${response.status} ${response.statusText}`);
        
        const data = await response.json();
        setAds(data);
      } catch (error) {
        console.error('Error fetching ads:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAds();
  }, [categoryId]);

  const renderAdItem = ({ item }) => {
  // Limite la description à 5 mots
  const descriptionWords = item.description.split(' ').slice(0, 5).join(' ') + (item.description.split(' ').length > 5 ? '...' : '');
  const imageUrl = `http://192.168.1.16:3001/uploads/${item.image}`; // Remplacez le backslash par un slash
  
  
  return (
    <TouchableOpacity 
      style={styles.adCard} 
      onPress={() => navigation.navigate('ShowDetaille', { adId: item.id })}
    >
<Image 
  source={{ uri: imageUrl }} 
  style={styles.adImage} 
  onError={(error) => console.log('Erreur de chargement de l\'image:', error.nativeEvent.error)} 
/>
      <View style={styles.adContent}>
        <Text style={styles.adTitle}>{item.title}</Text>
        <Text style={styles.adDescription}>{descriptionWords}</Text>
      </View>
    </TouchableOpacity>
  );
};


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar title={category} />
      <FlatList
        data={ads}
        renderItem={renderAdItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={styles.spacer} />} // Espace entre l'AppBar et la FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  spacer: {
    height: 50, // Espace entre AppBar et FlatList
  },
  adCard: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  adImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  adContent: {
    padding: 10,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343A40',
  },
  adDescription: {
    fontSize: 14,
    marginTop: 5,
    color: '#6c757d',
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
});

export default CategoryDetails;
