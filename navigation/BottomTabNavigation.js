
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'; 
import ProfileScreen from '../screens/ProfileScreen'; 
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CreateAd from '../screens/CreateAd';


const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

         
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Icônes pour l'écran d'accueil
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'; // Icônes pour l'écran de profil
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline'; // Icônes pour l'écran de panier
          }
         else if (route.name === 'Create') {
          iconName = focused ? 'create' : 'create-outline'; // Icônes pour l'écran de panier
        }
       

        
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Couleur des icônes actives
        tabBarInactiveTintColor: 'gray', // Couleur des icônes inactives
        tabBarStyle: { backgroundColor: '#fff' }, // Couleur de fond de la barre d'onglets
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Create" component={CreateAd} />
    
      
     
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
