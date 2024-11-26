import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté depuis AsyncStorage
        setUserId(id);
        if (id) {
          fetchUserProducts(id);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        Alert.alert('Error', 'Could not retrieve user ID');
      }
    };

    fetchUserId();
  }, []);

  const fetchUserProducts = async (id) => {
    try {
      const response = await axios.get(`http://192.168.1.16:3001/api/products/user/${id}`);
      setProducts(response.data);

    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error fetching products', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (productId) => {
    Alert.alert('Edit', `Edit product with ID: ${productId}`);
    // Redirection ou modification logique ici
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://192.168.1.16:3001/api/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      Alert.alert('Product deleted', `Product with ID: ${productId} has been deleted`);
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Unable to delete product');
    }
  };
  const baseURL = 'http://192.168.1.16:3001/uploads/'; // Remplacez cette URL par celle où vos images sont stockées

const renderProduct = ({ item }) => {
  const imageUrl = `${baseURL}${item.image}`;

  return (
    <View style={styles.productContainer}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.productImage} 
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Modifier" onPress={() => handleEditProduct(item.id)} />
          <Button title="Supprimer" color="red" onPress={() => handleDeleteProduct(item.id)} />
        </View>
      </View>
    </View>
  );
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Produits</Text>
      {products.length === 0 ? (
        <Text style={styles.noProductsText}>Aucun produit trouvé</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    flex: 1,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#343A40',
  },
  productContainer: {
    
    flexDirection: 'column',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  productImage: {
    width:'80',
    height: 250,
    borderRadius: 5, 
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343A40',
  },
  productDescription: {
    fontSize: 16,
    color: '#495057',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noProductsText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
  },
});

export default UserProducts;
