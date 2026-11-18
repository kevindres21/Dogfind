import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig'; // Asegúrate de que esta ruta sea correcta
import { useNavigation } from '@react-navigation/native';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigation = useNavigation();

  const handleRegistro = async () => {
    try {
      // 1. Creamos el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      // 2. Guardamos los datos extra en Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre: nombre,
        correo: correo,
        fecha: fecha,
        telefono: telefono,
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      
      // 3. Lo mandamos al Login
      navigation.navigate('Login'); 

           } catch (error) {
      console.error("ERROR DE FIREBASE:", error);
      alert("Error: " + error.message); // Usamos alert de JS puro
    }
  };

// ... (manten tus imports y la lógica de handleRegistro) ...

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Crear Cuenta</Text>
        <Text style={styles.subtitulo}>Únete a Dogfind</Text>
        
        <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
        <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
        <TextInput placeholder="Contraseña" value={contrasena} onChangeText={setContrasena} secureTextEntry style={styles.input} />
        <TextInput placeholder="Fecha de nacimiento" value={fecha} onChangeText={setFecha} style={styles.input} />
        <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" style={styles.input} />
        
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f7fa', padding: 20 },
  card: { width: '100%', backgroundColor: '#fff', padding: 25, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee', padding: 12, marginBottom: 12, borderRadius: 10 },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#4A90E2', textAlign: 'center', fontSize: 14 }
});