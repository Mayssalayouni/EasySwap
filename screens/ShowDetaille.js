import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

const ShowDetaille = ({ route, navigation }) => {
  const { adId } = route.params;
  const [adDetail, setAdDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await fetch(`http://192.168.1.16:3001/api/products/${adId}`);
        if (!response.ok) throw new Error('Failed to fetch ad details');

        const data = await response.json();
        setAdDetail(data);
      } catch (error) {
        console.error('Error fetching ad details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdDetail();
  }, [adId]);

  const handleReserve = () => {
    Alert.alert('Reserved', 'Your product has been reserved successfully!');
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {adDetail && (
          <>
            {/* Assurez-vous que l'URL de l'image est correcte ici */}
            <Image 
              source={{ uri: `http://192.168.1.16:3001/uploads/${adDetail.image}` }} 
              style={styles.adImage} 
              resizeMode="cover" // Ajoutez un mode de redimensionnement si nécessaire
            />
            <Text style={styles.adTitle}>{adDetail.title}</Text>
            <Text style={styles.adDescription}>{adDetail.description}</Text>
            <Text style={styles.adPrice}>Price: ${adDetail.price}</Text>
            <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
              <Text style={styles.buttonText}>Reserve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  adImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  adTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343A40',
  },
  adDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#495057',
    lineHeight: 24,
  },
  adPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#28A745',
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
  reserveButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShowDetaille;
