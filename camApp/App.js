import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from "./components/Main"
import Gallery from "./components/Gallery"
import CameraScreen from "./components/CameraScreen"
import BigFoto from './components/BigFoto'
import SettingScreen from './components/SettingsScreen'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Main}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="s2"
          component={Gallery}
          options={{
            title: "Zdjęcia",
            headerStyle: {
              backgroundColor: '#FF3C60',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen
          name="s3"
          component={CameraScreen}
          options={{
            title: "Kamera",
            headerStyle: {
              backgroundColor: '#FF3C60',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen
          name="s4"
          component={BigFoto}
          options={{
            title: "Zdjęcie",
            headerStyle: {
              backgroundColor: '#FF3C60',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen
          name="s5"
          component={SettingScreen}
          options={{
            title: "Ustawienia",
            headerStyle: {
              backgroundColor: '#FF3C60',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


