import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View,Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home'
import ProductDetails from './src/screens/ProductDetails'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen  name="Home" component={Home} />
      <Stack.Screen  name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}