
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen'; 
import LoginScreen from '../screens/LoginScreen'; 
import SignupScreen from '../screens/SignupScreen'; 
import BottomTabNavigation from './BottomTabNavigation';
import EditProfileScreen from '../screens/EditProfileScreen'; 
import ShowDetaille from '../screens/ShowDetaille';
import CategorySearchResults from '../screens/CategorySearchResults';
import CategoryDetails from '../screens/CategoryDetails';
import CreateAd from '../screens/CreateAd';
import UserProducts  from '../screens/UserProducts ';
import EditProduct  from '../screens/EditProduct';



const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        <Stack.Screen name="ShowDetaille" component={ShowDetaille} />
        <Stack.Screen name="CreateAd" component={CreateAd} />
        <Stack.Screen name="UserProducts" component={UserProducts} />
        <Stack.Screen name="CategorySearchResults" component={CategorySearchResults} />
        <Stack.Screen name="EditProduct" component={EditProduct} />

        <Stack.Screen name="Home" component={BottomTabNavigation} options={{ headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
