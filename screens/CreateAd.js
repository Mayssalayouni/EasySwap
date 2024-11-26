import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage

const CreateAd = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // État pour l'ID utilisateur

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.1.16:3001/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error fetching categories', error.message);
      }
    };

    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id !== null) {
          setUserId(id); // Définir l'ID utilisateur si trouvé
        } else {
          Alert.alert('No user ID found');
        }
      } catch (error) {
        console.error('Error retrieving user ID:', error);
        Alert.alert('Error retrieving user ID', error.message);
      }
    };

    fetchCategories();
    fetchUserId(); // Appeler la fonction pour récupérer l'ID utilisateur
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: false,
    });
    if (result.cancelled) {
      console.log('User cancelled image picker');
    } else if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImage(selectedImage);
    } else {
      console.log('No URI found in the selected image');
    }
  };

  const handleSubmit = async () => {
    if (title && description && category && price) {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category_id', category);
      formData.append('price', price);
      formData.append('user_id', userId); // Utiliser l'ID utilisateur récupéré

      if (image) {
        const fileName = image.uri.split('/').pop();
        const fileType = image.uri.split('.').pop();

        formData.append('image', {
          uri: image.uri,
          name: fileName,
          type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
        });
      }

      try {
        const response = await fetch('http://192.168.1.16:3001/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to create ad');

        const data = await response.json();
        Alert.alert('Ad created successfully!');
        setTitle('');
        setDescription('');
        setCategory('');
        setImage(null); // Réinitialiser l'image
        setPrice('');
        navigation.navigate('Home', { newAd: data });
      } catch (error) {
        console.error('Error creating ad:', error);
        Alert.alert('Error creating ad', error.message);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Please fill all fields before submitting!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => {
          console.log('Selected category value:', itemValue);
          setCategory(itemValue);
        }}
      >
        <Picker.Item label="Select a category" value="" />
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.title} value={cat.id} />
          ))
        ) : (
          <Picker.Item label="No categories available" value="" />
        )}
      </Picker>

      <Text style={styles.label}>Upload Image (optional)</Text>
      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.uploadText}>Tap here to select an image</Text>
        )}
      </TouchableOpacity>

      <Button title={loading ? "Creating..." : "Create Ad"} onPress={handleSubmit} color="#28A745" disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#343A40',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#495057',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#6c757d',
    fontSize: 16,
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CED4DA',
    resizeMode: 'cover',
  },
});

export default CreateAd;
