import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/componentes/Login';
import Registro from './src/componentes/Registro';
import Home from './src/componentes/Home';
import Original from './src/componentes/Original';
import Perfil from './src/componentes/Perfil';
import Logout from './src/componentes/Logout';

const Tab = createBottomTabNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return unsubscribe;
  }, []);

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            height: 65,
            paddingBottom: 10,
            paddingTop: 5,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
          },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Original') iconName = focused ? 'paw' : 'paw-outline';
            else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'Logout') iconName = focused ? 'log-out' : 'log-out-outline';
            else if (route.name === 'Login') iconName = focused ? 'log-in' : 'log-in-outline';
            else if (route.name === 'Registro') iconName = focused ? 'person-add' : 'person-add-outline';

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        {usuario ? (
          <>
            <Tab.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
            <Tab.Screen name="Original" component={Original} options={{ title: 'Aleatorio' }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
            <Tab.Screen name="Logout" component={Logout} options={{ title: 'Salir' }} />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={Login} options={{ title: 'Ingresar' }} />
            <Tab.Screen name="Registro" component={Registro} options={{ title: 'Registro' }} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }
});