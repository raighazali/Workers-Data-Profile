// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home'; // Assuming Home is in the same directory
import New from './New';   // Assuming New is in the same directory
import UpdateDelete from './UpdateDelete'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="M & H" component={Home} />
        <Stack.Screen name="New" component={New} />
        <Stack.Screen name="UpdateDelete" component={UpdateDelete} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
