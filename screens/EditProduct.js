import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params; // Récupérer l'ID du produit depuis les paramètres
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    image: null,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Récupérer les détails du produit à modifier
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.1.16:3001/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch product details');
      }
    };

    fetchProduct();
  }, []);

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('category_id', product.category_id);
    formData.append('user_id', '123'); // Mettre l'ID de l'utilisateur connecté
    formData.append('price', product.price);

    if (image) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', {
        uri: image,
        name: filename,
        type: type,
      });
    }

    try {
      const response = await axios.post(`http://192.168.1.16:3001/api/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={product.title}
        onChangeText={(text) => setProduct({ ...product, title: text })}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={product.description}
        onChangeText={(text) => setProduct({ ...product, description: text })}
      />

      <Text style={styles.label}>Category ID:</Text>
      <TextInput
        style={styles.input}
        value={product.category_id}
        onChangeText={(text) => setProduct({ ...product, category_id: text })}
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={product.price}
        onChangeText={(text) => setProduct({ ...product, price: text })}
        keyboardType="numeric"
      />

      <Button title="Choose Image" onPress={handleChooseImage} />
      {image && <Text>Image selected: {image}</Text>}

      <Button title="Update Product" onPress={handleUpdateProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default EditProductScreen;
