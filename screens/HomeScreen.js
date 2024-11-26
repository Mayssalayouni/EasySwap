import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import AppBar from '../components/AppBar';

const HomeScreen = ({ navigation }) => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.1.16:3001/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch ads when categories change
  useEffect(() => {
    const fetchAds = async (categoryId) => {
      try {
        const response = await fetch(`http://192.168.1.190:3001/api/products?categoryId=${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ads');
        }
        const data = await response.json();
        setAds(data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    // Assuming you want to fetch ads for the first category as default
    if (categories.length > 0) {
      fetchAds(categories[0].id);
    }
  }, [categories]);

  // Render each category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('CategoryDetails', { category: item.title, categoryId: item.id  }); // Pass the category title and ID
      }}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.imageBackground} imageStyle={styles.image}>
        <Text style={styles.title}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerAppBar}>
        <AppBar title="Home" />
      </View>
      <Text style={styles.header}>
        Buy & sell on your local second-hand classifieds marketplace
      </Text>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerAppBar: {},
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 50,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  listContent: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
