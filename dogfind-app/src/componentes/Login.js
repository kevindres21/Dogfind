import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
    } catch (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

// ... (manten tus imports y la lógica de handleLogin) ...

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="paw" size={60} color="#4A90E2" style={{ alignSelf: 'center', marginBottom: 20 }} />
        <Text style={styles.titulo}>Dogfind</Text>
        <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

        <TextInput
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={{ marginTop: 15 }}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f7fa', padding: 20 },
  card: { width: '100%', backgroundColor: '#fff', padding: 30, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 25 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee', padding: 15, marginBottom: 15, borderRadius: 10 },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#4A90E2', textAlign: 'center', fontSize: 14 }
});